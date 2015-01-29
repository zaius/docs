
var search  = require('@local/search');
var window  = require('global/window');
var slugify = require('slugificate');
var react   = require('react');

var db = require('../../../build/db.json');
var ss = require('./simple-sidebar');

var dom = react.DOM;

module.exports = createClass;

function createClass() {
  return react.createClass({
    displayName: 'sidebar',
    getDefaultProps: getDefaultProps,
    getInitialState: getInitialState,
    render: render
  });
}

// we manage the state of the object here. source out into search,
// return the result and pass it into the display function.
function getDefaultProps() {
  return {
    data: db[stripUrl()]
  }
}

/**
 * Get initial state.
 */
function getInitialState() {
  return {
    data: db[stripUrl()]
  }
}

/**
 * Render.
 */
function render() {
  var state = this.state;
  var basePath = stripUrl();
  if ('learn' == basePath) return ss(state, this.props)

  return dom.section({className: 'section-sidebar'},
    search({data: this.props.data, setState: this.setState.bind(this)}),
    dom.section({className: 'sidebar-list'},
      Object.keys(state.data).map(function(key) {
        var val = state.data[key];

        switch (typeof val) {
          case 'string':
            var href = basePath
            href += val == 'index'
              ? ''
              : slugify(val.split('.')[0]);

            return dom.a({className: 'sidebar-li', key: val, href: href}, val)

          default:
            return dom.ul({key: key},
              dom.li({className: 'sidebar-li'},
                dom.a({
                  href: createHref(basePath, key, val[0])
                }, key.split('.')[0])
              ),
              val.map(function(valTwo) {
                return dom.li({className: 'sidebar-li_sub', key: key + valTwo},
                  dom.a({
                    href: createHref(basePath, key, valTwo)
                  }, stripFileName(valTwo))
                )
              })
            )
        }
      })
    )
  );
}

/**
 * Cleans up the file name
 *
 * @param {String} valTwo
 */
function stripFileName(valTwo) {
  var name = valTwo.replace(/([-])/g, ' ');
  return name.split('.')[0];
}

/**
 * Create the link used for the menu.
 * @param {String} base
 * @param {String[]} val
 */
function createHref(base, key, val) {
  return '/'
    + base
    + '/'
    + key
    + '/'
    + slugify(val.split('.')[0])
    + '.html';
}

/**
 * Get the current url and only get the
 * base path.
 */
function stripUrl() {
  var pathName = window.location.pathname.match(/\/\w+\//)[0];
  return pathName.split('/')[1];
}
