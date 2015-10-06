/**
 * Module dependencies.
 */

var logo = require('../wercker-logo');
var react = require('react');

var dom = react.DOM;
var logoBase = logo.base;

/**
 * Create class.
 */

module.exports = react.createClass({
  displayName: 'toc-menu',
  getDefaultProps: function () {
    const base = getWindowUrl();
    var data;

    switch (base) {
      case 'learn':
        data = 'Learn';
        break;
      case 'docs':
        data = 'Docs';
        break;
      case 'api':
        data = 'API';
        break;
      case 'quickstarts':
        data = 'Quickstarts';
        break;
    }

    return {data: data};
  },
  render: render
});

/**
 * Render.
 */

function render () {
  return dom.div(null,
    dom.div({className: 'toc-menu-logo'},
      dom.a({
        className: 'logo-small',
        href: '/index.html',
        dangerouslySetInnerHTML: {
          __html: logoBase
        }
      })
    ),
    dom.span({
      className: 'toc-menu-button',
      onClick: onClickTocMenu,
      'data-btn-copy': this.props.data + ' menu'
    })
  );
}

function onClickTocMenu (e) {
  const base = getWindowUrl();
  var body = document.querySelector('#' + base);
  var sideBar = document.querySelector('.sidebar');

  if (body && sideBar) {
    body.classList.toggle('sidebar-open');
    sideBar.classList.toggle('open');
  }
}

// get the baseUrl from the window
// null -> str
function getWindowUrl () {
  var pathName = window.location.pathname.match(/\/\w+/);
  if (pathName) {
    return pathName[0].split('/')[1];
  }
  return '';
}
