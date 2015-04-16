const assert = require('assert');

module.exports = filter;

// filter an object of arrays
// for the query
// obj, str -> fn
function filter(data, query) {
  if (!query) return data;

  var regexps = createRegExps(query)
  var keys = Object.keys(data);

  const arrarr = keys.map((key) => {
    const val = data[key];
    return Array.isArray(val) ? val : [val];
  });

  const barr = arrarr.map((val) => val.filter(matchRegex));

  // build response object
  var nw = {};
  barr.forEach((val, i) => {
    const key = keys[i];
    if (matchRegex(key)) return nw[key] = data[key];
    if (val.length) return nw[key] = val;

    const keyMatch = regexps.every((regexp) => key.match(regexp));
    if (keyMatch) nw[key] = key;
  });

  return nw;

  // str -> bool
  function matchRegex(val) {
    return regexps.every((regex) => val.match(regex));
  }
};

// create regexps for query
// str -> regex
function createRegExps(query) {
  query = query || '';

  return query
    .trim()
    .toLowerCase()
    .split(/[\s\'']+/)
    .filter((s) => !!s)
    .filter((s, index) => index < 10)
    .map((i) => new RegExp('\\b' + i, 'i'));
}
