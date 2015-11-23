'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragandSubtitles = undefined;

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
var DragandSubtitles = function DragandSubtitles() {

  /**
   *  Get all availabe apis
   *  @param {string} type of subtitles movie/serie
   *  @return {array} All apis name
   */
  var getApis = function getApis() {
    var type = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    return _apis2.default.filter(function (api) {
      return !type ? api : api.type.indexOf(type) != -1;
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
    return apisOptions.filter(function (param) {
      return !parameters[param];
    }).length > 0 ? false : true;
  };

  var sortByApi = function sortByApi(result, apis) {
    var subs = [];
    Object.keys(result).forEach(function (language) {
      apis.forEach(function (api) {
        subs = [].concat(subs, result[language].filter(function (sub) {
          return sub.api == api;
        }));
      });
      result[language] = [];
      result[language] = [].concat(result[language], subs);
      subs = [];
    });

    return result;
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
  var getSubtitles = function getSubtitles(type, apis, parameters) {
    return _q2.default.allSettled(apis.map(function (api) {
      return type == "serie" ? api.callSeries() : api.callMovies();
    })).then(function (results) {
      return sortByApi(formatResult(results), parameters.apis);
    });
  };

  /* Object API return */
  return {

    /**
     *  Get subtitles for a specific serie
     *  @param {object} options
     *  @return {promise} promise with subs
     */

    getSerieSubtitles: function getSerieSubtitles() {
      var _ref;

      var parameters = arguments.length <= 0 || arguments[0] === undefined ? (_ref = {}, imdbId = _ref.imdbId, filePath = _ref.filePath, fileName = _ref.fileName, title = _ref.title, apis = _ref.apis, languages = _ref.languages, episode = _ref.episode, season = _ref.season, releaseGroup = _ref.releaseGroup, _ref) : arguments[0];

      /* Get all series apis that match with parameters, filter api requested, and set options */
      var seriesApis = getApis('serie').filter(function (api) {
        return !parameters.apis ? true : parameters.apis.indexOf(api.name) != -1;
      }).filter(function (api) {
        return validApiOptions(parameters, api.parameters.serie);
      }).map(function (api) {
        api.setOptions(parameters);
        return api;
      });

      return getSubtitles("serie", seriesApis, parameters);
    },

    /**
     *  Get subtitles for a specific movie
     *  @param {object} options
     *  @return {promise} promise with subs
     */
    getMovieSubtitles: function getMovieSubtitles() {
      var _ref2;

      var parameters = arguments.length <= 0 || arguments[0] === undefined ? (_ref2 = {}, imdbid = _ref2.imdbid, filePath = _ref2.filePath, title = _ref2.title, apis = _ref2.apis, languages = _ref2.languages, _ref2) : arguments[0];

      /* Get all movies apis that match with parameters and set options */
      var moviesApis = getApis('movie').filter(function (api) {
        return parameters.apis.indexOf(api.name) != -1;
      }).filter(function (api) {
        return validApiOptions(parameters, api.parameters.movie);
      }).map(function (api) {
        api.setOptions(parameters);
        return api;
      });

      return getSubtitles("movie", moviesApis, parameters);
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

exports.DragandSubtitles = DragandSubtitles;