/* eslint-disable*/
//eslint is disabled to preserve babel config formatting that is easier to copy-paste from .babelrc

require('babel-register')({
  //see https://babeljs.io/docs/usage/options/#options for more config options
  babelrc: false,
  "presets": [
    ["env", {
      "targets": { "node": ["4"] }
    }],
    // "stage-2"
  ],
  "plugins": ["add-module-exports"],
})
require('babel-polyfill')
module.exports = require('./lib/index');
