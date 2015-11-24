'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileInformationHelper = undefined;

var _guessitWrapper = require('guessit-wrapper');

var _guessitWrapper2 = _interopRequireDefault(_guessitWrapper);

var _themoviedb = require('themoviedb');

var _themoviedb2 = _interopRequireDefault(_themoviedb);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Export fileInformation helper
 */

var fileInformationHelper = exports.fileInformationHelper = (function () {
  function fileInformationHelper() {
    _classCallCheck(this, fileInformationHelper);
  }

  _createClass(fileInformationHelper, null, [{
    key: 'guessitInformation',

    /**
     * Get file information from fileName
     *
     * @param  {string} filePath
     *
     * @return {object}
     */
    value: function guessitInformation(filePath) {
      var deferred = _q2.default.defer();

      _guessitWrapper2.default.parseName(filePath, true).then(function (data) {
        deferred.resolve(data);
      }).catch(function () {
        _guessitWrapper2.default.submitBug(filePath);
        deferred.reject();
      });

      return deferred.promise;
    }

    /**
     * Get informations from TheMovieDb
     *
     * @param  {string} serieName
     * @param  {string} theMovieDbKey
     *
     * @return {object}
     */

  }, {
    key: 'getSeriesInformation',
    value: function getSeriesInformation(serieName, theMovieDbKey) {

      var deferred = _q2.default.defer();

      var theMovieDbInstance = new _themoviedb2.default(theMovieDbKey);
      var cacheFilePath = __dirname + '/cache/shows/' + serieName.toLowerCase() + '.json';

      _fs2.default.stat(cacheFilePath, function (error, stats) {

        if (stats) {
          var cacheData = JSON.parse(_fs2.default.readFileSync(cacheFilePath, 'utf8'));

          deferred.resolve(cacheData);
        } else {
          (function () {

            var media = {};

            theMovieDbInstance.searchTVShows({ query: serieName }, function (err, tvshows) {

              media = {
                title: tvshows[0].name,
                years: tvshows[0].year,
                poster: tvshows[0].poster,
                largePoster: tvshows[0].backdrop
              };

              theMovieDbInstance.getTVShow(tvshows[0].id, function (err, tvshow) {

                media.overview = tvshow.overview;
                media.imdbId = tvshow.externalIds.imdbId;

                // Write data in JSON file :)
                _fs2.default.writeFile(cacheFilePath, JSON.stringify(media));

                deferred.resolve(media);
              });
            });
          })();
        }
      });

      return deferred.promise;
    }

    /**
     * Get informations from TheMovieDb
     *
     * @param  {string} movieName
     * @param  {string} theMovieDbKey
     *
     * @return {object}
     */

  }, {
    key: 'getMoviesInformation',
    value: function getMoviesInformation(movieName, theMovieDbKey) {

      var deferred = _q2.default.defer();

      var theMovieDbInstance = new _themoviedb2.default(theMovieDbKey);
      var cacheFilePath = __dirname + '/cache/movies/' + movieName.toLowerCase() + '.json';

      _fs2.default.stat(cacheFilePath, function (error, stats) {

        if (stats) {
          var cacheData = JSON.parse(_fs2.default.readFileSync(cacheFilePath, 'utf8'));

          deferred.resolve(cacheData);
        } else {
          (function () {

            var media = {};

            theMovieDbInstance.searchMovies({ query: movieName }, function (err, movies) {

              media = {
                title: movies[0].title,
                years: movies[0].year,
                poster: movies[0].poster,
                largePoster: movies[0].backdrop
              };

              theMovieDbInstance.getMovie(movies[0].id, function (err, movie) {

                media.overview = movie.overview;
                media.imdbId = movie.imdbId;

                // Write data in JSON file :)
                _fs2.default.writeFile(cacheFilePath, JSON.stringify(media));

                deferred.resolve(media);
              });
            });
          })();
        }
      });

      return deferred.promise;
    }
  }]);

  return fileInformationHelper;
})();

;