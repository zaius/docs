/**
 * Module dependencies.
 */

var logo = require('@local/wercker-logo');
var slugify = require('slugificate');
var react = require('react');
var sticky = require('react-sticky')

var dom = react.DOM;
var logoBase = logo.base;

/**
 * Create class.
 */

module.exports = react.createClass({
  displayName: 'nav',
  render: render
});

/**
 * Render.
 */

function render() {
  var state = this.state;

  var logoProps = {
    className: 'logo_base',
    dangerouslySetInnerHTML: {
      __html: logoBase
    }
  };
  //
  // return sticky({stickyClassName: 'nav_floating'},
  //   dom.div({className: 'flex_outer nav'},
  //     dom.div({className: 'flex_inner'},
  //       dom.ul({className: 'navBar'},
  //         dom.li({},
  //           dom.span(logoNavBar)
  //         ),
  //         dom.li(null ,
  //           dom.a({className: 'navBar_item', href: '/index.html'}, 'Dev Center')
  //         ),
  //         dom.li(null,
  //           dom.a({className: 'navBar_item', href: '/learn/index.html'}, 'Learn')
  //         ),
  //         dom.li(null,
  //           dom.a({className: 'navBar_item active', href: '/docs/index.html'}, 'Docs')
  //         ),
  //         dom.li(null,
  //           dom.a({className: 'navBar_item', href: '/faq/index.html'}, 'Faq')
  //         ),
  //         dom.li(null,
  //           dom.a({className: 'navBar-button navBar-button_signIn', href: '#'}, 'Sign in')
  //         ),
  //         dom.li(null,
  //           dom.a({className: 'navBar-button navBar-button_register', href: '#', onClick: changeLocation}, 'Register for free')
  //         )
  //       )
  //     )
  //   )
  // );
  //
  return sticky({stickyClassName: 'nav_floating'},
    dom.div({className: 'flex_outer nav'},
      dom.div({className: 'flex_inner navBar'},
        dom.span(logoProps),
        dom.a({className: 'navBar_item', href: '/index.html'}, 'Dev Center'),
        dom.a({className: 'navBar_item', href: '/learn/index.html'}, 'Learn'),
        dom.a({className: 'navBar_item active', href: '/docs/index.html'}, 'Docs'),
        dom.a({className: 'navBar_item', href: '/faq/index.html'}, 'Faq'),
        dom.a({className: 'navBar-button navBar-button_signIn', href: '#'}, 'Sign in'),
        dom.a({className: 'navBar-button navBar-button_register', href: '#', onClick: changeLocation}, 'Register for free')
      )
    )
  );
}

/**
 * Change location.
 *
 * @param {String} uri
 * @param {Event} e
 */

function changeLocation(e) {
  e.preventDefault();
  e.stopPropagation();

  var nw = null;
}
