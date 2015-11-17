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
  const findApi = (type = false) => {
    return apis
    .filter( api => { return (!type) ? api : api.type.indexOf(type) != -1 })
    .filter( api => { return excludes.indexOf(api.name) == -1 });
  }


  /* Object API return */
  return {
    excludes: excludes,

    /**
     *  Get subtitles for a specific serie
     *  @param {object} options
     *  @return {promise} promise with subs
     */
    getSerieSubtitles({imdbid, filepath, title, apis, languages, type, episode, season, release_group, stopOnFind = false } = {}) {
      /* For each serie apis */
      let seriesApis = findApi('serie');

      // ==> Check parameters
      // If no apis ok --> return exception
      // If at least one api is ok
      // For each api
      // Call them
    },

    /**
     *  Get subtitles for a specific movie
     *  @return {promise} promise with subs
     */
    getMovieSubtitles({imdbid, filepath, title, apis, languages, type, stopOnFind } = {}) {
      /* For each movie apis */
      let seriesApis = findApi('movie');

      // ==> Check parameters
      // If no apis ok --> return exception
      // If at least one api is ok
      // For each api
      // Call them
    },

    /**
     *  Get all availabe apis
     *  @param {string} type of subtitles movie/serie
     *  @return {areay} All apis name
     */
    apis(type=false) {
      return findApi(type).map( api => { return api.name });
    },

    /**
     *  Get informations about a specific api
     *  @param {string} api name
     *  @return {object} api information
     */
    api(api=false) {
      if (!api) { return undefined; }

      let find = apis.filter( api_i => { api_i.name == api; });

      return (find.length == 1) ? find : undefined;
    },

    /**
     *  Get all library contributors
     *  @return {promise} promise with subs
     */
    credits(){
      return contributors;
    }
  };

};
