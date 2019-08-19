/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12 17:16
 */
import React from 'react';
// 一般来说，如果你有一个响应请求的服务器，则你应该使用 <BrowserRouter> ，如果你使用的是静态文件的服务器，则应该使用 <HashRouter>
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Loadable from 'react-loadable';// react-loadable 对于有动态导入的组件来说是一个高阶组件。它可以自动处理各种边缘情况，并且使代码拆分变得简单！
import routeConfig from 'config/routes.config'
import Loading from 'components/Loading'
import AuthRoute from './AuthRoute'
import WithRouterView from 'components/WithRouterView'
import BasicLayout from 'components/Layout/BasicLayout'

// react-loadable 实现代码分割
function getLoadableComponent(componentImportFn,) {
  const Component = Loadable({
    loader: componentImportFn,
    loading: Loading,
  });
  return Component;
}

function loopRoutes(routes, match = {}) {
  const matchPath = match.path || '';
  return (
    // <Switch> 不是分组 <Route> 所必须的，但他通常很有用。 一个 <Switch> 会遍历其所有的子 <Route> 元素，并仅渲染与当前地址匹配的第一个元素。这有助于多个路由的路径匹配相同的路径名
    // extra:精确匹配
    <Switch>
      <AuthRoute
        exact
        path="/login"
        component={getLoadableComponent(() => import(/* webpackChunkName: "login" */'page/Login'))}
      />
      <BasicLayout>
        <Switch>
          {
            routes.map((route) => {
              return (
                <AuthRoute
                  exact
                  key={route.path}
                  path={route.path}
                  component={getLoadableComponent(route.component)}
                />
              );
            })
          }
          <Route component={getLoadableComponent(()=>import(/* webpackChunkName: "404" */'page/404'))}/>
        </Switch>
      </BasicLayout>
    </Switch>
  );
}

const AppRouter = (props) => (
  <Router>
    <WithRouterView>
      {loopRoutes(routeConfig)}
    </WithRouterView>
  </Router>
);

export default AppRouter
