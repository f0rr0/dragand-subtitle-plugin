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
import {expect} from 'chai';


apis.forEach( api => {
  describe('Interface ' + api.name, () => {

    describe('Checking type', () => {
      it('should be an object', () => {
        assert.equal('object', typeof api);
      });
    });

    describe('Checking properties', () => {
      it('should have a name as string', () => {
        assert.equal('string', typeof api.name);
      });
      it('should have parameters as array', () => {
        assert.equal(true, _.isArray(api.parameters));
      });
      it('should have typeof as array', () => {
        assert.equal(true, _.isArray(api.type));
      });
    });

    describe('Checking methods', () => {
      it('should have a .call() methods', () => {
        assert.equal('function', typeof api.call);
      });
      it('should have a .setOptions() methods', () => {
        assert.equal('function', typeof api.setOptions);
      });
    });
  });
});


// For Each api check the Interface
