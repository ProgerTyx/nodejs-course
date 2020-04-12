const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const ErrorHandler = require('../../common/ErrorHandler');

router.get('/', async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();
    res.json(boards);
    return next();
  } catch (e) {
    return next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const board = new Board(req.body);
    await boardsService.save(board);
    res.json(board);
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
    const board = await boardsService.getById(req.params.id);
    if (!board) {
      throw new ErrorHandler(404, 'Board not found');
    }
    res.json(board);
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
    const board = await boardsService.getById(req.params.id);
    await boardsService.update(board, req.body);
    res.json(board);
    return next();
  } catch (e) {
    return next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await boardsService.delete(req.params.id);
    res.status(204).end();
    return next();
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
