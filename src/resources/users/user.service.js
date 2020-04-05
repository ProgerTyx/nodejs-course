const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

exports.getAll = () => usersRepo.getAll();

exports.save = data => usersRepo.save(data);

exports.getById = async id => {
  const user = await usersRepo.getById(id);
  if (!user) return {};

  return user;
};

exports.update = (user, newUser) => usersRepo.update(user, newUser);

exports.remove = async id => {
  const taskDb = await taskRepo.getAll();
  taskDb.map(task => {
    if (task.userId === id) {
      task.userId = null;
    }
  });

  usersRepo.remove(id);
};
