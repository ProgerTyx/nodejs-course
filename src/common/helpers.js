exports.isEmptyObj = obj => Object.keys(obj).length === 0;

exports.getUrlQuery = url => {
  const URL_QUERY_SYMBOL = '?';
  const idx = url.indexOf(URL_QUERY_SYMBOL);

  return idx === -1 ? url : url.substring(0, idx);
};
