
var window    = require('global/window');
var slugify   = require('slugificate');
var react     = require('react');

var dom = react.DOM;

module.exports = simpleSidebar

function simpleSidebar(props, state) {
  var lesson = state.data[getLesson()];
  return dom.section({className: 'section-sidebar'},
    dom.section({className: 'sidebar-list'},
      dom.ul(null,
        lesson.map(function(val) {
          return dom.li({className: 'sidebar-li_sub', key: val},
            dom.a({
              href: createHref(stripUrl(), val)
            }, val.split('.')[0])
          )
        })
      )
    )
  )
}

/**
 * Get the current url and only get the
 * base path.
 */
function stripUrl() {
  var pathName = window.location.pathname.match(/\/\w+\//)[0];
  return pathName.split('/')[1];
}

/**
 * Get the lesson from a url.
 */
function getLesson() {
  var pathArr = window.location.pathname.split('/')[2];
  return pathArr.split('.')[0];
}

/**
 * Create the link used for the menu.
 * @param {String} base
 * @param {String} key
 * @param {String[]} val
 */
function createHref(base, val) {
  return '/'
    + base
    + '/'
    + slugify(val.split('.')[0])
    + '.html';
}
