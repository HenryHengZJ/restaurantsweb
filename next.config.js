// next.config.js
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images')
//module.exports = withImages()

const withCSS = require('@zeit/next-css')
/*module.exports = withCSS({
    cssLoaderOptions: {
      url: false
    }
  })*/

const withSass = require('@zeit/next-sass')
/*module.exports = 
withSass(
    {cssModules: true},
)*/

const nextConfig = {
  publicRuntimeConfig: {
    NODE_DEV: process.env.NODE_DEV,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    STIRPE_CLIENT_KEY: process.env.STIRPE_CLIENT_KEY
  }
};

module.exports = withPlugins([
  [withCSS], [withSass], withImages],nextConfig
  );