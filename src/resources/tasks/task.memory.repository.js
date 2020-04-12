const ErrorHandler = require('../../common/ErrorHandler');
const db = [];

exports.getAll = async () => db;

exports.save = async data => db.push(data);

exports.getById = async id => db.find(task => task.id === id);

exports.update = async (task, newTask) => {
  const idx = db.indexOf(task);
  db.splice(idx, 1, newTask);
};

exports.remove = async id => {
  const task = await this.getById(id);
  if (!task) {
    throw new ErrorHandler(404, 'Task not Found');
  }
  const idx = db.indexOf(task);
  db.splice(idx, 1);
};
