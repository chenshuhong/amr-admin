/**
 * @Author: 陈树鸿
 * @Date: 2018-10-22
 *  鉴权路由，当检测没登录时重定向到登录界面
 */
import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { inject } from "mobx-react";

const unAuthPath = ['/login']

@inject('appStore')
class AuthRoute extends React.Component {
  
  render() {
    let {component: Component, appStore, ...rest} = this.props
    let {hasLogin} = appStore.state
    if (unAuthPath.includes(rest.path)){
      //当已经登录时不给跳到登录界面
      return (
        <Route
          {...rest}
          render={props => (hasLogin ? (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: rest.location },
                }}
              />
            ) : (
              <Component {...props} onLoginSuccess={appStore.onLoginSuccess} />
            )
          )}
        />
      );
    }else {
      return (
        <Route
          {...rest}
          render={props => (hasLogin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {from: props.location},
              }}
            />
          ))
          }
        />
      );
    }
  }
}

export default AuthRoute
