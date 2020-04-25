const router = require('express').Router();
const User = require('./user.model');
const Task = require('../tasks/task.model');
const bcrypt = require('bcrypt');
const ErrorHandler = require('../../common/ErrorHandler');
const { userToResponce } = require('../../helpers/toResponce');
const asyncHandler = require('express-async-handler');

router.route('/').get(
  asyncHandler(async (req, res, next) => {
    const users = await User.find();
    res.json(users.map(userToResponce));
    return next();
  })
);

router.route('/').post(
  asyncHandler(async (req, res, next) => {
    if (!req.body.login || !req.body.name || !req.body.password) {
      throw new ErrorHandler(400, 'Not all data received.');
    }
    const { password, name, login } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ name, login, password: hashedPassword });
    await user.save();
    res.json(userToResponce(user));
    return next();
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res, next) => {
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
  asyncHandler(async (req, res, next) => {
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
  asyncHandler(async (req, res, next) => {
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
