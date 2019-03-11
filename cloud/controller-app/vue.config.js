const path = require('path')

module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production' || process.env.VUE_APP_APICLIENT == 'server') {
        // mutate config for production...
        config.resolve.alias.set('api-client', path.resolve(__dirname, 'src/api/server/index.js'))
    } else {
        // mutate for development...
        config.resolve.alias.set('api-client', path.resolve(__dirname, 'src/api/mock/index.js'))
    }
  }
}
