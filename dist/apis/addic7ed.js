'use strict';

var _addic7ed = require('../helper/addic7ed');

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Export Addic7ed API helper
 */
module.exports = function () {

  /* Define api name */
  var apiName = 'addic7ed';

  /* Define api url */
  var apiUrl = 'addic7ed.com';

  /* Format yify format to Dragand format */
  var formatJson = function formatJson(result) {

    var resultFormated = [];

    result.forEach(function (sub) {
      resultFormated.push({
        type: 'srt',
        language: sub.language,
        url: 'http://' + (apiUrl + sub.url),
        api: apiName
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
    type: ['serie'],

    /* Necessary parameters */
    parameters: {
      serie: ['languages', 'title', 'episode', 'season', 'releaseGroup']
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
     * Calling the API for movies
     * @return {promise} format data and errors
     */
    callSeries: function callSeries() {
      var deferred = _q2.default.defer();

      /* Get Addicted series mapping */
      _addic7ed.addic7edHelper.scrapping().then(function (result) {

        /* Get serie Id from the name */
        _addic7ed.addic7edHelper.getSerieId(result, options.title).then(function (serieId) {

          /* Define in options the serie id from addic7ed */
          options.serieId = serieId;

          /* Get all subtitles */
          _addic7ed.addic7edHelper.getSubs(options, options.languages.length - 1, function (subs) {
            deferred.resolve(formatJson(subs));
          });
        });
      });

      return deferred.promise;
    }
  };
};