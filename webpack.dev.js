const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

// 这里用到了merge.smartStrategy,他会智能合并loader的内容,并设置use顺序
const config = merge.smartStrategy({
  'module.rules.use': 'prepend',
})(common, {
  // 会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin,devtool为'eval'
  mode: 'development',
  devtool:'cheap-module-source-map',
  // 在代码发生变化后自动编译代码
  // 以下配置告知 webpack-dev-server，在 localhost:8080(默认端口,可通过port配置) 下建立服务，将 dist 目录下的文件，作为可访问文件。同时启用 webpack 的模块热替换特性：
  devServer: {
    contentBase: 'dist',
    port: 8082,
    hot: true,
  },
  module: {
    rules: [{
      test: /\.(css|less)$/,
      use: ['style-loader'],
      include: path.resolve(__dirname, 'node_modules'),
    }, {
      test: /\.(css|less)$/,
      use: ['style-loader'],
      exclude: path.resolve(__dirname, 'node_modules'),
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
module.exports = config;
