const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const ErrorHandler = require('../../common/ErrorHandler');

router.get('/', async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
    return next();
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = new User(req.body);
    await usersService.save(user);
    res.json(User.toResponse(user));
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

    const user = await usersService.getById(req.params.id);
    res.status(200).json(User.toResponse(user));
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

    const user = await usersService.getById(req.params.id);
    await usersService.update(user, req.body);
    res.json(User.toResponse(req.body));
    return next();
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new ErrorHandler(400, 'Id not found');
    }

    await usersService.remove(req.params.id);
    res.status(204).json();
    return next();
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
