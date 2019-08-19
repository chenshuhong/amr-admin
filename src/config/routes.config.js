/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12 17:37
 */
const routes = [
  {
    path: '/',
    component:()=>import(/* webpackChunkName: "home" */'page/Home'),
  },
  {
    path:'/list/table',
    component: ()=>import(/* webpackChunkName: "table" */'page/List/Table'),
  }
]

export default routes
