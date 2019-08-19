/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12 17:37
 */
const routes = [
  {
    path: '/',
    name: '首页',
    component: ()=>import(/* webpackChunkName: "home" */'page/Home')
  }
]

export default routes
