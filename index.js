/*global document*/

/**
 * Module dependencies
 */

var learnblocks = require('@local/learnblocks');
var nav = require('@local/nav');
var sidebar = require('@local/sidebar');
var react = require('react');
var dom = react.DOM;

/**
 * Create stuff
 */

var learnblocksSelector = document.querySelector('.learn-blocks');
if (learnblocksSelector) react.renderComponent(learnblocks(), learnblocksSelector);

var navSelector = document.querySelector('.nav-sticky');
if (navSelector) react.renderComponent(nav(), navSelector);

var sidebarSelector = document.querySelector('.sidebar');
if (sidebarSelector) react.renderComponent(sidebar(), sidebarSelector);
