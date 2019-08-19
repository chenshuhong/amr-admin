const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const common = require('./webpack.common.js');
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer')

module.exports = merge.smartStrategy({
  'module.rules.use': 'prepend',
})(common, {
  // 会将 process.env.NODE_ENV 的值设为 production。
  // 启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
  mode: 'production',
  output: {
    filename: '[name].[contenthash:16].js', // 文件命名
    chunkFilename: '[name].[contenthash:16].js', // 代码分离每个chunk命名格式
  },
  module: {
    rules: [{
      test: /\.(css|less)$/,
      use: [MiniCssExtractPlugin.loader],
      include: path.resolve(__dirname, 'node_modules'),
    }, {
      test: /\.(css|less)$/,
      use: [MiniCssExtractPlugin.loader],
      exclude: path.resolve(__dirname, 'node_modules'),
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:16].css',
      chunkFilename: '[name].[contenthash:16].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new BundleAnalyzerPlugin({analyzerMode:'static'})
  ],
});
