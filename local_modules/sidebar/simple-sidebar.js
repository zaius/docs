
var window    = require('global/window');
var slugify   = require('slugificate');
var react     = require('react');

var dom = react.DOM;

module.exports = simpleSidebar

function simpleSidebar(props, state) {
  var lesson = getLesson();
  var lessonData = state.data[lesson];

  return dom.section({className: 'section-sidebar section-sidebar_' + lesson},
    dom.section({className: 'sidebar-list'},
      dom.ul(null,
        lessonData.map(function(val) {
          return dom.li({className: 'sidebar-li_sub', key: val},
            dom.a({
              href: createHref(stripUrl(), lesson, val)
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
 * @param {String} lesson
 * @param {String[]} val
 */
function createHref(base, lesson, val) {
  return '/'
    + base
    + '/'
    + lesson
    + '/'
    + slugify(val.split('.')[0])
    + '.html';
}
