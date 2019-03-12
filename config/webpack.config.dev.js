const webpack = require('webpack');

const base = require('./webpack.base');
const { path2Absolute, dealingHtml } = require('./utils');

const config = Object.assign(
  {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      index: 'index.html',
      compress: true, // gzip
      host: '0.0.0.0',
      clientLogLevel: 'none',

      inline: true, // added
      publicPath: '',
      contentBase: false,
      watchOptions: {
        poll: 1000,
        ignored: /node_modules/
      }, // added

      // contentBase: path2Absolute('dist'),
      hot: true,
      // hotOnly: true,
      open: true,
      port: 8083,
      progress: true
      // contentBase: false,
      // lazy: true // 不监听文件变化，只在请求到才会打包
      // proxy: {
      // '/api': {
      //   target: 'www.baidu.com',
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // }
      // },
    },
    module: {
      rules: [
        {
          test: /\.js/,
          include: [
            path2Absolute('src'),
            path2Absolute('test'),
            path2Absolute('node_modules/webpack-dev-server/client')
          ]
        },
        {
          test: /\.(jpg|png|gif|svg|jpeg)$/,
          loader: 'url-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    plugins: [
      ...dealingHtml(['index', 'detail']),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin({})
    ]
  },
  base
);

module.exports = config;
