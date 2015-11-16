"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

/**
 * Dragand Subtitles Plugin
 * Factory pattern
 * @return simple object with properties and methods
 */

exports.default = function () {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$exclude = _ref.exclude;
  var exclude = _ref$exclude === undefined ? [] : _ref$exclude;

  /*  Here private methods and properties */

  /* Specified exlude as an array */
  if (!(0, _lodash.isArray)(exclude)) {
    exclude = [];
  }

  var _apis = ["open-subtitle"];

  /* Object return */
  return {
    exclude: exclude,

    getSerieSubtitles: function getSerieSubtitles() {},
    getMovieSubtitles: function getMovieSubtitles() {},
    apis: function apis() {
      return _apis;
    },
    credits: function credits() {
      return [];
    }
  };
};