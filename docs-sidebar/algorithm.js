const assert = require('assert');

module.exports = filter;

// filter an object of arrays
// for the query
// obj, str -> fn
function filter (data, query) {
  if (!query) return data;

  const regexps = createRegExps(query);
  const matches = data.map(val => val.filter(ival => {
      return regexps.every(regex => ival.match(regex));
    }));

  // build response object
  return matches
    .map((arr, i) => arr[0] === data[i][0] ? data[i] : arr);
}

// create regexps for query
// str -> regex
function createRegExps (query) {
  query = query || '';

  return query
    .trim()
    .toLowerCase()
    .split(/[\s\'']+/)
    .filter((s) => !!s)
    .filter((s, index) => index < 10)
    .map((i) => new RegExp('\\b' + i, 'i'));
}
