'use strict';

var _podnapisi = require('../helper/podnapisi');

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Export Podnapisi API helper
 */
module.exports = function () {

  /* Define api name */
  var apiName = 'podnapisi';

  /* Define api url */
  var apiUrl = 'podnapisi.net';

  /* Format podnapisi format to Dragand format */
  var formatJson = function formatJson(result) {

    var resultFormated = [];

    result = result.map(function (sub) {
      return {
        type: 'zip',
        language: sub.language,
        releaseGroup: sub.release,
        url: sub.url + '/download',
        api: apiName
      };
    });

    return result;
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
      'serie': ['languages', 'title', 'episode', 'season'],
      'movie': ['languages', 'title']
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
     * Calling the API for series
     * @return {promise} format data and errors
     */
    callSeries: function callSeries() {
      var deferred = _q2.default.defer();

      /* We search a serie */
      options.type = 'serie';

      _podnapisi.podnapisiHelper.getSubs(options, options.languages.length - 1, function (subs) {
        deferred.resolve(formatJson(subs));
      });

      return deferred.promise;
    },

    /**
     * Calling the API for movies
     * @return {promise} format data and errors
     */
    callMovies: function callMovies() {
      var deferred = _q2.default.defer();

      /* We search a serie */
      options.type = 'movie';

      _podnapisi.podnapisiHelper.getSubs(options, options.languages.length - 1, function (subs) {
        deferred.resolve(formatJson(subs));
      });

      return deferred.promise;
    }
  };
};