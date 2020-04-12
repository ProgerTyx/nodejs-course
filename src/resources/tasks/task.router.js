const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const ErrorHandler = require('../../common/ErrorHandler');

router.get('/', async (req, res, next) => {
  try {
    const tasks = await tasksService.getAll();
    res.json(tasks);
    return next();
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new ErrorHandler(400, 'Id not found');
    }

    const task = new Task({
      ...req.body,
      boardId: req.params.id
    });
    await tasksService.save(task);
    res.json(task);
    return next();
  } catch (e) {
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new ErrorHandler(400, 'Id not found');
    }

    const task = await tasksService.getById(req.params.id);
    if (!task) {
      throw new ErrorHandler(404, 'Task not found');
    }
    res.json(task);
    return next();
  } catch (e) {
    return next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new ErrorHandler(400, 'Id not found');
    }

    const task = await tasksService.getById(req.params.id);
    await tasksService.update(task, req.body);
    res.json(req.body);
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new ErrorHandler(400, 'Id not found');
    }

    await tasksService.remove(req.params.id);
    res.status(200).end();
    return next();
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
