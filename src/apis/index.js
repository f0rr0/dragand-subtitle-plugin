import openSubtitles from './open_subtitles';
import yifysubtitles from './yify_subtitles';
import addic7ed from './addic7ed';
import podnapisi from './podnapisi';

export default [
  new openSubtitles(),
  new yifysubtitles(),
  new addic7ed(),
  new podnapisi()
];
