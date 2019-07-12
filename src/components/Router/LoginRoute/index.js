/**
 * @Author: 陈树鸿
 * @Date: 2018-10-29
 *  登录容器组件，当判断已登录时想跳转登录时重定向到首页/
 */
import React from 'react';
import { Redirect, Route } from "react-router-dom";

export default function LoginRoute({
  component: Component, isAuthenticated, isLoginIng, onLoginSuccess, ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} isLoginIng={isLoginIng} onLoginSuccess={onLoginSuccess} />
        )
      )}
    />
  );
}
