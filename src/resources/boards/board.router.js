const router = require('express').Router();
const Board = require('./board.model');
const Task = require('../tasks/task.model');
const ErrorHandler = require('../../common/ErrorHandler');
const { boardToResponce } = require('../../helpers/toResponce');
const asyncHandler = require('express-async-handler');

router.route('/').get(
  asyncHandler(async (req, res, next) => {
    const boards = await Board.find();
    res.json(boards.map(boardToResponce));
    next();
  })
);

router.route('/').post(
  asyncHandler(async (req, res, next) => {
    const board = new Board(req.body);
    await board.save();
    res.json(boardToResponce(board));
    next();
  })
);

router.route('/:id').get(
  asyncHandler(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'Board id not found');
    }

    const board = await Board.findById(req.params.id);

    if (!board) {
      throw new ErrorHandler(404, 'Board not found');
    }

    res.json(boardToResponce(board));
    next();
  })
);

router.route('/:id').put(
  asyncHandler(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'Board id not found');
    }

    const board = await Board.where().findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(board);
    next();
  })
);

router.route('/:id').delete(
  asyncHandler(async (req, res, next) => {
    if (!req.params.id) {
      throw new ErrorHandler(404, 'Board id not found');
    }

    await Board.deleteOne({ _id: req.params.id });
    await Task.deleteMany({ boardId: req.params.id });
    res
      .status(204)
      .json({ message: `Board with id ${req.params.id} has been deleted` });
    next();
  })
);

module.exports = router;
