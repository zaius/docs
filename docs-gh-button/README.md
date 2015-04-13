# @docs/gh-button
Create an `edit on github` button. Bases the location of the `href` attribute
on the current window location.

## Usage
```js
document.registerElement('gh-button', require('@docs/gh-button'));

const button = document.createElement('a', 'gh-button');
document.body.appendChild(button);
```
