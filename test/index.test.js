/**
 * Unit test index.js
 * Using babel compilers
 */

import DS from '../src/index.js';
import assert from 'assert';

/**
 * Simple Unit Test example
 */
describe('Require DragandSubtitles', () => {
  it('should be a function', () => {
    assert.equal('function', typeof DS);
  });
});
