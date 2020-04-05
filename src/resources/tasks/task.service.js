const tasksRepo = require('./task.memory.repository');

exports.getAll = () => tasksRepo.getAll();

exports.save = data => tasksRepo.save(data);

exports.getById = id => tasksRepo.getById(id);

exports.update = (task, newTask) => tasksRepo.update(task, newTask);

exports.remove = id => tasksRepo.remove(id);
