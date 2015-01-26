/**
 * Module dependencies.
 */

var logo = require('@local/wercker-logo');
var slugify = require('slugificate');
var react = require('react');
var sticky = require('react-sticky')

var dom = react.DOM;
var logoFull = logo.full;
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
        dom.div({className: 'navbar-logo'},
          dom.a({
            className: 'logo-full',
            href: '/',
            onClick: changeLocation.bind(this, '/index.html'),
            dangerouslySetInnerHTML: {
              __html: logoFull
            }
          }),
          dom.a({
            className: 'logo-small',
            href: '/',
            onClick: changeLocation.bind(this, '/index.html'),
            dangerouslySetInnerHTML: {
              __html: logoBase
            }
          })
        ),
        dom.div({className: 'navbar-signup'},
          dom.a({
            className: 'button-nav_signup',
            href: 'https://app.wercker.com/users/new/',
            onClick: changeLocation.bind(this, 'https://app.wercker.com/users/new/'),
            children: 'Sign up'
          })
        ),
        dom.ul({className: 'navbar'},
          dom.li(null,
            dom.a({
              className: 'navbar-item',
              href: '/learn',
              onClick: changeLocation.bind(this, '/learn/basics/index.html'),
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
              href: 'http://blog.wercker.com',
              onClick: changeLocation.bind(this, 'http://blog.wercker.com'),
              children: 'Blog'
            })
          ),
          dom.li(null,
            dom.a({
              className: 'navbar-item navbar-item_right',
              href: 'https://app.wercker.com/sessions/new',
              onClick: changeLocation.bind(this, 'https://app.wercker.com/sessions/new'),
              children: 'Log in'
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
