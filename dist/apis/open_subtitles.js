"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Export Open Subtitles API helper
 */

exports.default = function () {
  /* Here private methods and private properties */

  return {
    /* Name of the api */
    name: "open-subtitle",

    /* Type of data available */
    type: ["movie", "serie"],

    /* Necessary parameters */
    parameters: [],

    /**
     * Set options before call
     * @param {object} configuration
     * @return {boolean} is configuration is valid
     */
    setOptions: function setOptions() {},

    /**
     * Calling the API
     * @return {promise} format data and errors
     */
    call: function call() {}
  };
};