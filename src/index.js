import {isArray} from 'lodash';
import {contributors} from '../package.json';
import ExternalApis from './apis';
import Q from 'q';

/**
 * Dragand Subtitles Plugin
 * Factory pattern
 * @param {object} options
 * @return object with properties and methods
 */
const DragandSubtitles = () => {


  /**
   *  Get all availabe apis
   *  @param {string} type of subtitles movie/serie
   *  @return {array} All apis name
   */
  const getApis = (type = false) => {
    return ExternalApis
    .filter( api => { return (!type) ? api : api.type.indexOf(type) != -1; })
  };

  /**
   * Get apis by names
   * @param {array} names
   * @return {array} apis objects
   */
  const getApisByName = (names = []) => {
    return getApis().filter( api => { return names.indexOf(api.name) != -1; })
  };

  /**
   * Check if all options are valid
   * @param {array} api options required
   * @param {object} options
   * @return {boolean}
   */
  const validApiOptions = (parameters, apisOptions) => {
    return apisOptions.filter( param => !parameters[param] ).length > 0 ? false : true;
  };


  /**
   * Format all apis results to a human readable object
   * @param {array} Q promise result (fulfilled & rejected)
   * @return {object} final result object
   */
  const formatResult = (results) => {
    return results
    .filter( result => result.state == "fulfilled" )
    .map( result => result.value )
    .reduce( (concat, result) => [].concat(concat, result), [])
    .reduce( (obj, item) => {
      obj[item.language] = obj[item.language] || [];
      obj[item.language].push(item);
      return obj;
    }, {});
  };


  /**
   * Get Subtitles from apis
   * @param {array} array of apis
   * @param {promise}
   */
  const getSubtitles = (type, apis, parameters) => {
    return Q.allSettled(
      apis.map(api =>{
        return (type == "serie") ? api.callSeries() : api.callMovies();
      })
    )
    .then( results => formatResult(results) );
  };


  /* Object API return */
  return {

    /**
     *  Get subtitles for a specific serie
     *  @param {object} options
     *  @return {promise} promise with subs
     */
    getSerieSubtitles(parameters = {
      imdbId,
      filePath,
      fileName,
      title,
      apis,
      languages,
      episode,
      season,
      releaseGroup
    } = {}) {

      /* Get all series apis that match with parameters, filter api requested, and set options */
      let seriesApis = getApis('serie')
        .filter( api =>{
          return (!parameters.apis) ? true : parameters.apis.indexOf(api.name) != -1;
        })
        .filter( api => validApiOptions(parameters, api.parameters.serie) )
        .map( api => {
          api.setOptions(parameters);
          return api;
        });

      return getSubtitles("serie", seriesApis, parameters);
    },

    /**
     *  Get subtitles for a specific movie
     *  @param {object} options
     *  @return {promise} promise with subs
     */
    getMovieSubtitles(parameters = {
      imdbid,
      filePath,
      title,
      apis,
      languages
    } = {}) {

      /* Get all movies apis that match with parameters and set options */
      let moviesApis = getApis('movie')
        .filter( api => parameters.apis.indexOf(api.name) != -1 )
        .filter(  api => validApiOptions(parameters, api.parameters.movie) )
        .map( api => {
          api.setOptions(parameters);
          return api;
        });

      return getSubtitles("movie", moviesApis, parameters);
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

export {DragandSubtitles}
