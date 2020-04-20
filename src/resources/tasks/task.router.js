const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const ErrorHandler = require('../../common/ErrorHandler');
const { handlerRoute } = require('../../common/handlerRoute');
const { taskToResponce } = require('../../helpers/toResponce');

router.route('/').get(
  handlerRoute(async (req, res, next) => {
    const tasks = await Task.find({ boardId: req.params.id });
    res.json(tasks.map(taskToResponce));
    return next();
  })
);

router.route('/').post(
  handlerRoute(async (req, res, next) => {
    const task = new Task({ ...req.body, boardId: req.params.id });
    await task.save();
    res.json(taskToResponce(task));
    return next();
  })
);

router.route('/:id').get(
  handlerRoute(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'Task id not found');
    }
    const task = await Task.findById(req.params.id);

    if (!task) {
      throw new ErrorHandler(404, 'Task not found');
    }
    res.json(taskToResponce(task));
    return next();
  })
);

router.route('/:id').put(
  handlerRoute(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'Task id not found');
    }
    const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    res.json(taskToResponce(task));
    return next();
  })
);

router.route('/:id').delete(
  handlerRoute(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'Task id not found');
    }

    await Task.deleteOne({ _id: req.params.id });
    res
      .status(204)
      .json({ message: `Board with id ${req.params.id} has been deleted` });
    return next();
  })
);

module.exports = router;
