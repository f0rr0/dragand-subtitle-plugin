'use strict';

var _lodash = require('lodash');

var _package = require('../package.json');

var _apis = require('./apis');

var _apis2 = _interopRequireDefault(_apis);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Dragand Subtitles Plugin
 * Factory pattern
 * @param {object} options
 * @return object with properties and methods
 */
module.exports = function () {
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
   *  @return {array} All apis name
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
    var missing = apisOptions.filter(function (param) {
      return !parameters[param];
    });
    return missing.length > 0 ? false : true;
  };

  /**
   * Transform languages array to an object
   * @param {array} languages
   * @return {object}
   */
  var getLanguageToObject = function getLanguageToObject(languages) {
    return languages.reduce(function (obj, lang) {
      obj[lang] = false;
      return obj;
    }, {});
  };

  /**
   * Format all apis results to a human readable object
   * @param {array} Q promise result (fulfilled & rejected)
   * @return {object} final result object
   */
  var formatResult = function formatResult(results) {
    return results.filter(function (result) {
      return result.state == "fulfilled";
    }).map(function (result) {
      return result.value;
    }).reduce(function (concat, result) {
      return [].concat(concat, result);
    }, []).reduce(function (obj, item) {
      obj[item.language] = obj[item.language] || [];
      obj[item.language].push(item);
      return obj;
    }, {});
  };

  /**
   * Get Subtitles from apis
   * @param {array} array of apis
   * @param {promise}
   */
  var getSubtitles = function getSubtitles(apis, parameters) {
    var languages = getLanguageToObject(parameters.languages);
    return _q2.default.allSettled(apis.map(function (api) {
      return api.callSeries();
    })).then(function (results) {
      return formatResult(results);
    });
  };

  /* Object API return */
  return {

    /* Excludes apis */
    excludes: excludes,

    /**
     *  Get subtitles for a specific serie
     *  @param {object} options
     *  @return {promise} promise with subs
     */
    getSerieSubtitles: function getSerieSubtitles() {
      var _ref2, _ref2$stopOnFind;

      var parameters = arguments.length <= 0 || arguments[0] === undefined ? (_ref2 = {}, imdbid = _ref2.imdbid, filePath = _ref2.filePath, fileName = _ref2.fileName, title = _ref2.title, apis = _ref2.apis, languages = _ref2.languages, episode = _ref2.episode, season = _ref2.season, releaseGroup = _ref2.releaseGroup, _ref2$stopOnFind = _ref2.stopOnFind, stopOnFind = _ref2$stopOnFind === undefined ? false : _ref2$stopOnFind, _ref2) : arguments[0];

      /* Get all series apis that match with parameters and set options */
      var seriesApis = getApis('serie').filter(function (api) {
        return validApiOptions(parameters, api.parameters.serie);
      }).map(function (api) {
        api.setOptions(parameters);
        return api;
      });

      return getSubtitles(seriesApis, parameters);
    },

    /**
     *  Get subtitles for a specific movie
     *  @return {promise} promise with subs
     */
    getMovieSubtitles: function getMovieSubtitles() {
      var _ref3, _ref3$stopOnFind;

      var parameters = arguments.length <= 0 || arguments[0] === undefined ? (_ref3 = {}, imdbid = _ref3.imdbid, filePath = _ref3.filePath, title = _ref3.title, apis = _ref3.apis, languages = _ref3.languages, _ref3$stopOnFind = _ref3.stopOnFind, stopOnFind = _ref3$stopOnFind === undefined ? false : _ref3$stopOnFind, _ref3) : arguments[0];

      /* Get all movies apis that match with parameters and set options */
      var moviesApis = getApis('movie').filter(function (api) {
        return validApiOptions(parameters, api.parameters.movie);
      }).forEach(function (api) {
        return api.setOptions(parameters);
      });
    },

    /**
     *  Get all available apis or a specific one
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
     *  @return {array} contributors
     */
    credits: function credits() {
      return _package.contributors;
    }
  };
};