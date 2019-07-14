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

const element = (
  <Provider appStore={store}>
    <AppRouter/>
  </Provider>
);
const root = document.createElement('div');
document.body.appendChild(root);
ReactDom.render(element, root);
