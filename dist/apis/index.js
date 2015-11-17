'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _open_subtitles = require('./open_subtitles');

var _open_subtitles2 = _interopRequireDefault(_open_subtitles);

var _yify_subtitles = require('./yify_subtitles');

var _yify_subtitles2 = _interopRequireDefault(_yify_subtitles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [new _open_subtitles2.default(), new _yify_subtitles2.default()];