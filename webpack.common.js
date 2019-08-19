const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

/**
 * css loader 配置,加载顺序 less-loader>post-loader>css-loader>style-loader,但写的顺序要与之相反
 * less-loader：把less文件转化为css文件
 * post-loader：把css文件通过post插件转化为css文件
 * css-loader：加载css文件
 * style-loader：使用<style></style>将样式注入到我们的HTML页面
 * @param isOpenCssModule 是否开启cssmodule 当是nodemodule里的css时不开启
 * @returns {*[]}
 */
function getCssModuleLoaders(isOpenCssModule) {
  let lessPath = path.resolve('theme.less')
  return [
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, less-loader,针对css里面的@import资源
        modules: isOpenCssModule ? {// 开启css module
          localIdentName: '[local]-[hash:base64:8]',
        } : false,
      },
    },
    'postcss-loader',
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
        modifyVars: {
          'hack': `true; @import "${lessPath}";`,
        },
      },
    },
  ];
}

module.exports = {
  entry: './src/index.js', // 入口文件
  plugins: [
    new CleanWebpackPlugin(), // 每次构建清除dist目录
    new HtmlWebpackPlugin({
      title: 'React Todo Demo',
      template: './src/index.html',
    }), // 会自动把output生成的bundle与事先配置好template关联起来
    new ScriptExtHtmlWebpackPlugin({
      //`runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime~.*\.js$/
    }),
    new webpack.ProvidePlugin({
      'cn': 'classnames',
    }),
    new CopyPlugin([
      {from: 'src/assets', to: 'assets'},
    ]),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),//moment只用中文资源
  ],
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: '[name].js', // 文件命名
    chunkFilename: '[name].js', // 代码分离每个chunk命名格式
  },
  optimization: {
    // webpack 在入口 chunk 中，包含了某些样板(boilerplate)，特别是 runtime 和 manifest
    // 利用runtimeChunk提取模板，防止每次改动入口文件不管有没变化都会变化
    runtimeChunk: {
      name: entryPoint => `runtime~${entryPoint.name}`,
    },
    moduleIds: 'hashed',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        },
        antd: {
          name: "chunk-antd", // 单独将 antd和其图标 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
          chunks: "initial" // 只打包初始时依赖的第三方
        },
      },
    },
  },
  resolve: {
    // 设置别名
    alias: {
      src: path.resolve(__dirname, 'src'),
      components: path.resolve(__dirname, 'src/components'),
      page: path.resolve(__dirname, 'src/page'),
      utils: path.resolve(__dirname, 'src/utils'),
      config: path.resolve(__dirname, 'src/config'),
    },
  },
  module: {
    rules: [{
      test: /\.(css|less)$/,
      use: getCssModuleLoaders(false),
      include: path.resolve(__dirname, 'node_modules'),
    }, {
      test: /\.(css|less)$/,
      use: getCssModuleLoaders(true),
      exclude: path.resolve(__dirname, 'node_modules'),
    }, /*{
      test: /\.js$/,
      loader: 'eslint-loader',
      enforce: "pre",
      include: path.resolve(__dirname, 'src'), // 指定检查的目录
    }, */{
      test: /\.js$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'babel-loader', // Rule.loader 是 Rule.use: [ { loader } ] 的简写。
    }, {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      ],
    },
    ],
  },
};
