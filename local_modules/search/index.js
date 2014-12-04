/**
 * Module dependencies.
 */

var search = require('@local/search');
var react = require('react');

var textFilter = require('./algorithm');

var dom = react.DOM;

/**
 * Create class.
 */

module.exports = react.createClass({
  displayName: 'search',
  props: {
    setState: react.PropTypes.func.required,
    data: react.PropTypes.array.required
  },
  render: render
});

/**
 * Render.
 */

function render() {
  return dom.section({className: 'section-search'},
    dom.form(null,
      dom.input({
        type: 'text',
        placeholder: 'search',
        className: 'search-input',
        onChange: handleChange.bind(this)
      }),
      dom.img({src:'/images/icon-magnifier.svg', alt:'search'})
    )
  );
}

/**
 * Handle change.
 *
 * @param {Event} e
 * @api private
 */

function handleChange(e) {
  var setParentState = this.props.setState;
  var parentData = this.props.data;

  setParentState({
    data: textFilter.call(this, parentData, e.target.value)
  });
}
