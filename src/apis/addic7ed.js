import {addic7edHelper} from '../helper/addic7ed';
import Q from 'q';

/**
 * Export Addic7ed API helper
 */
module.exports = () => {

  /* Define api name */
  const apiName = 'addic7ed';

  /* Define api url */
  const apiUrl = 'addic7ed.com';

  /* Format yify format to Dragand format */
  const formatJson = (result) => {

    let resultFormated = [];

    result.forEach((sub) => {
      resultFormated.push({
        type    : 'srt',
        language: sub.language,
        url     : `http://${apiUrl + sub.url}`,
        api     : apiName
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
    type: ['serie'],

    /* Necessary parameters */
    parameters: {
      serie: [ 'languages', 'title', 'episode', 'season', 'releaseGroup' ]
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
     * Calling the API for movies
     * @return {promise} format data and errors
     */
    callSeries() {
      let deferred = Q.defer();

      /* Get Addicted series mapping */
      addic7edHelper.scrapping().then((result) => {

        /* Get serie Id from the name */
        addic7edHelper.getSerieId(result, options.title).then((serieId) => {

          /* Define in options the serie id from addic7ed */
          options.serieId = serieId;

          /* Get all subtitles */
          addic7edHelper.getSubs(options, options.languages.length - 1, (subs) => {
            deferred.resolve(formatJson(subs));
          });

        });

      });

      return deferred.promise;
    }

  };

};
