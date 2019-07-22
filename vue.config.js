// Template version: {{ template_version }}
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
  devServer: {
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 7070,
  },
  configureWebpack: {
    devtool: 'source-map',
  },

  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_mixins.scss";
        `,
      },
    },
  },
};
