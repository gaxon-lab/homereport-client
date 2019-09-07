const path = require('path');
const {override,  addLessLoader} = require('customize-cra');



const overrideProcessEnv = value => config => {
  config.resolve.modules = [
    path.join(__dirname, 'src')
  ].concat(config.resolve.modules);

  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  config.optimization.runtimeChunk = false;
  return config;
};

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#038fde',
    }
  }),
  overrideProcessEnv({
    VERSION: JSON.stringify(require('./package.json').version),
  })
);
