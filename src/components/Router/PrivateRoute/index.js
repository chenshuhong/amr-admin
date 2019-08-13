/**
 * @Author: 陈树鸿
 * @Date: 2018-10-22
 *  鉴权路由，当检测没登录时重定向到登录界面
 */
import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { inject } from "mobx-react";

@inject('appStore')
class PrivateRoute extends React.Component {
  
  render() {
    let {component: Component, appStore, ...rest} = this.props
    let {hasLogin} = appStore.state
    console.log(hasLogin)
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

export default PrivateRoute
