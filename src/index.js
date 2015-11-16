import {isArray} from 'lodash';
import {contributors} from '../package.json';

/**
 * Dragand Subtitles Plugin
 * Factory pattern
 * @return object with properties and methods
 */
export default ({ exclude = [] } = {}) => {
  /*  Here private methods and properties */

  /* Specified exlude as an array */
  if (!isArray(exclude)) { exclude = []; }

  /* Just for tests */
  let apis = ["open-subtitle"];



  /* Object API return */
  return {
    exclude: exclude,

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
