const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');
const ErrorHandler = require('../common/ErrorHandler');
const { handlerRoute } = require('../common/handlerRoute');

module.exports = handlerRoute(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new ErrorHandler(401, 'Unauthorized');
  }

  const token = req.headers.authorization;

  const validToken = token.split(' ')[1];

  if (!validToken) {
    throw new ErrorHandler(401, 'Unauthorized');
  }

  await jwt.verify(validToken, JWT_SECRET_KEY, err => {
    if (err) {
      throw new ErrorHandler(401, 'Unauthorized');
    }
  });

  next();
});
