try {
  var vueVersion = require('vue').version
} catch (e) {}

var packageName = require('./package.json').name
var packageVersion = require('./package.json').version
if (vueVersion && vueVersion !== packageVersion) {
  throw new Error(
    '\n\nVue packages version mismatch:\n\n' +
      '- vue@' +
      vueVersion +
      '\n' +
      '- ' +
      packageName +
      '@' +
      packageVersion +
      '\n\n' +
      'This may cause things to work incorrectly. Make sure to use the same version for both.\n'
  )
}

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./build.prod.js')
} else {
  module.exports = require('./build.dev.js')
}
