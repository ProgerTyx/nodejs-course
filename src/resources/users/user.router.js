const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.get('/', async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.post('/', async (req, res) => {
  const user = new User(req.body);
  usersService.save(user);
  res.json(User.toResponse(user));
});

router.get('/:id', async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.status(200).json(User.toResponse(user));
});

router.put('/:id', async (req, res) => {
  const user = await usersService.getById(req.params.id);
  usersService.update(user, req.body);
  res.json(User.toResponse(req.body));
});

router.delete('/:id', async (req, res) => {
  usersService.remove(req.params.id);
  res.status(204).end();
});

module.exports = router;
