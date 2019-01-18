require('babel-register')({
  presets: [ 'env', 'stage-0' ],
  plugins: ["transform-runtime"]
})

module.exports = require('./server.js')