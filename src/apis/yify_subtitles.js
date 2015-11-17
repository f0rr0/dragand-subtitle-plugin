import Q from 'q';
import request from 'request';

/**
 * Export Open Subtitles API helper
 */
export default () => {

  /* Define api name */
  const apiName = 'yify-subtitles';

  /* Define api url */
  const apiUrl = 'yifysubtitles.com';

  /* Map language */
  const languageMapping = {
    'albanian'     : 'sq',
    'arabic'       : 'ar',
    'bengali'      : 'bn',
    'bulgarian'    : 'bg',
    'bosnian'      : 'bs',
    'chinese'      : 'zh',
    'croatian'     : 'hr',
    'czech'        : 'cs',
    'danish'       : 'da',
    'dutch'        : 'nl',
    'english'      : 'en',
    'estonian'     : 'et',
    'farsi-persian': 'fa',
    'finnish'      : 'fi',
    'french'       : 'fr',
    'german'       : 'de',
    'greek'        : 'el',
    'hebrew'       : 'he',
    'hungarian'    : 'hu',
    'indonesian'   : 'id',
    'italian'      : 'it',
    'japanese'     : 'ja',
    'korean'       : 'ko',
    'lithuanian'   : 'lt',
    'macedonian'   : 'mk',
    'malay'        : 'ms',
    'norwegian'    : 'no',
    'polish'       : 'pl',
    'portuguese'   : 'pt',
    'romanian'     : 'ro',
    'russian'      : 'ru',
    'serbian'      : 'sr',
    'slovenian'    : 'sl',
    'spanish'      : 'es',
    'swedish'      : 'sv',
    'thai'         : 'th',
    'turkish'      : 'tr',
    'urdu'         : 'ur',
    'ukrainian'    : 'uk',
    'vietnamese'   : 'vi'
	};

  /* Return languaged mapped */
  const getLanguageMapped = (language) => {
    for(let key in languageMapping) {
      if(languageMapping[key] === language) {
        return key;
      }
    }
	};

  /* Format yify format to Dragand format */
  const formatJson = (result) => {

    let resultFormated = [];

    // For each languages
    options.languages.forEach((language) => {

      const languageMapped = getLanguageMapped(language);
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
      'movie': [ 'languages', 'imdbId', ]
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
