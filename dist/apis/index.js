'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _open_subtitles = require('./open_subtitles');

var _open_subtitles2 = _interopRequireDefault(_open_subtitles);

var _yify_subtitles = require('./yify_subtitles');

var _yify_subtitles2 = _interopRequireDefault(_yify_subtitles);

var _addic7ed = require('./addic7ed');

var _addic7ed2 = _interopRequireDefault(_addic7ed);

var _podnapisi = require('./podnapisi');

var _podnapisi2 = _interopRequireDefault(_podnapisi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [new _open_subtitles2.default(), new _yify_subtitles2.default(), new _addic7ed2.default(), new _podnapisi2.default()];