/**
 * Module dependencies.
 */

var search = require('@local/search');
var react = require('react');
var lunr = require('lunr');
var dom = react.DOM;

/**
 * Create class.
 */

module.exports = react.createClass({
  displayName: 'sidebar',
  render: render
});

/**
 * Render.
 */

function render() {
  return dom.section();
}
