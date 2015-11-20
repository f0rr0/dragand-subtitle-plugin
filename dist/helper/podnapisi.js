'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.podnapisiHelper = undefined;

var _lodash = require('lodash');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _xml2json = require('xml2json');

var _xml2json2 = _interopRequireDefault(_xml2json);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Export Addic7ed helper
 */

var podnapisiHelper = exports.podnapisiHelper = (function () {
  function podnapisiHelper() {
    _classCallCheck(this, podnapisiHelper);
  }

  _createClass(podnapisiHelper, null, [{
    key: 'getSubs',
    value: function getSubs(options, counter, cb) {
      var _this = this;

      var subs = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

      /* Exit Point */
      if (counter < 0) {
        return cb(subs);
      }

      var requestUrl = undefined;
      var language = options.languages[counter];

      if (options.type == 'serie') {
        requestUrl = 'http://www.podnapisi.net/subtitles/search/old?sL=' + language + '&sK=' + options.title + '&sTS=' + options.season + '&sTE=' + options.episode + '&sXML=1';
      } else {
        requestUrl = 'http://www.podnapisi.net/subtitles/search/old?sL=' + language + '&sK=' + options.title + '&sXML=1';
      }

      (0, _request2.default)(requestUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          body = JSON.parse(_xml2json2.default.toJson(body));
          if ((0, _lodash.isArray)(body.results.subtitle)) {
            body.results.subtitle.forEach(function (sub) {
              subs.push(sub);
            });
          }
        }

        _this.getSubs(options, counter - 1, cb, subs);
      });
    }
  }]);

  return podnapisiHelper;
})();