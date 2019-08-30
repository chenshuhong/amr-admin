import React from "react";
import { inject } from "mobx-react";
// 引入antd的组件
import { Menu, Layout, Dropdown, message, Modal  } from 'antd';
const { confirm } = Modal;
const { Header } = Layout
// 加载当前组件样式
import styles  from './index.less';
import avatar from 'img/avatar.png'

@inject('appStore')
class GlobalHeader extends React.Component{

  // 构造函数
  constructor(props, context) {
    super(props, context);
  }

  // 执行退出
  doLogout(){
    message.success('注销成功')
    this.props.appStore.onLoginOut()
  }

  //注销
  showLogoutConfirm() {
    confirm({
      title: '确定要注销吗?',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        this.doLogout()
      },
    });
  }

  // 下拉菜单点击事件
  handleClickMenu(e){
    switch('' + e.key){
      case 'logout':
        this.showLogoutConfirm()
        break
      default:
        console.log('unknown key')
    }
  }

  // 点击用户登录信息的下拉菜单
  getDropDownMenu(){
    return (
      <Menu onClick={ e => this.handleClickMenu(e) }>
        <Menu.Item key="logout">
          <a>注销</a>
        </Menu.Item>
      </Menu>
    )
  }

// 渲染用户信息
  renderUserInfo(){
    return (
      <div className={styles.user}>
        <Dropdown placement="bottomRight" overlay={ this.getDropDownMenu() }>
          <a href="#">
            <img src={avatar} alt={'头像'}/>
            <span>{this.props.appStore.state.username}</span>
          </a>
        </Dropdown>
      </div>
    )
  }

  // 渲染内容
  render(){
    return (
      <Header {...this.props}>
        { this.renderUserInfo() }
      </Header>
    )
  }
}

export default GlobalHeader
