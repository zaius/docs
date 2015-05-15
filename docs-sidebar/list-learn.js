var slugify = require('slugificate');
var react = require('react');

const toc = require('./toc-learn.json');

var dom = react.DOM;

module.exports = learnList

// render the learn sidebar list
// null -> obj
function learnList() {
  const lesson = getLesson()
  const lessonData = getLessonData(toc, lesson);
  const sectionClass = 'section-sidebar section-learn section-sidebar_' + lesson;
  const list = createList(lessonData, lesson);

  return dom.section({className: sectionClass},
    dom.section({className: 'sidebar-list'},
      dom.ul(null, list)
    )
  )
}

// get the lesson data
// [[str]], str -> [str]
function getLessonData(lessons, key) {
  const arr = lessons.filter(function(lesson) {
    return lesson[0] === key;
  })[0];
  arr.shift()
  return arr
}

// create the element list
// [[str]] -> obj
function createList(data, lesson) {
  return data.map(function(val) {
    const innerUri = createHref(stripUrl(), lesson, val);
    const outerClass = 'sidebar-li_sub' + activeClass(val);
    const innerText = stripFileName(val);

    return dom.li({className: outerClass, key: val},
      dom.a({href: innerUri}, innerText)
    )
  })
}

// set active className
// str -> str
function activeClass(val) {
  const head = window.location.pathname.split('/')[3].split('.')[0];
  const isActive = (head === slugify(val.split('.')[0]));
  return isActive ? ' active' : '';
}

// clean up file name
// str -> str
function stripFileName(val) {
  var name = val.replace(/-/g, ' ');
  return name.split('.')[0];
}

// get the current basepath
// null -> str
function stripUrl() {
  var pathName = window.location.pathname.match(/\/\w+\//)[0];
  return pathName.split('/')[1];
}

// get the lesson from
// the current window uri
// null -> str
function getLesson() {
  var pathArr = window.location.pathname.split('/')[2];
  return pathArr.split('.')[0];
}

// create the menu uri
// str, str, str -> str
function createHref(base, lesson, val) {
  const slug = slugify(val.split('.')[0]);
  return '/' + base + '/' + lesson + '/' + slug + '.html';
}
