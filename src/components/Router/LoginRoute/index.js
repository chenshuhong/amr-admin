/**
 * @Author: 陈树鸿
 * @Date: 2018-10-29
 *  登录容器组件，当判断已登录时想跳转登录时重定向到首页/
 */
import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { inject } from "mobx-react";

@inject('appStore')
class LoginRoute extends React.Component {
  render() {
    let { component: Component, appStore, ...rest } = this.props
    let {hasLogin} = appStore.state
    return (
      <Route
        {...rest}
        render={props => (
          hasLogin ? (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          ) : (
            <Component {...props} onLoginSuccess={appStore.onLoginSuccess} />
          )
        )}
      />
    );
  }
}

export default LoginRoute
