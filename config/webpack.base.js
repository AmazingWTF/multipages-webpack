const { path2Absolute } = require('./utils');

module.exports = {
  entry: {
    vendor: ['jquery'], // 公共模块
    index: path2Absolute('./src/js/index.js'),
    detail: path2Absolute('./src/js/detail.js')
  },
  resolve: {
    alias: {
      '@': path2Absolute('src/')
    },
    extensions: ['.js', '.scss'] //设置require或import的时候可以不需要带后缀
  }
};
