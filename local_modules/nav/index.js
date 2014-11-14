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

  return sticky({stickyClassName: 'navbar-floating'},
    dom.div({className: 'flex-outer navbar-container'},
      dom.div({className: 'flex-inner'},
        dom.ul({className: 'navbar'},
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
              className: 'navbar-item',
              href: '/',
              onClick: changeLocation.bind(this, '/index.html'),
              children: 'Dev Center'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navbar-item',
              href: '/learn',
              onClick: changeLocation.bind(this, '/learn/index.html'),
              children: 'Learn'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navbar-item',
              href: '/docs',
              onClick: changeLocation.bind(this, '/docs/best-practices/index.html'),
              children: 'Docs'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navbar-item',
              href: '/faq',
              onClick: changeLocation.bind(this, '/faq/index.html'),
              children: 'Faq'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navbar-button navbar-button_signIn',
              href: '#',
              onClick: changeLocation.bind(this, 'app.wercker.com'),
              children: 'Sign in'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navbar-button navbar-button_register',
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
