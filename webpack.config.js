const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// common chunks 未处理

// 路径处理函数
const p = (url) => path.resolve(__dirname, url);

// html-webpack-plugin 封装
const dealingHtml = (names) => {
  if (!(names instanceof Array)) names = [names]
  return names.map(name => {
    return new HtmlWebpackPlugin({
      filename: p(`dist/views/${name}.html`),
      template: p(`src/views/${name}.html`),
      chunks: [name],
      // inject: true,
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true
      // }
    })
  })
}

module.exports = {
  mode: 'production',
  entry: {
    index: p('src/js/index.js'),
    detail: p('src/js/detail.js')
  },
  output: {
    filename: 'js/[name].[chunkhash:6].js',
    // path: p('dist/js')
  },
  resolve: {
    alias: {
      '@': p('src/')
    },
    extensions: ['.js', '.scss'] //设置require或import的时候可以不需要带后缀
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'stage-3'],
          }
        }
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash].[ext]',
          outputPath: 'assets/imgs',
          publicPath: '../assets/imgs'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
        // options: {
        //   name: 'styles/[name].css'
        // }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    ...dealingHtml(['index', 'detail']),
  ]
}