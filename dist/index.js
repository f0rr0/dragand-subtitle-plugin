'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _package = require('../package.json');

var _apis = require('./apis');

var _apis2 = _interopRequireDefault(_apis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Dragand Subtitles Plugin
 * Factory pattern
 * @param {object} options
 * @return object with properties and methods
 */

exports.default = function () {
  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var _ref$excludes = _ref.excludes;
  var excludes = _ref$excludes === undefined ? [] : _ref$excludes;

  /*  Here private methods and private properties */

  /* Specified exlude as an array */
  if (!(0, _lodash.isArray)(excludes)) {
    excludes = [];
  }

  /* Get all apis name and remove excludes ones */
  var apis = _apis2.default;

  /**
   *  Get all availabe apis
   *  @param {string} type of subtitles movie/serie
   *  @return {areay} All apis name
   */
  var getApis = function getApis() {
    var type = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    return apis.filter(function (api) {
      return !type ? api : api.type.indexOf(type) != -1;
    }).filter(function (api) {
      return excludes.indexOf(api.name) == -1;
    });
  };

  /**
   * Get apis by names
   * @param {array} names
   * @return {array} apis objects
   */
  var getApisByName = function getApisByName() {
    var names = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

    return getApis().filter(function (api) {
      return names.indexOf(api.name) != -1;
    });
  };

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

      /* For each serie apis */
      var seriesApis = getApis('serie');

      // ==> Check parameters
      // If no apis ok --> return exception
      // If at least one api is ok
      // For each api
      // Call them
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

      /* For each movie apis */
      var seriesApis = getApis('movie');

      // ==> Check parameters
      // If no apis ok --> return exception
      // If at least one api is ok
      // For each api
      // Call them
    },

    /**
     *  Get all availabe apis
     *  @param {string} type of subtitles movie/serie
     *  @return {areay} All apis name
     */
    apis: function apis() {
      var type = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      return getApis(type).map(function (api) {
        return api.name;
      });
    },

    /**
     *  Get informations about a specific api
     *  @param {string} api name
     *  @return {object} api information
     */
    api: function api() {
      var _api = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      if (!_api) {
        return undefined;
      }
      return getApisByName([_api]).length == 1 ? getApisByName([_api])[0] : undefined;
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