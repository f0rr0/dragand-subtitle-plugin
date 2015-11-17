import os from 'opensubtitles-api';
import Q from 'q';

/**
 * Export Open Subtitles API helper
 */
export default () => {

  /* Define api name */
  const apiName = 'open-subtitles';

  /* Define opensubtitles-api instance */
  const openSubtitlesApi = new os('OSTestUserAgent');

  /**
   * Format openSubtitles result to Dragand format
   * @param {object} result
   * @return {array} array of subtitles
   */
  const formatJson = (result) => {

    let resultFormated = Object.keys(result)
    .filter( key => options.languages.indexOf(key) != -1 )
    .map( key => result[key] )
    .map( (sub) => {
      return {
        type    : sub.url.substr(sub.url.lastIndexOf('.') + 1),
        language: sub.lang,
        url     : sub.url,
        api     : apiName
      };
    });

    return resultFormated;

  };

  /* Options */
  let options = {};

  return {
    /* Name of the api */
    name: apiName,

    /* Type of data available */
    type: ['serie', 'movie'],

    /* Necessary parameters */
    parameters: {
      serie: [ 'languages', 'imdbId', 'fileName', 'filePath', 'season', 'episode' ],
      movie: [ 'languages', 'imdbId', 'fileName', 'filePath' ]
    },

    /**
     * Set options before call
     * @param {object} options
     * @return {object} this
     */
    setOptions(opts = {}) {
      options = opts;
    },

    /**
     * Calling the API for series
     * @return {promise} format data and errors
     */
    callSeries() {
      let deferred = Q.defer();

      openSubtitlesApi.search({
        sublanguageid: 'all',
        imdbid       : options.imdbId,
        season       : options.season,
        episode      : options.episode,
        filename     : options.fileName,
        path         : options.filePath
      }).then(subtitles => {
        deferred.resolve(formatJson(subtitles));
      }).catch(error => {
        deferred.reject(error);
      });

      return deferred.promise;
    },

    /**
     * Calling the API for movies
     * @return {promise} format data and errors
     */
    callMovies() {
      let deferred = Q.defer();

      openSubtitlesApi.search({
        sublanguageid: 'all',
        imdbid       : options.imdbId,
        filename     : options.fileName,
        path         : options.filePath
      }).then(subtitles => {
        deferred.resolve(formatJson(subtitles));
      }).catch(error => {
        deferred.reject(error);
      });

      return deferred.promise;
    }

  };

};
