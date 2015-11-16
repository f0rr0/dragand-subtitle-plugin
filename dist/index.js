'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _package = require('../package.json');

var _apis2 = require('./apis');

var _apis3 = _interopRequireDefault(_apis2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Dragand Subtitles Plugin
 * Factory pattern
 * @return object with properties and methods
 */

exports.default = function () {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$excludes = _ref.excludes;
  var excludes = _ref$excludes === undefined ? [] : _ref$excludes;

  /*  Here private methods and properties */

  /* Specified exlude as an array */
  if (!(0, _lodash.isArray)(excludes)) {
    excludes = [];
  }

  /* Get all apis name and remove excludes ones */
  var _apis = _apis3.default.map(function (api) {
    return api.name;
  }).filter(function (api) {
    return excludes.indexOf(api) == -1;
  });

  /* Object API return */
  return {
    excludes: excludes,

    /**
     *  Get subtitles for a specific serie
     *  @param {object} options
     *  @return {promise} promise with subs
     */
    getSerieSubtitles: function getSerieSubtitles() {
      var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var imdbid = _ref2.imdbid;
      var filepath = _ref2.filepath;
      var title = _ref2.title;
      var apis = _ref2.apis;
      var languages = _ref2.languages;
      var type = _ref2.type;
      var episode = _ref2.episode;
      var season = _ref2.season;
      var release_group = _ref2.release_group;
      var _ref2$stopOnFind = _ref2.stopOnFind;
      var stopOnFind = _ref2$stopOnFind === undefined ? false : _ref2$stopOnFind;
    },

    /**
     *  Get subtitles for a specific movie
     *  @return {promise} promise with subs
     */
    getMovieSubtitles: function getMovieSubtitles() {
      var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var imdbid = _ref3.imdbid;
      var filepath = _ref3.filepath;
      var title = _ref3.title;
      var apis = _ref3.apis;
      var languages = _ref3.languages;
      var type = _ref3.type;
      var stopOnFind = _ref3.stopOnFind;
    },

    /**
     *  Get all availabe apis
     *  @return {promise} promise with subs
     */
    apis: function apis() {
      return _apis;
    },

    /**
     *  Get all library contributors
     *  @return {promise} promise with subs
     */
    credits: function credits() {
      return _package.contributors;
    }
  };
};