/**
 * Module dependencies.
 */

var react = require('react');

var dom = react.DOM;

/**
 * Create class.
 */

module.exports = react.createClass({
  displayName: 'docs-quicklinks',
  render: render
});

/**
 * Render.
 */

function render () {
  return dom.div(null,
    dom.div({className: 'doc-quicklinks'},
      dom.div({className: 'doc-quicklinks-item'},
        dom.h5({children: 'Faq'}),
        dom.ul(null,
          dom.li(null,
            dom.a({
              href: '/docs/faq/migration-tips-v2.html',
              children: 'How can I migrate to Docker'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/docs/faq/how-to-bypass-timeouts.html',
              children: 'How can I bypass the timeouts'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/docs/faq/how-can-i-change-my-username.html',
              children: 'How Can I Change My Username'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/docs/faq/how-can-i-update-a-repo-url.html',
              children: 'How Can I Update A Repo Url'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/docs/faq/what-ip-to-whitelist.html',
              children: 'What Ip To Whitelist'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/docs/faq/what-is-my-concurrency.html',
              children: 'What Is My Concurrency'
            })
          )
        )
      ),
      dom.div({className: 'doc-quicklinks-item'},
        dom.h5({children: 'Common tasks'}),
        dom.ul(null,
          dom.li(null,
            dom.a({
              href: '/cli/usage/index.html',
              children: 'Using the CLI'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/docs/wercker-yml/creating-a-yml.html',
              children: 'Creating a wercker.yml'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/docs/environment-variables/index.html',
              children: 'Using environment variables'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/docs/ssh-keys/index.html',
              children: 'Generate SSH keys'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/docs/services/index.html',
              children: 'Using services'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/docs/notifications/index.html',
              children: 'Using notifications'
            })
          )
        )
      ),
      dom.div({className: 'doc-quicklinks-item'},
        dom.h5({children: 'API'}),
        dom.ul(null,
          dom.li(null,
            dom.a({
              href: '/api/getting-started/index.html',
              children: 'Getting started with the API'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/api/endpoints/index.html',
              children: 'Endpoints'
            })
          )
        ),
        dom.h5({children: 'Containers'}),
        dom.ul(null,
          dom.li(null,
            dom.a({
              href: '/cli/usage/pulling-builds.html',
              children: 'Pull and introspect containers'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/docs/containers/private-containers.html',
              children: 'Private containers'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/docs/containers/pushing-containers.html',
              children: 'Pushing containers'
            })
          )
        )
      ),
      dom.div({className: 'doc-quicklinks-item'},
        dom.h5({children: 'Downloads'}),
        dom.ul(null,
          dom.li(null,
            dom.a({
              href: 'http://wercker.com/downloads/',
              children: 'Wercker for the desktop'
            })
          ),
          dom.li(null,
            dom.a({
              href: '/cli/index.html',
              children: 'Command Line Interface'
            })
          )
        ),
        dom.h5({children: 'Join the community on IRC'}),
        dom.ul(null,
          dom.li(null,
            'At ',
            dom.a({
              href: 'irc://irc.freenode.net/wercker',
              children: '#wercker'
            }),
            ' on irc.freenode.net'
          )
        )
      )
    )
  );
}
