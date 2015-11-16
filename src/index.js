import {isArray} from 'lodash';
import {contributors} from '../package.json';
import Apis from './apis';


/**
 * Dragand Subtitles Plugin
 * Factory pattern
 * @return object with properties and methods
 */
export default ({ excludes = [] } = {}) => {
  /*  Here private methods and properties */

  /* Specified exlude as an array */
  if (!isArray(excludes)) { excludes = []; }

  /* Get all apis name and remove excludes ones */
  let apis = Apis
    .map( api => { return api.name })
    .filter( api => { return excludes.indexOf(api) == -1 });



  /* Object API return */
  return {
    excludes: excludes,

    /**
     *  Get subtitles for a specific serie
     *  @param {object} options
     *  @return {promise} promise with subs
     */
    getSerieSubtitles({imdbid, filepath, title, apis, languages, type, episode, season, release_group, stopOnFind = false } = {}) {

    },

    /**
     *  Get subtitles for a specific movie
     *  @return {promise} promise with subs
     */
    getMovieSubtitles({imdbid, filepath, title, apis, languages, type, stopOnFind } = {}) {

    },

    /**
     *  Get all availabe apis
     *  @return {promise} promise with subs
     */
    apis() {
      return apis;
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
