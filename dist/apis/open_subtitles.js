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

  /* Define apiName */
  var apiName = 'open-subtitles';

  /* Define opensubtitles-api instance */
  var openSubtitlesApi = new _opensubtitlesApi2.default('OSTestUserAgent');

  /* Format openSubtitles format to Dragand format */
  var formatJson = function formatJson(result) {

    var resultFormated = [];

    options.languages.forEach(function (language) {
      Object.keys(result).forEach(function (index) {
        if (index === language) {
          resultFormated.push({
            type: result[index].url.substr(result[index].url.lastIndexOf('.') + 1),
            language: result[index].lang,
            url: result[index].url,
            api: apiName
          });
        }
      });
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
      'serie': ['languages', 'imdbId', 'season', 'episode', 'fileName', 'filePath'],
      'movie': ['languages', 'imdbId', 'fileName', 'filePath']
    },

    /**
     * Set options before call
     * @param {object} configuration
     * @return {boolean} is configuration is valid
     */
    setOptions: function setOptions() {
      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      options = opts;
    },

    /**
     * Calling the API
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
    }
  };
};