import {podnapisiHelper} from '../helper/podnapisi';
import Q from 'q';

/**
 * Export Podnapisi API helper
 */
module.exports = () => {

  /* Define api name */
  const apiName = 'podnapisi';

  /* Define api url */
  const apiUrl = 'podnapisi.net';

  /* Format podnapisi format to Dragand format */
  const formatJson = (result) => {

    let resultFormated = [];

    result = result.map((sub) => {
      return {
        type        : 'zip',
        language    : sub.language,
        releaseGroup: sub.release,
        url         : sub.url + '/download',
        api         : apiName,
      };
    });

    return result;

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
      'serie': [ 'languages', 'title', 'episode', 'season' ],
      'movie': [ 'languages', 'title' ]
    },

    /**
     * Set options before call
     * @param {object} configuration
     * @return {boolean} is configuration is valid
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

      /* We search a serie */
      options.type = 'serie';

      podnapisiHelper.getSubs(options, options.languages.length - 1, (subs) => {
        deferred.resolve(formatJson(subs));
      });

      return deferred.promise;
    },

    /**
     * Calling the API for movies
     * @return {promise} format data and errors
     */
    callMovies() {
      let deferred = Q.defer();

      /* We search a serie */
      options.type = 'movie';

      podnapisiHelper.getSubs(options, options.languages.length - 1, (subs) => {
        deferred.resolve(formatJson(subs));
      });

      return deferred.promise;
    }

  };

};
