const { path2Relative, path2Absolute, dealingHtml } = require("./utils");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/js/index.js",
    detail: "./src/js/detail.js"
  },
  // output: {
  //   filename: 'js/[name].[hash:6].js',
  //   // path: path2Absolute('dist/js')
  // },
  devtool: "inline-source-map",
  resolve: {
    alias: {
      "@": path2Absolute("src/")
    },
    extensions: [".js", ".scss"] //设置require或import的时候可以不需要带后缀
  },
  devServer: {
    index: "index.html",
    compress: true, // gzip
    host: "0.0.0.0",

    inline: true, // added
    publicPath: "",
    inline: true,
    contentBase: "./",
    watchOptions: {
      ignore: /node_modules/
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
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "stage-3"]
          }
        }
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "[name].[hash].[ext]",
          outputPath: "assets/imgs",
          publicPath: "../assets/imgs"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
        // options: {
        //   name: 'styles/[name].css'
        // }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({}),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path2Absolute("src/views/index.html"),
      inject: true,
      chunks: "index"
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true
      // }
    }),
    new HtmlWebpackPlugin({
      filename: "detail.html",
      template: path2Absolute("src/views/detail.html"),
      inject: true,
      chunks: "detail"
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true
      // }
    })
  ]
};
