const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

exports.save = data => boardsRepo.save(data);

exports.getAll = () => boardsRepo.getAll();

exports.getById = id => boardsRepo.getById(id);

exports.update = (board, newBoard) => boardsRepo.update(board, newBoard);

exports.delete = async id => {
  const taskDb = await tasksRepo.getAll();
  taskDb.forEach(task => {
    if (task.boardId === id) {
      tasksRepo.remove(task.id);
    }
  });

  boardsRepo.delete(id);
};
