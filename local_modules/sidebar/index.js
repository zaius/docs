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
  getInitialState: getInitialState,
  render: render
});

// we manage the state of the object here. source out into search,
// return the result and pass it into the display function.

/**
 * Get initial state.
 */

function getInitialState() {
  return {
    list: db
  }
}

/**
 * Render.
 */

function render() {
  return dom.aside({className: 'section-sidebar'},
    dom.h2({className: 'sidebar-title'},
      dom.a({href: 'http://wercker.com'} , 'wercker'),
      ' / ',
      dom.a({href: 'http://devcenter.wercker.com/'} , 'docs')
    ),
    search(),
    this.state.list.map(function(key) {
      return key;
    })
  );
}
