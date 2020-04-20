const router = require('express').Router();
const User = require('./user.model');
const Task = require('../tasks/task.model');
const usersService = require('./user.service');
const ErrorHandler = require('../../common/ErrorHandler');
const { handlerRoute } = require('../../common/handlerRoute');

router.route('/').get(
  handlerRoute(async (req, res, next) => {
    const users = await User.find();
    res.json(users.map(usersService.toResponse));
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
    res.json(usersService.toResponse(user));
    return next();
  })
);

router.route('/:id').get(
  handlerRoute(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.json(usersService.toResponse(user));
    return next();
  })
);

router.route('/:id').put(
  handlerRoute(async (req, res, next) => {
    await User.where({ _id: req.params.id }).updateOne(req.body);
    const user = await User.findById(req.params.id);
    res.json(usersService.toResponse(user));
    return next();
  })
);

router.route('/:id').delete(
  handlerRoute(async (req, res, next) => {
    await User.deleteOne({ _id: req.params.id });
    // await Task.deleteMany({ userId: req.params.id });
    res
      .status(204)
      .json({ message: `User with id ${req.params.id} has been deleted` });
    return next();
  })
);

module.exports = router;
