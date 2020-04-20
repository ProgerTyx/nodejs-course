exports.boardToResponce = board => {
  const { id, columns, title } = board;
  return { id, columns, title };
};

exports.taskToResponce = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

exports.userToResponce = user => {
  const { id, name, login } = user;
  return { id, name, login };
};
