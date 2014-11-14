/**
 * Module dependencies.
 */

var slugify = require('slugificate');
var react = require('react');
var sticky = require('react-sticky')

var dom = react.DOM;

/**
 * Create class.
 */

module.exports = react.createClass({
  displayName: 'learnblocks',
  render: render
});

/**
 * Render.
 */

function render() {
  var state = this.state;

  return sticky({stickyClassName: 'learnblocks-floating'},
    dom.div({className: 'flex-outer learn'},
      dom.div({className: 'flex-inner'},
        dom.div({className: 'learnblocks'},
          dom.div({className: 'learnblocks-item learnblocks-item_basics'},
            dom.div({className: 'learnblocks-item-icon'}),
            dom.div({className: 'learnblocks-item-title'}, 'Basics')
          ),
          dom.div({className: 'learnblocks-item learnblocks-item_yml'},
            dom.div({className: 'learnblocks-item-icon'}),
            dom.div({className: 'learnblocks-item-title'}, 'Wercker.yml')
          ),
          dom.div({className: 'learnblocks-item learnblocks-item_boxes'},
            dom.div({className: 'learnblocks-item-icon'}),
            dom.div({className: 'learnblocks-item-title'}, 'Boxes')
          ),
          dom.div({className: 'learnblocks-item learnblocks-item_steps'},
            dom.div({className: 'learnblocks-item-icon'}),
            dom.div({className: 'learnblocks-item-title'}, 'Steps')
          ),
          dom.div({className: 'learnblocks-item learnblocks-item_build'},
            dom.div({className: 'learnblocks-item-icon'}),
            dom.div({className: 'learnblocks-item-title'}, 'Build')
          ),
          dom.div({className: 'learnblocks-item learnblocks-item_deploy'},
            dom.div({className: 'learnblocks-item-icon'}),
            dom.div({className: 'learnblocks-item-title'}, 'Deploy')
          )
        )
      )
    )
  );
}
