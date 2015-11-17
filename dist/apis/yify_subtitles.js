'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Export Open Subtitles API helper
 */

exports.default = function () {

  /* Define api name */
  var apiName = 'yify-subtitles';

  /* Define api url */
  var apiUrl = 'yifysubtitles.com';

  /* Map language */
  var languageMapping = {
    'albanian': 'sq',
    'arabic': 'ar',
    'bengali': 'bn',
    'bulgarian': 'bg',
    'bosnian': 'bs',
    'chinese': 'zh',
    'croatian': 'hr',
    'czech': 'cs',
    'danish': 'da',
    'dutch': 'nl',
    'english': 'en',
    'estonian': 'et',
    'farsi-persian': 'fa',
    'finnish': 'fi',
    'french': 'fr',
    'german': 'de',
    'greek': 'el',
    'hebrew': 'he',
    'hungarian': 'hu',
    'indonesian': 'id',
    'italian': 'it',
    'japanese': 'ja',
    'korean': 'ko',
    'lithuanian': 'lt',
    'macedonian': 'mk',
    'malay': 'ms',
    'norwegian': 'no',
    'polish': 'pl',
    'portuguese': 'pt',
    'romanian': 'ro',
    'russian': 'ru',
    'serbian': 'sr',
    'slovenian': 'sl',
    'spanish': 'es',
    'swedish': 'sv',
    'thai': 'th',
    'turkish': 'tr',
    'urdu': 'ur',
    'ukrainian': 'uk',
    'vietnamese': 'vi'
  };

  /* Return languaged mapped */
  var getLanguageMapped = function getLanguageMapped(language) {
    for (var key in languageMapping) {
      if (languageMapping[key] === language) {
        return key;
      }
    }
  };

  /* Format yify format to Dragand format */
  var formatJson = function formatJson(result) {

    var resultFormated = [];

    // For each languages
    options.languages.forEach(function (language) {

      var languageMapped = getLanguageMapped(language);
      var subs = result.subs[options.imdbId];

      Object.keys(subs).forEach(function (index) {

        if (index == languageMapped) {

          subs[index].forEach(function (sub) {
            if (sub.rating >= 0) {
              resultFormated.push({
                type: 'zip',
                language: language,
                url: 'http://' + (apiUrl + sub.url),
                api: apiName
              });
            }
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
    type: ['movie'],

    /* Necessary parameters */
    parameters: {
      'movie': ['languages', 'imdbId']
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
    callMovies: function callMovies() {
      var deferred = _q2.default.defer();

      (0, _request2.default)('http://api.' + apiUrl + '/subs/' + options.imdbId, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          deferred.resolve(body.subtitles === 0 ? [] : formatJson(JSON.parse(body)));
        } else {
          deferred.reject(error);
        }
      });

      return deferred.promise;
    }
  };
};