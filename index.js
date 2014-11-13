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

var navSelector = document.querySelector('.sticky');
if (navSelector) react.renderComponent(nav(), navSelector);

var sidebarSelector = document.querySelector('.sidebar');
if (sidebarSelector) react.renderComponent(sidebar(), sidebarSelector);
