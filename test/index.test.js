/**
 * Unit test index.js
 * Using babel compilers
 */

import DS from '../dist/index.js';
import assert from 'assert';
import _ from 'lodash';
import {expect} from 'chai';

/**
 * When import the library
 */
describe('Require DragandSubtitles', () => {

  it('should be a function', () => {
    assert.equal('function', typeof DS);
  });

});

/**
 * When init the library
 */
describe('DragandSubtitles initialisation', () => {

  it('should be a object on return', () => {
    assert.equal('object', typeof DS());
  });

  it('should have a .getSerieSubtitles() method', () => {
    assert.equal('function', typeof DS().getSerieSubtitles);
  });

  it('should have a .getMovieSubtitles() method', () => {
    assert.equal('function', typeof DS().getMovieSubtitles);
  });

  it('should have an .apis() method', () => {
    assert.equal('function', typeof DS().apis);
  });

  it('should have an .credits() method', () => {
    assert.equal('function', typeof DS().credits);
  });

});

describe('Checking default values', () => {

  /**
   *  Testing exclude options type
   */
  it('Exclude options should always be an array', () => {
    let DragandSubtitles_1 = DS({ exclude: "not an array" });
    let DragandSubtitles_2 = DS({exclude: {}});
    let DragandSubtitles_3 = DS({exclude: 1});
    let DragandSubtitles_4 = DS({exclude: [1, 2, 3, 4] });

    assert.equal(0, DragandSubtitles_1.exclude.length);
    assert.equal(true, _.isArray(DragandSubtitles_1.exclude));
    assert.equal(0, DragandSubtitles_2.exclude.length);
    assert.equal(true, _.isArray(DragandSubtitles_2.exclude));
    assert.equal(0, DragandSubtitles_3.exclude.length);
    assert.equal(true, _.isArray(DragandSubtitles_3.exclude));
    assert.equal(4, DragandSubtitles_4.exclude.length);
  });

});


describe('.apis() method', () => {
  it('Should return an array of apis available and choosen', () => {
    let DragandSubtitles = DS();
    assert.equal(true, _.isArray(DragandSubtitles.apis()));
    expect(DragandSubtitles.apis()).to.have.members(["open-subtitle"]);
  });
});
