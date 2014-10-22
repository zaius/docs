/**
 * Module dependencies.
 */

var search = require('@local/search');
var slugify = require('slugificate');
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
  var state = this.state;

  return dom.aside({className: 'section-sidebar'},
    dom.h2({className: 'sidebar-title'},
      dom.a({href: 'http://wercker.com'} , 'wercker'),
      ' / ',
      dom.span(null, 'docs')
    ),
    search(),
    dom.section({className: 'sidebar-list'},
      Object.keys(state.list).map(function(key) {
        var val = state.list[key];

        switch (typeof val) {
          case 'string':
            return dom.a({
              className: 'sidebar-li',
              key: val,
              href: '/' + (val == 'index' ? '' : val)}, val
            )

          default:
            return dom.ul({},
              dom.li({className: 'sidebar-li', key: key},
                dom.a({href: '/' + key + '/' + slugify(val[0]) + '.html'}, key)
              ),
              val.map(function(valTwo) {
                return dom.li({className: 'sidebar-li_sub', key: key + valTwo},
                  dom.a({href: '/' + key + '/' + slugify(valTwo) + '.html'}, valTwo)
                )
              })
            )
        }
      })
    )
  );
}
