/**
 * @Author: 陈树鸿
 * @Date: 2018-10-22
 *  鉴权路由，当检测没登录时重定向到登录界面
 */
import React from 'react';
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, app, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (app.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      ))
      }
    />
  );
}
