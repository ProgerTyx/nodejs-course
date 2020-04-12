const db = [];

exports.getAll = async () => db;

exports.save = async data => db.push(data);

exports.getById = async id => db.find(user => user.id === id);

exports.update = async (user, newUser) => {
  const idx = db.indexOf(user);
  db.splice(idx, 1, newUser);
};

exports.remove = async id => {
  const user = await this.getById(id);
  if (!user) {
    throw new Error();
  }
  const idx = db.indexOf(user);
  db.splice(idx, 1);
};
