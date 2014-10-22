/**
 * Module dependencies.
 */

/**
 * Expose `filter()`.
 */

module.exports = filter;

/**
 * Create a filter
 *
 * @param {Object} opts
 *   @prop {String} query
 *   @prop {String[]} fields
 * @return {Function}
 * @api public
 */

function filter(options) {
  var query = options.query;
  var fields = options.fields;

  if (!query) return function(val) {return val};

  var regexps = createRegExpsForQuery(query);

  return function(item) {
    // Search the items or its fields
    var searchable =  fields ? getFields(fields, item) : [item];
    return searchable.some(function(item) {
      return regexps.every(function(regexp) {
        return item.match(regexp);
      });
    });
  };
};

/**
 * Create regexp for query.
 *
 * @param {String} querytext
 * @return {RegExp}
 * @api private
 */

function createRegExpsForQuery(queryText) {
  var normalized = ("" + queryText).trim().toLowerCase();
  var parts = normalized.split(/[\s\'']+/)
                        .filter(function(s) { return !!s; })
                        .filter(function(s, index) { return index < 10; } );

  return parts.map(function(i) {
    return new RegExp("\\b" + i, "i");
  });
}

/**
 * Get fields.
 * todo: remove
 */

function getFields(fields, item) {
  return fields.map(function(field) { return item[field]; }).filter(function(f) { return !!f; });
}
