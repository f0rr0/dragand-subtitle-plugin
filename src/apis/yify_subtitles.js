import {yifyHelper} from '../helper/yify';
import request from 'request';
import Q from 'q';

/**
 * Export Open Subtitles API helper
 */
export default () => {

  /* Define api name */
  const apiName = 'yify-subtitles';

  /* Define api url */
  const apiUrl = 'yifysubtitles.com';

  /* Format yify format to Dragand format */
  const formatJson = (result) => {

    let resultFormated = [];

    // For each languages
    options.languages.forEach((language) => {

      const languageMapped = yifyHelper.getLanguageMapped(language);
      const subs           = result.subs[options.imdbId];

      Object.keys(subs).forEach((index) => {

        if(index == languageMapped) {

          subs[index].forEach((sub) => {
            if(sub.rating >= 0) {
              resultFormated.push({
                type    : 'zip',
                language: language,
                url     : `http://${apiUrl + sub.url}`,
                api     : apiName
              });
            }
          });

        }

      });

    });

    return resultFormated;

  };

  /* Options */
  let options = {};

  return {
    /* Name of the api */
    name: apiName,

    /* Type of data available */
    type: ['movie'],

    /* Necessary parameters */
    parameters: {
      movie: ['languages', 'imdbId']
    },

    /* Headers need for download the subtitle */
    headers: {},

    /**
     * Set options before call
     * @param {object} configuration
     * @return {boolean} is configuration is valid
     */
    setOptions(opts = {}) {
      options = opts;
    },

    /**
     * Calling the API for movies
     * @return {promise} format data and errors
     */
    callMovies() {
      let deferred = Q.defer();

      request(`http://api.${apiUrl}/subs/${options.imdbId}`, (error, response, body) => {
        if(!error && response.statusCode === 200) {
          deferred.resolve((body.subtitles === 0) ? [] : formatJson(JSON.parse(body)));
        } else {
          deferred.reject(error);
        }
      });

      return deferred.promise;
    }

  };

};
