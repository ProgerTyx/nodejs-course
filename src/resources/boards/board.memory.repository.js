const db = [];

exports.save = async data => db.push(data);

exports.getAll = async () => db;

exports.getById = async id => db.find(board => board.id === id);

exports.update = async (board, newBoard) => {
  const idx = db.indexOf(board);
  db.splice(idx, 1, newBoard);
};

exports.delete = async id => {
  const board = await this.getById(id);
  const idx = db.indexOf(board);
  db.splice(idx, 1);
};
