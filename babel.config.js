/**
 * @Author: 陈树鸿
 * @Date: 2019-07-11 19:26
 */
const presets = [
  ['@babel/env', {
    useBuiltIns: false,
  }],
  ['@babel/preset-react'], // react jsx语法
];

const plugins = [
  ['import', { libraryName: 'antd', style: true }], // antd需要加载
  '@babel/plugin-syntax-dynamic-import', // 动态导入语法
  ["@babel/plugin-proposal-decorators", { "legacy": true}],//装饰器语法
  ["@babel/plugin-proposal-class-properties", { "loose": true}]
];

module.exports = { presets, plugins };

