const router = require('express').Router();
const Board = require('./board.model');
const Task = require('../tasks/task.model');
const ErrorHandler = require('../../common/ErrorHandler');
const { handlerRoute } = require('../../common/handlerRoute');

router.route('/').get(
  handlerRoute(async (req, res, next) => {
    const boards = await Board.find();
    res.json(boards);
    return next();
  })
);

router.route('/').post(
  handlerRoute(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'Board id not found');
    }
    console.log(req.body);
    const board = new Board(req.body);
    await board.save();
    res.json(board);
    return next();
  })
);

router.route('/:id').get(
  handlerRoute(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'Board id not found');
    }

    const board = await Board.findById(req.params.id);
    res.json(board);
    return next();
  })
);

router.route('/:id').put(
  handlerRoute(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'Board id not found');
    }

    await Board.where({ _id: req.params.id }).updateOne(req.body);
    const board = await Board.findById(req.params.id);
    res.json(board);
    return next();
  })
);

router.route('/:id').delete(
  handlerRoute(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'Board id not found');
    }

    await Board.deleteOne({ _id: req.params.id });
    await Task.deleteMany({ boardId: req.params.id });
    res
      .status(204)
      .json({ message: `Board with id ${req.params.id} has been deleted` });
    return next();
  })
);

module.exports = router;
