/**
 * Module dependencies.
 */

var react = require('react');
var sticky = require('react-sticky');

var dom = react.DOM;

/**
 * Create class.
 */
module.exports = react.createClass({
  displayName: 'bread-crumb',
  render: render
});

/**
 * Render.
 */
function render () {
  return sticky({
      stickyClass: 'bread-crumb-floating',
      topOffset: 200,
      onStickyStateChange: handleStickyStateChange
    },
    dom.div({className: 'flex-outer bread-crumb'},
      dom.div({className: 'flex-inner'},
        dom.ul(null,
          dom.li({className: 'bread-crumb-scroll-up'},
            dom.a({
              children: 'Back to top',
              onClick: onScrollUp
            })
          ),
          createList()
        )
      )
    )
  );
}

/**
 * On scroll up event
 */
function onScrollUp () {
  var scrollDuration = 500;
  var scrollOffset = 140;
  var scrollHeight = window.scrollY - scrollOffset;
  var startTime = Date.now();

  window.requestAnimationFrame(step);

  function step () {
    var currentTime = Date.now();
    if (window.scrollY > scrollOffset && currentTime - startTime < scrollDuration) {
      scrollHeight -= scrollHeight * 0.2;
      window.scrollTo(0, scrollHeight + scrollOffset);
      window.requestAnimationFrame(step);
    }
  }
}

/**
 * Creates the crumb path.
 */
function createList () {
  var currentLocation = getCurrentLocation();
  var base = currentLocation[0];
  var section = currentLocation[1];

  return currentLocation.map(function (item) {
    return renderLiElement(item, base, section);
  });
}

// render a li element
// str, str, str -> obj
function renderLiElement (item, base, section) {
  var uri = '';
  if (item === base) uri = createBaseUri(base);
  if (item === section) uri = createSectionUri(base, section);

  return dom.li(
    {className: 'bread-crumb-item', key: item},
    dom.a({href: uri}, stripFileExt(item))
  );
}

// create href link for base
// str -> str
function createBaseUri (base) {
  return '/' + base + '/index.html';
}

// create href link for base
// str, str, str, -> str
function createSectionUri (base, section) {
  return '/' + base + '/' + section + '/index.html';
}

/**
 * handleStickyStateChange.
 * Adds extra positioning.
 */
function handleStickyStateChange () {
  var breadCrumb = document.querySelector('.bread-crumb');
  if (arguments[0] === true) breadCrumb.classList.add('bread-crumb_active');
  else breadCrumb.classList.remove('bread-crumb_active');
}

// // clean file name
// // str -> str
function stripFileExt (filename) {
  var name = filename.replace(/-/g, ' ');
  return name.split('.')[0];
}

// get the subUrl from the window
// null -> str
function getCurrentLocation () {
  var pathName = window.location.pathname.match(/[^.]+/)[0];
  var section = pathName.split('/');
  // removes first item because it is empty
  section.shift();
  // removes index from the array
  if (section.indexOf('index') > -1) section.splice(section.indexOf('index'), 1);

  return section;
}
