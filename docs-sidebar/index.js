const slugify = require('slugificate');
const react = require('react');
const urit = require('urit');

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
      console.log(this.props)
      return {data: this.props.data}
    },
    render: function render() {
      if (getWindowUrl() === 'learn') {
        return renderSimpleSidebar(this.state, this.props);
      }
      return renderSidebar.call(this);
    }
  });
}

// render the sidebar
// obj -> obj
function renderSidebar() {
  return dom.section({className: 'section-sidebar'},
    renderSearch({data: this.props.data, setState: this.setState.bind(this)}),
    dom.section({className: 'sidebar-list'},
      createList(this.props.data)
    )
  );
}

// transform data into a
// list of ui components
// obj -> obj
function createList(data) {
  return data.map((arr, i) => {
    const section = arr[0];
    const ret = arr.map((article, j) => {
      if (j === 0) {
        const uri = createUri(section, arr[1]);
        return renderHeadElement(stripFileExt(article), uri);
      }
      const uri = createUri(section, article);
      return renderLiElement(stripFileExt(article), uri);
    });
    return renderSubListContainer('arr' + i, ret);
  })
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
function stripFileExt(valTwo) {
  var name = valTwo.replace(/([-])/g, ' ');
  return name.split('.')[0];
}

// create href links for the sidebar
// str, str, -> str
function createUri(section, article) {
  const tmpl = urit('/docs{/section}{/article}.html');
  return tmpl({
    section: section,
    article: slugify(article.split('.')[0])
  });
}

// get the baseUrl from the window
// null -> str
function getWindowUrl() {
  var pathName = window.location.pathname.match(/\/\w+\//)[0];
  return pathName.split('/')[1];
}
