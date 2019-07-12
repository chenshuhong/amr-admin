/**
 * @Author: 陈树鸿
 * @Date: 2019-07-11 20:42
 */
import ReactDom from 'react-dom';
import React from "react";
import { Provider } from 'mobx-react';
import AppRouter from 'components/Router'
import store from './store'
import './common.less'

// <Provider> 让所有容器组件都可以访问 store，而不必显示地传递它。只需要在渲染根组件时使用即可
const element = (
  <Provider>
    <AppRouter/>
  </Provider>
);
const root = document.createElement('div');
document.body.appendChild(root);
ReactDom.render(element, root);
