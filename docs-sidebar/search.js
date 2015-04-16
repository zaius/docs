var react = require('react')
var textFilter = require('./algorithm');

var dom = react.DOM;

// create class
module.exports = react.createClass({
  displayName: 'search',
  props: {
    setState: react.PropTypes.func.required,
    data: react.PropTypes.array.required
  },
  render: render
});

// render
function render() {
  return dom.section({className: 'section-search'},
    dom.form(null,
      dom.input({
        type: 'text',
        placeholder: 'search',
        className: 'search-input',
        onChange: handleChange.bind(this),
        onKeyDown: onKeyDown.bind(this)
      }),
      dom.img({src:'/images/icon-magnifier.svg', alt:'search'})
    )
  );
}

// handle change
// e -> null
function handleChange(e) {
  var setParentState = this.props.setState;
  var parentData = this.props.data;

  setParentState({
    data: textFilter.call(this, parentData, e.target.value)
  });
}

// clear input field if `esc` is pressed.
// ignore `enter`.
// e -> null
function onKeyDown(e) {
  if (e.which === 13) e.preventDefault();
  if (e.which !== 27) return;

  e.target.value = '';
  this.props.setState({data: this.props.data});
}
