exports.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};
