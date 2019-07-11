/**
 * @Author: 陈树鸿
 * @Date: 2019-07-11 21:03
 */
import React from "react";
import { Menu } from "antd";
import style from './index.less'

export default class extends React.Component{
  render(){
    return (
      <div>
        <div className={style.logo} />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}>
          <Menu.Item key="1">
            <Link href="/list">
              <a>列表页</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/todo">
              <a>todo</a>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
