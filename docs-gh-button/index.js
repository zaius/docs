const customElement = require('custom-element');
const path = require('path');
const fs = require('fs');

const template = fs.readFileSync(__dirname + '/index.html', 'utf8');

const btn = customElement(window.HTMLAnchorElement.prototype);
btn.extends = 'a';

module.exports = btn;

btn.on('attached', function () {
  this.setAttribute('href', ghLocation());
  this.classList.add('gh-button');
  this.innerHTML = template;
});

function ghLocation () {
  const base = 'https://github.com/wercker/docs/blob/master/content';
  const suffix = window.location.pathname.replace(/html/, 'md');
  return base + suffix;
}
