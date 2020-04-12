const logger = require('../common/logger');

module.exports = (err, req, res, next) => {
  const { statusCode, message } = err;
  const { method, url } = req;

  logger.error(
    `${method} ${url} *** ${statusCode || 500} ${message || err.message}`
  );

  if (statusCode) {
    res.status(statusCode).json({ message });
  } else {
    res.status(500).json(err.message);
  }
};
