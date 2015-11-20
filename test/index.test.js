/**
 * Unit test index.js
 * Using babel compilers
 */

import {DragandSubtitles} from '../dist/index.js';
import assert from 'assert';
import _ from 'lodash';
import {expect} from 'chai';

/**
 * When import the library
 */
describe('Require DragandSubtitles', () => {

  it('should be a function', () => {
    assert.equal('function', typeof DragandSubtitles);
  });

});

/**
 * When init the library
 */
describe('DragandSubtitles initialisation', () => {

  let DS = DragandSubtitles();

  it('should be a object on return', () => {
    assert.equal('object', typeof DS);
  });

  it('should have a .getSerieSubtitles() method', () => {
    assert.equal('function', typeof DS.getSerieSubtitles);
  });

  it('should have a .getMovieSubtitles() method', () => {
    assert.equal('function', typeof DS.getMovieSubtitles);
  });

  it('should have an .apis() method', () => {
    assert.equal('function', typeof DS.apis);
  });

  it('should have an .api() method', () => {
    assert.equal('function', typeof DS.api);
  });

  it('should have an .credits() method', () => {
    assert.equal('function', typeof DS.credits);
  });

});

/**
 * .apis() Methods
 */
describe('.apis() method', () => {
  it('Should return an array of available apis choosen', () => {
    let DS = DragandSubtitles();
    assert.equal(true, _.isArray(DS.apis()));
    expect(3, DS.apis().length);
  });

  it('Should return an array of api for series', () => {
    let DS = DragandSubtitles();
    assert.equal(true, _.isArray(DS.apis("serie")));
    assert.equal(3, DS.apis("serie").length);
  });

  it('Should return an array of api for movies', () => {
    let DS = DragandSubtitles();
    assert.equal(true, _.isArray(DS.apis("movie")));
    assert.equal(3, DS.apis("movie").length);
  });
});

/**
 * .api() Method
 */
describe('.api() method', () => {
  it('Should return an object with api information', () => {
    let DS = DragandSubtitles();
    assert.equal('object', typeof DS.api('open-subtitles'));
  });

  it('Should return undefined when api doesn\'t exist information', () => {
    let DS = DragandSubtitles();
    assert.equal(undefined, DS.api('open-subtitle-not-exist'));
  });
});

/**
 * .credits() Method
 */
describe('.credits() method', () => {
  it('Should return an array of all contributors', () => {
    let DS = DragandSubtitles();
    assert.equal(true, _.isArray(DS.credits()));
  });
});

/**
 * .getSerieSubtitles() Method
 */
describe('.getSerieSubtitles() method', () => {
  it('Should return a promise', () => {
    let DS = DragandSubtitles();
    let options = {
      imdbId: 'tt3749900',
      filePath: '/Users/arthur/Desktop/gotham.209.hdtv-lol\[ettv\].mp4',
      fileName: 'gotham.209.hdtv-lol[ettv].mp4',
      title: 'Gotham',
      apis: ["addic7ed", "open-subtitles"],
      languages: ["fr", "en"],
      episode: 9,
      season: 2,
      releaseGroup: 'lol'
    };

    let promise = DS.getSerieSubtitles(options);

    assert.equal("function", typeof promise.then );
    assert.equal("function", typeof promise.catch );
  });
});

// /**
//  * .getMovieSubtitles() Method
//  */
// describe('.getMovieSubtitles() method', () => {
//   it('Should return a promise', () => {
//     let DS = DragandSubtitles();
//     assert.equal("function", typeof DS.getMovieSubtitles().then );
//     assert.equal("function", typeof DS.getMovieSubtitles().catch );
//   });
// });
