const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const ErrorHandler = require('../../common/ErrorHandler');
const { handlerRoute } = require('../../common/handlerRoute');

router.route('/').get(
  handlerRoute(async (req, res, next) => {
    const tasks = await Task.find();
    res.json(tasks);
    return next();
  })
);

router.route('/').post(
  handlerRoute(async (req, res, next) => {
    const task = new Task({
      ...req.body,
      boardId: req.params.id
    });
    await task.save();
    res.json(task);
    return next();
  })
);

router.route('/:id').get(
  handlerRoute(async (req, res, next) => {
    const task = await Task.findById(req.params.id);

    res.json(task);
    return next();
  })
);

router.route('/:id').put(
  handlerRoute(async (req, res, next) => {
    await Task.where({ _id: req.params.id }).update(req.body);
    const task = Task.findById(req.params.id);
    res.json(task);
    return next();
  })
);

router.route('/:id').delete(
  handlerRoute(async (req, res, next) => {
    await Task.deleteOne(req.params.id);
    res
      .status(204)
      .json({ message: `Board with id ${req.params.id} has been deleted` });
    return next();
  })
);

module.exports = router;
