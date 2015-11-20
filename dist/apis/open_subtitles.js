'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _opensubtitlesApi = require('opensubtitles-api');

var _opensubtitlesApi2 = _interopRequireDefault(_opensubtitlesApi);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Export Open Subtitles API helper
 */

exports.default = function () {

  /* Define api name */
  var apiName = 'open-subtitles';

  /* Define opensubtitles-api instance */
  var openSubtitlesApi = new _opensubtitlesApi2.default('OSTestUserAgent');

  /**
   * Format openSubtitles result to Dragand format
   * @param {object} result
   * @return {array} array of subtitles
   */
  var formatJson = function formatJson(result) {

    var resultFormated = Object.keys(result).filter(function (key) {
      return options.languages.indexOf(key) != -1;
    }).map(function (key) {
      return result[key];
    }).map(function (sub) {
      return {
        type: sub.url.substr(sub.url.lastIndexOf('.') + 1),
        language: sub.lang,
        url: sub.url,
        api: apiName
      };
    });

    return resultFormated;
  };

  /* Options */
  var options = {};

  return {
    /* Name of the api */
    name: apiName,

    /* Type of data available */
    type: ['serie', 'movie'],

    /* Necessary parameters */
    parameters: {
      serie: ['languages', 'imdbId', 'fileName', 'filePath', 'season', 'episode'],
      movie: ['languages', 'imdbId', 'fileName', 'filePath']
    },

    /**
     * Set options before call
     * @param {object} options
     * @return {object} this
     */
    setOptions: function setOptions() {
      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      options = opts;
    },

    /**
     * Calling the API for series
     * @return {promise} format data and errors
     */
    callSeries: function callSeries() {
      var deferred = _q2.default.defer();

      openSubtitlesApi.search({
        sublanguageid: 'all',
        imdbid: options.imdbId,
        season: options.season,
        episode: options.episode,
        filename: options.fileName,
        path: options.filePath
      }).then(function (subtitles) {
        deferred.resolve(formatJson(subtitles));
      }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    },

    /**
     * Calling the API for movies
     * @return {promise} format data and errors
     */
    callMovies: function callMovies() {
      var deferred = _q2.default.defer();

      openSubtitlesApi.search({
        sublanguageid: 'all',
        imdbid: options.imdbId,
        filename: options.fileName,
        path: options.filePath
      }).then(function (subtitles) {
        deferred.resolve(formatJson(subtitles));
      }).catch(function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }
  };
};