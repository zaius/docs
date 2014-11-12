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
 *
 * There are two versions available. One has with extra `<li>`
 * elements and one without. Choose one.
 */

function render() {
  var state = this.state;

  return sticky({stickyClassName: 'nav_floating'},
    dom.div({className: 'flex_outer nav'},
      dom.div({className: 'flex_inner navBar'},
        dom.span({
          className: 'logo_base',
          dangerouslySetInnerHTML: {
            __html: logoBase
          }
        }),
        dom.a({
          className: 'navBar_item',
          href: '/',
          onClick: changeLocation.bind(this, '/index.html'),
          children: 'Dev Center'
        }),
        dom.a({
          className: 'navBar_item',
          href: '/learn',
          onClick: changeLocation.bind(this, '/learn/index.html'),
          children: 'Learn'
        }),
        dom.a({
          className: 'navBar_item active',
          href: '/docs',
          onClick: changeLocation.bind(this, '/docs/best-practices/index.html'),
          children: 'Docs'
        }),
        dom.a({
          className: 'navBar_item',
          href: '/faq',
          onClick: changeLocation.bind(this, '/faq/index.html'),
          children: 'Faq'
        }),
        dom.a({
          className: 'navBar-button navBar-button_signIn',
          href: '#',
          onClick: changeLocation.bind(this, 'app.wercker.com'),
          children: 'Sign in'
        }),
        dom.a({
          className: 'navBar-button navBar-button_register',
          href: '#',
          onClick: changeLocation.bind(this, 'app.wercker.com/users/new'),
          children: 'Register for free'
        })
      )
    )
  );

  return sticky({stickyClassName: 'nav_floating'},
    dom.div({className: 'flex_outer nav'},
      dom.div({className: 'flex_inner'},
        dom.ul({className: 'navBar'},
          dom.li(null,
            dom.span({
              className: 'logo_base',
              dangerouslySetInnerHTML: {
                __html: logoBase
              }
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navBar_item',
              href: '/',
              onClick: changeLocation.bind(this, '/index.html'),
              children: 'Dev Center'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navBar_item',
              href: '/learn',
              onClick: changeLocation.bind(this, '/learn/index.html'),
              children: 'Learn'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navBar_item active',
              href: '/docs',
              onClick: changeLocation.bind(this, '/docs/best-practices/index.html'),
              children: 'Docs'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navBar_item',
              href: '/faq',
              onClick: changeLocation.bind(this, '/faq/index.html'),
              children: 'Faq'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navBar-button navBar-button_signIn',
              href: '#',
              onClick: changeLocation.bind(this, 'app.wercker.com'),
              children: 'Sign in'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navBar-button navBar-button_register',
              href: '#',
              onClick: changeLocation.bind(this, 'app.wercker.com/users/new'),
              children: 'Register for free'
            })
          )
        )
      )
    )
  );
}

/**
 * Change location.
 *
 * @param {String} href
 * @param {Event} e
 */

function changeLocation(href, e) {
  e.preventDefault();
  e.stopPropagation();

  window.location = href;
}
