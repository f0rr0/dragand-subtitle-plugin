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

  let DragandSubtitles = DS();

  it('should be a object on return', () => {
    assert.equal('object', typeof DragandSubtitles);
  });

  it('should have a .getSerieSubtitles() method', () => {
    assert.equal('function', typeof DragandSubtitles.getSerieSubtitles);
  });

  it('should have a .getMovieSubtitles() method', () => {
    assert.equal('function', typeof DragandSubtitles.getMovieSubtitles);
  });

  it('should have an .apis() method', () => {
    assert.equal('function', typeof DragandSubtitles.apis);
  });

  it('should have an .credits() method', () => {
    assert.equal('function', typeof DragandSubtitles.credits);
  });

});

describe('Checking default values', () => {

  /**
   *  Testing exclude options type
   */
  it('Excludes options should always be an array', () => {
    let DragandSubtitles_1 = DS({ excludes: "not an array" });
    let DragandSubtitles_2 = DS({excludes: {}});
    let DragandSubtitles_3 = DS({excludes: 1});
    let DragandSubtitles_4 = DS({excludes: [1, 2, 3, 4] });

    assert.equal(0, DragandSubtitles_1.excludes.length);
    assert.equal(true, _.isArray(DragandSubtitles_1.excludes));
    assert.equal(0, DragandSubtitles_2.excludes.length);
    assert.equal(true, _.isArray(DragandSubtitles_2.excludes));
    assert.equal(0, DragandSubtitles_3.excludes.length);
    assert.equal(true, _.isArray(DragandSubtitles_3.excludes));
    assert.equal(4, DragandSubtitles_4.excludes.length);
  });

});


describe('.apis() method', () => {
  it('Should return an array of available apis choosen', () => {
    let DragandSubtitles = DS();
    assert.equal(true, _.isArray(DragandSubtitles.apis()));
    expect(DragandSubtitles.apis()).to.have.members(["open-subtitle"]);
  });
});

describe('.credits() method', () => {
  it('Should return an array of all contributors', () => {
    let DragandSubtitles = DS();
    assert.equal(true, _.isArray(DragandSubtitles.credits()));
  });
});
