const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 路径处理函数
const path2Absolute = (url) => path.resolve(__dirname, '../', url);
const path2Relative = (url) => path.join(__dirname, '../', url);

// 获取entry

// html-webpack-plugin 封装
const dealingHtml = (names) => {
  if (!(names instanceof Array)) names = [names]
  return names.map(name => {
    return new HtmlWebpackPlugin({
      index: path2Absolute(`src/view/${name}.html`),
      template: path2Absolute(`src/views/${name}.html`),
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
  path2Absolute,
  path2Relative,
  dealingHtml
}