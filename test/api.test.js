/**
 * Testing api declaration
 * Interface
 *
 *  An api should have
 *
 *  :: Properties
 *  .name       --> string
 *  .parameters --> array
 *  .type       --> array
 *
 *  :: Methods
 *  .setOptions() --> return boolean
 *  .call()       --> return {promise}
 *
 */

import apis from '../dist/apis';
import assert from 'assert';
import _ from 'lodash';

/**
 * Checking each api
 * Check its Methods
 * Chceck its properties
 */
apis.forEach( api => {
  describe('Interface ' + api.name, () => {

    describe('Checking type', () => {
      it('should be an object', () => { assert.equal('object', typeof api); });
    });

    describe('Checking properties', () => {
      it('should have a name as string', () => { assert.equal('string', typeof api.name); });
      it('should have parameters as object', () => { assert.equal('object', typeof api.parameters ); });
      it('should have typeof as array', () => { assert.equal(true, _.isArray(api.type)); });
    });

    describe('Checking methods', () => {
      describe('Checking .callSeries', () => {
        if (api.type.indexOf('serie') != -1) {
          it('should have a .callSeries() method', () => { assert.equal('function', typeof api.callSeries); });
        }
      });
      describe('Checking .callMovies', () => {
        if (api.type.indexOf('movie') != -1) {
          it('should have a .callMovies() method', () => { assert.equal('function', typeof api.callMovies); });
        }
      });
      it('should have a .setOptions() method', () => { assert.equal('function', typeof api.setOptions); });
    });

    describe('Checking right type/parameters definition', () => {
      it('if serie then should have a parameters.series property', () => {
        if (api.type.indexOf("serie") != -1) {
          assert.equal(true,  _.isArray(api.parameters.serie) );
        }

      });
      it('if movie then should have a parameters.movies property', () => {
        if (api.type.indexOf("movie") != -1) {
          assert.equal(true,  _.isArray(api.parameters.movie) );
        }
      });
    });
  });
});
