import {isArray} from 'lodash';
import {contributors} from '../package.json';
import ExternalApis from './apis';

/**
 * Dragand Subtitles Plugin
 * Factory pattern
 * @param {object} options
 * @return object with properties and methods
 */
export default ({ excludes = [] } = {}) => {
  /*  Here private methods and private properties */

  /* Specified exlude as an array */
  if (!isArray(excludes)) { excludes = []; }

  /* Get all apis name and remove excludes ones */
  let apis = ExternalApis;

  /**
   *  Get all availabe apis
   *  @param {string} type of subtitles movie/serie
   *  @return {areay} All apis name
   */
  const getApis = (type = false) => {
    return apis
    .filter( api => { return (!type) ? api : api.type.indexOf(type) != -1; })
    .filter( api => { return excludes.indexOf(api.name) == -1; });
  }

  /**
   * Get apis by names
   * @param {array} names
   * @return {array} apis objects
   */
  const getApisByName = (names = []) => {
    return getApis().filter( api => { return names.indexOf(api.name) != -1; })
  }

  /**
   * Check if all options are valid
   * @param {array} api options required
   * @param {object} options
   * @return {boolean}
   */
  const validApiOptions = (parameters, apisOptions) => {
    let missing = apisOptions.filter( param => !parameters[param] );
    return missing.length > 0 ? false : true;
  }


  /* Object API return */
  return {

    /* Excludes apis */
    excludes: excludes,

    /**
     *  Get subtitles for a specific serie
     *  @param {object} options
     *  @return {promise} promise with subs
     */
    getSerieSubtitles(parameters = {
      imdbid,
      filepath,
      fileName,
      title,
      apis,
      languages,
      type,
      episode,
      season,
      release_group,
      stopOnFind = false
    } = {}) {

      /* Get all series apis that match with parameters and set options */
      let seriesApis = getApis('serie')
        .filter( api => validApiOptions(parameters, api.parameters.serie) )
        .map( api => api.setOptions(parameters));

    },

    /**
     *  Get subtitles for a specific movie
     *  @return {promise} promise with subs
     */
    getMovieSubtitles(parameters = {
      imdbid,
      filepath,
      title,
      apis,
      languages,
      type,
      stopOnFind
    } = {}) {

      /* Get all movies apis that match with parameters and set options */
      let moviesApis = getApis('movie')
        .filter(  api => validApiOptions(parameters, api.parameters.movie) )
        .forEach( api => api.setOptions(parameters));
    },

    /**
     *  Get all available apis or a specific one
     *  @param {string} type of subtitles movie/serie
     *  @return {array} All apis name
     */
    apis(type = false) {
      return getApis(type).map( api => { return api.name });
    },

    /**
     *  Get informations about a specific api
     *  @param {string} api name
     *  @return {object} api information
     */
    api(api = false) {
      if (!api) { return undefined; }
      return (getApisByName([api]).length == 1) ? getApisByName([api])[0] : undefined;
    },

    /**
     *  Get all library contributors
     *  @return {array} contributors
     */
    credits(){
      return contributors;
    }
  };

};
