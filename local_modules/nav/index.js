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

var logoNavBar = {
  className: 'logo_base',
  dangerouslySetInnerHTML: {
    __html: logoBase
  }
};

function render() {
  var state = this.state;

  return sticky({stickyClassName: 'nav_floating'},
    dom.div({className: 'flex_outer nav'},
      dom.div({className: 'flex_inner'},
        dom.ul({className: 'navBar'},
          dom.li({},
            dom.span(logoNavBar)
          ),
          dom.li(null ,
            dom.a({className: 'navBar_item', href: '#'}, 'Dev Center')
          ),
          dom.li(null,
            dom.a({className: 'navBar_item', href: '#'}, 'Learn')
          ),
          dom.li(null,
            dom.a({className: 'navBar_item active', href: '#'}, 'Docs')
          ),
          dom.li(null,
            dom.a({className: 'navBar_item', href: '#'}, 'Faq')
          ),
          dom.li(null,
            dom.a({className: 'navBar-button navBar-button_signIn', href: '#'}, 'Sign in')
          ),
          dom.li(null,
            dom.a({className: 'navBar-button navBar-button_register', href: '#'}, 'Register for free')
          )
        )
      )
    ),
    dom.div({className: 'flex_outer header'},
      dom.div({className: 'flex_inner'},
        dom.div({className: 'header_text'}, 'DOCS')
      )
    )
  );
}
