import {isArray} from 'lodash';

/**
 * Dragand Subtitles Plugin
 * Factory pattern
 * @return simple object with properties and methods
 */
export default ({ exclude = [] } = {}) => {
  /*  Here private methods and properties */

  /* Specified exlude as an array */
  if (!isArray(exclude)) { exclude = []; }

  /* Object return */
  return {
    exclude: exclude,

    getSerieSubtitles() {

    },

    getMovieSubtitles() {
      
    }
  };

};
