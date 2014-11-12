/*global document*/

/**
 * Module dependencies
 */

var nav = require('@local/nav');
var sidebar = require('@local/sidebar');
var react = require('react');
var dom = react.DOM;

/**
 * Create stuff
 */

react.renderComponent(nav(), document.querySelector('.sticky'));
react.renderComponent(sidebar(), document.querySelector('.sidebar'));
