/**
 * Client-side JavaScript helper starting point (for injecting polyfills and global styles)
 */

// inject polyfills for es5 support (e.g. promises node<0.12, es6 support) etc.
import "babel-polyfill";

// include the intl polyfil for browsers that don't support it (safari)
require("intl");
require("intl/locale-data/jsonp/de.js"); // include the german locale data for this polyfil
// (TODO load them async only if needed!)

// enables a fetch polyfill that works consistent on browser and server environments
// standard: https://fetch.spec.whatwg.org/
require("isomorphic-fetch");

// inject polyfill console.xx to avoid console related errors in old browser environments.
if (__DEVELOPMENT__) {
  require("./core/avoidConsoleErrors");
}

// import global application styles (styles in src/assets/styles/*.*ss are not locally scoped)
require("./assets/styles/global.less");

// https://github.com/zilverline/react-tap-event-plugin, When Facebook solves #436 and #1170, this repo will disappear.
// makes tapping events work like a breeze in browser environments
import React from "react";
require("react-tap-event-plugin")();

// REACT-WIDGETS only needed polyfill
// localicer configuration (to be able to use the Date & Time Picker from react-widgets) --> http://jquense.github.io/react-widgets/docs/#/i18n
const moment = require("moment");
require("moment/locale/de-at"); // directly inject the locale to use
const momentLocalizer = require("react-widgets/lib/localizers/moment");
momentLocalizer(moment); // finally set the react-widgets internal localizer up!
