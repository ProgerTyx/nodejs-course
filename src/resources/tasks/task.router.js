const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.get('/', async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const id = req.params.id;
  const task = new Task({
    ...req.body,
    boardId: id
  });
  tasksService.save(task);
  res.json(task);
});

router.get('/:id', async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  if (!task) {
    res.status(404).send({ message: 'task didn`t found' });
  }
  res.json(task);
});

router.put('/:id', async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  tasksService.update(task, req.body);
  res.json(req.body);
});

router.delete('/:id', async (req, res, next) => {
  try {
    tasksService.remove(req.params.id, next);
    res.status(200).end();
  } catch (err) {
    res.status(404).end();
  }
});

module.exports = router;
