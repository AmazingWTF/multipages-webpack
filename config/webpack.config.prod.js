const { path2Relative, path2Absolute, dealingHtml } = require('./utils');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    index: path2Absolute('src/js/index.js'),
    detail: path2Absolute('src/js/detail.js')
  },
  output: {
    path: path2Absolute('dist/static'),
    publicPath: 'static',
    filename: 'js/[name].[chunkhash:6].js',
    // path: path2Absolute('dist/js')
  },
  resolve: {
    alias: {
      '@': path2Absolute('src/')
    },
    extensions: ['.js', '.scss'] //设置require或import的时候可以不需要带后缀
  },
  optimization: {
    // 默认情况下，会根据大小决定是否单独打包公共chunk
    splitChunks: {
      chunks: 'all',
    },
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