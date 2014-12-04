/**
 * Module dependencies.
 */

var slugify = require('slugificate');
var react = require('react');
var sticky = require('react-sticky');

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

  return dom.div({className: 'learnblocks'},
    dom.div({className: 'learnblocks-item learnblocks-item_basics'},
      dom.a({
        className: 'learnblocks-item-icon',
        href: '/learn/index.html'
      }, dom.img( {src:'/images/icon-basics.svg', alt:'Basics'})),
      dom.div({className: 'learnblocks-item-title'}, 'Basics')
    ),
    dom.div({className: 'learnblocks-item learnblocks-item_yml'},
      dom.a({
        className: 'learnblocks-item-icon',
        href: '/learn/index.html'
      }, dom.img( {src:'/images/icon-yml.svg', alt:'wercker.yml'})),
      dom.div({className: 'learnblocks-item-title'}, 'Wercker.yml')
    ),
    dom.div({className: 'learnblocks-item learnblocks-item_boxes'},
      dom.a({
        className: 'learnblocks-item-icon',
        href: '/learn/index.html'
      }, dom.img( {src:'/images/icon-boxes.svg', alt:'Boxes'})),
      dom.div({className: 'learnblocks-item-title'}, 'Boxes')
    ),
    dom.div({className: 'learnblocks-item learnblocks-item_steps'},
      dom.a({
        className: 'learnblocks-item-icon',
        href: '/learn/index.html'
      }, dom.img( {src:'/images/icon-steps.svg', alt:'Steps'})),
      dom.div({className: 'learnblocks-item-title'}, 'Steps')
    ),
    dom.div({className: 'learnblocks-item learnblocks-item_build'},
      dom.a({
        className: 'learnblocks-item-icon',
        href: '/learn/index.html'
      }, dom.img( {src:'/images/icon-build.svg', alt:'Build'})),
      dom.div({className: 'learnblocks-item-title'}, 'Build')
    ),
    dom.div({className: 'learnblocks-item learnblocks-item_deploy'},
      dom.a({
        className: 'learnblocks-item-icon',
        href: '/learn/index.html'
      }, dom.img( {src:'/images/icon-deploy.svg', alt:'Deploy'})),
      dom.div({className: 'learnblocks-item-title'}, 'Deploy')
    )
  );
}
