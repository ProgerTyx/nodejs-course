const router = require('express').Router();
const User = require('./user.model');
const Task = require('../tasks/task.model');
const ErrorHandler = require('../../common/ErrorHandler');
const { handlerRoute } = require('../../common/handlerRoute');
const { userToResponce } = require('../../helpers/toResponce');

router.route('/').get(
  handlerRoute(async (req, res, next) => {
    const users = await User.find();
    res.json(users.map(userToResponce));
    return next();
  })
);

router.route('/').post(
  handlerRoute(async (req, res, next) => {
    if (!req.body.login || !req.body.name || !req.body.password) {
      throw new ErrorHandler(400, 'Not all data received.');
    }

    const user = new User(req.body);
    await user.save();
    res.json(userToResponce(user));
    return next();
  })
);

router.route('/:id').get(
  handlerRoute(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'User id not found');
    }
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new ErrorHandler(404, 'User not found');
    }
    res.json(userToResponce(user));
    return next();
  })
);

router.route('/:id').put(
  handlerRoute(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'User id not found');
    }
    await User.where({ _id: req.params.id }).updateOne(req.body);
    const user = await User.findById(req.params.id);
    res.json(userToResponce(user));
    return next();
  })
);

router.route('/:id').delete(
  handlerRoute(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'User id not found');
    }
    await User.deleteOne({ _id: req.params.id });
    await Task.updateMany({ userId: req.params.id }, { userId: null });

    res
      .status(204)
      .json({ message: `User with id ${req.params.id} has been deleted` });
    return next();
  })
);

module.exports = router;
