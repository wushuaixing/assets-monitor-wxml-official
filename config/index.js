const path = require('path');

const config = {
  projectName: 'monitor-applet',
  date: '2021-1-25',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  alias : {
    '@' : path.resolve(__dirname, '..', 'src'),
    '@components' : path.resolve(__dirname, '..', 'src/components'),
    '@utils'    : path.resolve(__dirname, '..', 'src/utils'),
  },
  sass:{
    resource: path.resolve(__dirname, '..', 'src/assets/css/configuration.scss')
  },
  mini: {
    postcss: {
      autoprefixer:{
        enable: true
      },
      pxtransform: {
        enable: true,
        config: {
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    // dev.js 是项目预览时的配置
    return merge({}, config, require('./dev'))
  }
  // prod.js 是项目打包时的配置
  return merge({}, config, require('./prod'))
};
