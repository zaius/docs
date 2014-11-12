/**
 * Module dependencies.
 */


var slugify = require('slugificate');
var react = require('react');

var dom = react.DOM;

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


/**
 * Render.
 */

function render() {
  var state = this.state;

  return dom.section({className: 'flex_inner'},
    dom.ul({className: 'navBar'},
      dom.li({},
        dom.img( {className: 'logo_base', src:'/images/logo-base.svg', alt:'wercker'} )
      ),
      dom.li({},
        dom.a({className: 'navBar_item', href: '#'}, 'Dev Center')
      ),
      dom.li({},
        dom.a({className: 'navBar_item', href: '#'}, 'Learn')
      ),
      dom.li({},
        dom.a({className: 'navBar_item active', href: '#'}, 'Docs')
      ),
      dom.li({},
        dom.a({className: 'navBar_item', href: '#'}, 'Faq')
      ),
      dom.li({},
        dom.a({className: 'button button_signIn', href: '#'}, 'Sign in')
      ),
      dom.li({},
        dom.a({className: 'button button_register', href: '#'}, 'Register for free')
      )
    )
  );
}
