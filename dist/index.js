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

  /**
   * Check if all options are valid
   * @param {array} api options required
   * @param {object} options
   * @return {boolean}
   */
  var validApiOptions = function validApiOptions(parameters, apisOptions) {
    console.log(parameters);
    console.log(apisOptions);
    var missing = apisOptions.filter(function (param) {
      return !parameters[param];
    });
    return missing.length > 0 ? false : true;
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
      var _ref2, _ref2$stopOnFind;

      var parameters = arguments.length <= 0 || arguments[0] === undefined ? (_ref2 = {}, imdbid = _ref2.imdbid, filepath = _ref2.filepath, title = _ref2.title, apis = _ref2.apis, languages = _ref2.languages, type = _ref2.type, episode = _ref2.episode, season = _ref2.season, release_group = _ref2.release_group, _ref2$stopOnFind = _ref2.stopOnFind, stopOnFind = _ref2$stopOnFind === undefined ? false : _ref2$stopOnFind, _ref2) : arguments[0];

      /* Get all series apis that match with parameters */
      var seriesApis = getApis('serie').filter(function (api) {
        return validApiOptions(parameters, api.parameters.serie);
      });
      // let seriesApis = getApis('serie')
      console.log(seriesApis);
      // Reject all apis that doesn't match parameters;

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
     *  @return {array} All apis name
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