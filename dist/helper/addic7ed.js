'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addic7edHelper = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _natural = require('natural');

var _natural2 = _interopRequireDefault(_natural);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Export Addic7ed helper
 */

var addic7edHelper = exports.addic7edHelper = (function () {
  function addic7edHelper() {
    _classCallCheck(this, addic7edHelper);
  }

  _createClass(addic7edHelper, null, [{
    key: 'languageMapping',

    /* Map language */
    value: function languageMapping(language) {

      var mapping = {
        'sq': '52',
        'ar': '38',
        'arm': '50',
        'az': '48',
        'bn': '47',
        'bs': '44',
        'bg': '35',
        'ca': '12',
        'cn': '41',
        'zh': '24',
        'hr': '31',
        'cs': '14',
        'da': '30',
        'nl': '17',
        'en': '1',
        'est': '54',
        'eu': '13',
        'fi': '28',
        'fr': '8',
        'fr-ca': '53',
        'gl': '15',
        'de': '11',
        'el': '27',
        'he': '23',
        'hin': '55',
        'hu': '20',
        'ice': '56',
        'id': '37',
        'it': '7',
        'ja': '32',
        'ko': '42',
        'lav': '57',
        'lit': '58',
        'mk': '49',
        'ms': '40',
        'no': '29',
        'fa': '43',
        'pl': '21',
        'pt': '9',
        'pt-br': '10',
        'ro': '26',
        'ru': '19',
        'sr': '39',
        'sr-la': '36',
        'sk': '25',
        'sl': '22',
        'es': '4',
        'es-la': '6',
        'es-es': '5',
        'sv': '18',
        'tam': '59',
        'th': '46',
        'tr': '16',
        'ukr': '51',
        'vi': '45'
      };

      return mapping[language];
    }

    /* Check if the subtitles is ready */

  }, {
    key: 'getStatus',
    value: function getStatus(string) {
      if (string === 'Completed') {
        return 100;
      }

      return parseInt(string.replace(' Completed', '').replace('%', ''));
    }

    /* Check if the release file */

  }, {
    key: 'compareReleaseGroup',
    value: function compareReleaseGroup(releaseFile, releaseAddic7ed) {

      releaseFile = releaseFile.toLowerCase();
      releaseAddic7ed = releaseAddic7ed.toLowerCase();

      if (releaseFile === releaseAddic7ed) {
        return true;
      } else {
        var diceScore = _natural2.default.DiceCoefficient(releaseFile, releaseAddic7ed);

        return diceScore >= 0.5 ? true : false;
      }
    }

    /**
      Scrapping addicted website and export data
      TODO Save data on a JSON on a file
      TODO Check the date of the file, if is old => Create new file with new value from scrapping
    */

  }, {
    key: 'scrapping',
    value: function scrapping() {

      var deferred = _q2.default.defer();
      var shows = [];

      /* Making the request */
      (0, _request2.default)('http://www.addic7ed.com/shows.php', function (error, response, body) {

        if (!error && response.statusCode === 200) {
          (function () {
            var $ = _cheerio2.default.load(body);

            $('h3 > a').each(function (index, element) {
              shows.push({
                name: $(element).text(),
                id: /\d+/.exec($(element).attr('href'))[0]
              });
            });
          })();
        }

        deferred.resolve(shows);
      });

      return deferred.promise;
    }
  }, {
    key: 'getSerieId',
    value: function getSerieId(addic7edSeriesMapping, serieName) {

      var deferred = _q2.default.defer();
      var serieId = null;
      var matches = [];

      Object.keys(addic7edSeriesMapping).forEach(function (serie) {

        var currentSerieName = addic7edSeriesMapping[serie].name;

        if (currentSerieName.toLowerCase() === serieName.toLowerCase()) {
          serieId = addic7edSeriesMapping[serie].id;
        } else {
          matches.push({
            name: currentSerieName,
            id: addic7edSeriesMapping[serie].id,
            score: _natural2.default.DiceCoefficient(currentSerieName, serieName)
          });
        }
      });

      /* If we haven't find the serie, check with the score */
      if (!serieId) {

        matches.sort(function (a, b) {
          return b.score - a.score;
        });

        if (matches[0].score >= 0.8) {
          return deferred.resolve(matches[0].id);
        }

        return deferred.reject();
      }

      /* If we have the serie */
      deferred.resolve(serieId);

      return deferred.promise;
    }
  }, {
    key: 'getSubs',
    value: function getSubs(options, counter, cb) {
      var _this = this;

      var subs = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

      /* Exit Point */
      if (counter < 0) {
        return cb(subs);
      }

      var languageId = this.languageMapping(options.languages[counter]);

      (0, _request2.default)('http://addic7ed.com/ajax_loadShow.php?show=' + options.serieId + '&season=' + options.season + '&langs=|' + languageId + '|', function (error, response, body) {
        if (!error && response.statusCode === 200) {
          (function () {
            var $ = _cheerio2.default.load(body);

            $('div#season tbody tr.epeven.completed').each(function (i, row) {
              var columns = $(row).find('td');
              var percent = _this.getStatus($(columns[5]).text());

              if ($(columns[1]).text() === String(options.episode) && _this.compareReleaseGroup(options.releaseGroup, $(columns[4]).text())) {

                if (percent >= 90) {
                  subs.push({
                    language: options.languages[counter],
                    url: $(columns[9]).find('a').first().attr('href')
                  });
                }
              }
            });
          })();
        }

        _this.getSubs(options, counter - 1, cb, subs);
      });
    }
  }]);

  return addic7edHelper;
})();