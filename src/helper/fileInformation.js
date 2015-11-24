import guessit from 'guessit-wrapper';
import theMovieDb from 'themoviedb';
import fs from 'fs';
import Q from 'q';

/**
 * Export fileInformation helper
 */
export class fileInformationHelper {

  /**
   * Get file information from fileName
   *
   * @param  {string} filePath
   *
   * @return {object}
   */
  static guessitInformation(filePath) {
    let deferred = Q.defer();

    guessit.parseName(filePath).then( data => {
      deferred.resolve(data);
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
  static getSeriesInformation(serieName, theMovieDbKey) {

    let deferred = Q.defer();

    const theMovieDbInstance = new theMovieDb(theMovieDbKey);
    const cacheFilePath      = __dirname + '/cache/shows/' + serieName.toLowerCase() + '.json';

    fs.stat(cacheFilePath, (error, stats) => {

      if (stats) {
        let cacheData = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));

        deferred.resolve(cacheData.media);
      } else {

        let media = {};

        theMovieDbInstance.searchTVShows({query: serieName}, (err, tvshows) => {

          media = {
            title       : tvshows[0].name,
            years       : tvshows[0].year,
            poster      : tvshows[0].poster,
            largePoster : tvshows[0].backdrop
          };

          theMovieDbInstance.getTVShow(tvshows[0].id, (err, tvshow) => {

            media.overview = tvshow.overview;
            media.imdbId = tvshow.externalIds.imdbId;

            // Write data in JSON file :)
            fs.writeFile(cacheFilePath, JSON.stringify(media));

            deferred.resolve(media);

          });

        });
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
  static getMoviesInformation(movieName, theMovieDbKey) {

    let deferred = Q.defer();

    const theMovieDbInstance = new theMovieDb(theMovieDbKey);
    const cacheFilePath      = __dirname + '/cache/movies/' + movieName.toLowerCase() + '.json';

    fs.stat(cacheFilePath, (error, stats) => {

      if (stats) {
        let cacheData = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'));

        deferred.resolve(cacheData.media);
      } else {

        let media = {};

        theMovieDbInstance.searchMovies({query: movieName}, (err, movies) => {

          media = {
            title       : movies[0].title,
            years       : movies[0].year,
            poster      : movies[0].poster,
            largePoster : movies[0].backdrop
          };

          theMovieDbInstance.getMovie(movies[0].id, (err, movie) => {

            media.overview = movie.overview;
            media.imdbId = movie.imdbId;

            // Write data in JSON file :)
            fs.writeFile(cacheFilePath, JSON.stringify(media));

            deferred.resolve(media);

          });

        });

      }

    });

    return deferred.promise;

  }

};
