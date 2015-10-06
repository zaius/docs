const window = require('global/window');
const slugify = require('slugificate');
const react = require('react');
const util = require('util');

const dom = react.DOM;

const blocks = [
  'basics',
  'wercker.yml',
  'containers',
  'pipelines',
  'steps',
  'build',
  'deploy'
];

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
function render () {
  return dom.div({className: 'learnblocks ' + showIntro()},
    blocks.map(function (block) {
      return dom.div({className: createClassName(block), key: block},
        dom.a({
          className: 'learnblocks-item-icon ',
          href: '/learn/' + slugify(block) + '/introduction.html'
        }, dom.img({src: '/images/icon-' + block + '.svg', alt: block}),
          dom.div({className: 'learnblocks-item-title'}, block)
        ),
        dom.div({
          className: 'learnblocks-item_active'
        })
      );
    })
  );
}

/**
 * Create className.
 *
 * @param {String} block
 */
function createClassName (block) {
  const head = window.location.pathname.split('/')[2];
  const active = (head === slugify(block));
  const blockName = block.replace(/(\.)/gm, '_');

  return util.format('learnblocks-item learnblocks-item_%s%s', blockName, (active ? ' active' : ''));
}

/**
 * Set local storage to only show intro once
 */
function showIntro () {
  if (window.localStorage.getItem('learnblocks-intro') !== 'true') {
    window.localStorage.setItem('learnblocks-intro', 'true');
    return 'intro';
  } else {
    return '';
  }
}
