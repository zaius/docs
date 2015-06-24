/**
 * Module dependencies.
 */

var react = require('react');

var dom = react.DOM;

/**
 * Create class.
 */

module.exports = react.createClass({
  displayName: 'header_small',
  getDefaultProps: function () {
    const base = getWindowUrl();
    var data = null;

    switch (base) {
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
  render: render,
  componentDidMount: componentDidMount
});

/**
 * Render.
 */

function render () {
  return dom.div({className: 'flex-outer header_small'},
    dom.div({className: 'flex-inner'},
      dom.h1({children: this.props.data})
    )
  );
}

// componentDidMount
function componentDidMount () {
  var pathName = document.referrer.match(/[^.]+/)[0];
  console.log(pathName)
  if (pathName) {
    console.log(pathName.split('/'));
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
