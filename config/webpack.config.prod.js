const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniExtractCss = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { path2Absolute, dealingHtml } = require('./utils');
const base = require('./webpack.base');

const config = Object.assign(
  {
    mode: 'production',
    // entry: {
    //   vendor: ["jquery"], // 公共模块
    //   index: path2Absolute("src/js/index.js"),
    //   detail: path2Absolute('./src/js/detail.js')
    // },
    output: {
      path: path2Absolute('dist'),
      publicPath: '',
      filename: 'js/[name].[chunkhash:6].js'
      // path: path2Absolute('dist/js')
    },
    // resolve: {
    //   alias: {
    //     "@": path2Absolute("src/"),
    //     swiper: "swiper/dist/js/swiper.js"
    //   },
    //   extensions: [".js", ".scss"] //设置require或import的时候可以不需要带后缀
    // },
    optimization: {
      // 默认情况下，会根据大小决定是否单独打包公共chunk
      splitChunks: {
        chunks: 'all',
        minChunks: 3 // 最少引用次数(才会放在全局包中)
        // cacheGroups: {
        //   commons: {
        //     test: /[\\/]node_modules[\\/]/,
        //     name: "vendor",
        //     chunks: "all"
        //   }
        // }
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true
          // sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin()
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
              presets: ['env', 'stage-3']
            }
          }
        },
        {
          test: /\.(jpg|png|gif|svg|jpeg)$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: '[name].[hash].[ext]',
            outputPath: 'imgs',
            publicPath: 'imgs'
          }
        },
        {
          test: /\.(sa|c|sc)ss$/,
          use: [
            MiniExtractCss.loader,
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniExtractCss({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[hash].css'
      }),
      ...dealingHtml(['index', 'detail'])
    ]
  },
  base
);

module.exports = config;
