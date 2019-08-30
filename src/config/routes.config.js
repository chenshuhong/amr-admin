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
  },
  {
    path:'/component/editor',
    component:()=>import(/* webpackChunkName: "editor" */'page/component/editor')
  }
]

export default routes
