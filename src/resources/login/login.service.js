const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const bcrypt = require('bcrypt');
const { JWT_SECRET_KEY } = require('../../common/config');

const createError = require('http-errors');
const { FORBIDDEN, getStatusText } = require('http-status-codes');

exports.findUserByLogin = async login => {
  const user = await User.findOne({ login });

  if (!user) {
    throw new createError(FORBIDDEN, getStatusText(FORBIDDEN));
  }

  return user;
};

exports.checkPassword = async (password, userPassword) => {
  const isValidPassword = await bcrypt.compare(password, userPassword);

  if (!isValidPassword) {
    throw new createError(FORBIDDEN, getStatusText(FORBIDDEN));
  }

  return;
};

exports.createAccessToken = async user => {
  const payload = {
    login: user.login,
    userId: user._id
  };

  const token = await jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' });
  return token;
};
