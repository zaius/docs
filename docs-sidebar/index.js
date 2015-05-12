const slugify = require('slugificate');
const react = require('react');

const renderSimpleSidebar = require('./list-learn');
const docsToc = require('./toc-docs.json');
const renderSearch = require('./search');

var dom = react.DOM;

module.exports = createClass;

// create react class
// null -> null
function createClass() {
  return react.createClass({
    displayName: 'sidebar',
    getDefaultProps: function() {
      return {data: docsToc}
    },
    getInitialState: function() {
      return {data: this.props.data}
    },
    render: function render() {
      if (getWindowUrl() === 'learn') {
        return renderSimpleSidebar(this.state, this.props);
      }
      return renderSidebar(this.props, this.state, this.setState.bind(this));
    }
  });
}

// render the sidebar
// obj, obj, fn -> obj
function renderSidebar(props, state, setState) {
  return dom.section({className: 'section-sidebar'},
    renderSearch({data: props.data, setState: setState}),
    dom.section({className: 'sidebar-list'},
      createList(state.data, props.data)
    )
  );
}

// transform data into a
// list of ui components
// [[str]], [[str]] -> [obj]
function createList(data, propdata) {
  return data.map((arr, i) => {
    const section = propdata[i][0];

    const nw = arr.map((article, j) => {
      if (j === 0 && article === section) {
        const uri = createUri(section, propdata[i][1]);
        return renderHeadElement(stripFileExt(article), uri);
      }
      const uri = createUri(section, article);
      return renderLiElement(stripFileExt(article), uri);
    });

    return renderSubListContainer('arr' + i, nw);
  });
}

// render a list heading element
// str, str -> obj
function renderHeadElement(str, uri) {
  var params = {
    className: 'sidebar-li',
    key: str,
    href: uri
  }
  return dom.a(params, str);
}

// render a li element
// str, str -> obj
function renderLiElement(str, uri) {
  return dom.li({className: 'sidebar-li_sub', key: str + uri},
    dom.a({href: uri}, str)
  )
}

// render the sub list container
// str, [obj] -> obj
function renderSubListContainer(key, els) {
  return dom.ul({key: key}, els);
}

// clean file name
// str -> str
function stripFileExt(filename) {
  var name = filename.replace(/-/g, ' ');
  return name.split('.')[0];
}

// create href links for the sidebar
// str, str, -> str
function createUri(section, article) {
  article = article.split('.')[0];
  return '/docs/' + section + '/' + article + '.html';
}

// get the baseUrl from the window
// null -> str
function getWindowUrl() {
  var pathName = window.location.pathname.match(/\/\w+\//)[0];
  return pathName.split('/')[1];
}
