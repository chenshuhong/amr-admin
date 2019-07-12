/**
 * @Author: 陈树鸿
 * @Date: 2018-10-29
 *  登录容器组件，当判断已登录时想跳转登录时重定向到首页/
 */
import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from 'page/App/reducer';

function LoginRoute({
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

const mapStateToProps = state => ({
  ...state.app,
});

const mapDispatchToProps = dispatch => ({
  onLoginSuccess: () => dispatch(login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginRoute);
