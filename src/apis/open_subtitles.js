import os from 'opensubtitles-api';
import Q from 'q';

/**
 * Export Open Subtitles API helper
 */
export default () => {

  /* Define apiName */
  const apiName = 'open-subtitles';

  /* Define opensubtitles-api instance */
  const openSubtitlesApi = new os('OSTestUserAgent');

  /* Format openSubtitles format to Dragand format */
  const formatJson = (result) => {

    let resultFormated = [];

    options.languages.forEach((language) => {
      Object.keys(result).forEach((index) => {
        if(index === language) {
          resultFormated.push({
            type: result[index].url.substr(result[index].url.lastIndexOf('.') + 1),
            language: result[index].lang,
            url: result[index].url,
            api: apiName
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
    type: ['serie', 'movie'],

    /* Necessary parameters */
    parameters: {
      'serie': [ 'languages', 'imdbId', 'season', 'episode', 'fileName', 'filePath' ],
      'movie': [ 'languages', 'imdbId', 'fileName', 'filePath' ]
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
     * Calling the API
     * @return {promise} format data and errors
     */
    callSeries() {
      let deferred = Q.defer();

      openSubtitlesApi.search({
        sublanguageid: 'all',
        imdbid: options.imdbId,
        season: options.season,
        episode: options.episode,
        filename: options.fileName,
        path: options.filePath
      }).then(subtitles => {
        deferred.resolve(formatJson(subtitles));
      }).catch(error => {
        deferred.reject(error);
      });

      return deferred.promise;
    }

  };

};
