const logger = require('../common/logger');
const { isEmptyObj, getUrlQuery } = require('../common/helpers');

module.exports = (req, res, next) => {
  const EMPTY = 'empty';
  const { url, query, body } = req;

  const urlStr = getUrlQuery(url);
  const queryStr = isEmptyObj(query) ? EMPTY : JSON.stringify(query);
  const bodyStr = isEmptyObj(body) ? EMPTY : JSON.stringify(body);

  logger.info(`URL: ${urlStr} *** PARAMS: ${queryStr} *** BODY: ${bodyStr}`);
};
