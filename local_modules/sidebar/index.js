/**
 * Module dependencies.
 */

var search = require('@local/search');
var react = require('react');

var db = require('./db.json');

var dom = react.DOM;

/**
 * Create class.
 */

module.exports = react.createClass({
  displayName: 'sidebar',
  render: render
});

// we manage the state of the object here. source out into search,
// return the result and pass it into the display function.

/**
 * Render.
 */

function render() {
  return dom.aside({className: 'section-sidebar'},
    dom.h2({className: 'sidebar-title'}, 'wercker / docs'),
    search()
  );
}
