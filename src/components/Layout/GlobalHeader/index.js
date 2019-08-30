// 路由对象
import { withRouter } from 'react-router-dom';
// 引入antd的组件
import { Menu, Layout, Dropdown, message, Modal  } from 'antd';
const { confirm } = Modal;
const { Header } = Layout
// 加载当前组件样式
import styles  from './index.less';

// 引入修改密码对话框
//import UpdatePwd from 'widget/UpdatePwd/UpdatePwdView';
//import PersonalInfo from 'widget/PersonalInfo/PersonalInfoView'
// 引入异步请求
import request from 'utils/request';

import avatar from 'img/avatar.png'
import React from "react";
import { inject } from "mobx-react";

@withRouter
@inject('appStore')
class GlobalHeader extends React.Component{

  // 构造函数
  constructor(props, context) {
    super(props, context);
    this.state = {
      updatePwdFlag: false,
      infoModal: false,      //个人资料弹窗
    }
  }

  // 比较对话框状态，已确保是否需要重新渲染
  getPwdDlgFlag(nextState){
    if('' + this.state.updatePwdFlag === '' + nextState.updatePwdFlag){
      return false
    }else{
      return true
    }
  }

  // 执行退出
  doLogout(){
    message.success('注销成功')
    this.props.appStore.onLoginOut()
  }

  // 打开密码对话框
  showPwdDlg(e){
    this.setState({
      updatePwdFlag: true
    }, () => {
      console.log('this.state.updatePwdFlag:', this.state.updatePwdFlag)
    })
  }

  // 关闭密码对话框
  hidePwdDlg(e, name){
    if (name === 'onOk') {
      // 清除Cookie
      clearCookie()
      this.setState({
        updatePwdFlag: false
      })
      // 跳转到登录页
      hashHistory.push('/login')
    } else {
      this.setState({
        updatePwdFlag: false
      })
    }
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
      case 'PersonalInfo':
        self.setState({
          infoModal: true
        })
        break;
      case 'logout':
        this.showLogoutConfirm()
        break
      case 'forgetPassword':
        this.showPwdDlg(e)
        break
      default:
        console.log('unknown key')
    }
  }

  // 点击用户登录信息的下拉菜单
  getDropDownMenu(){
    return (
      <Menu onClick={ e => this.handleClickMenu(e) }>
        {/*<Menu.Item key="PersonalInfo">个人资料</Menu.Item>
        <Menu.Item key="forgetPassword">
          <a>修改密码</a>
        </Menu.Item>*/}
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
    const { infoModal, updatePwdFlag } = this.state;
    
    return (
      <Header style={{ background: '#fff', padding: '0 16px' }}>
        {/* 个人资料 */}
        {/*<PersonalInfo
          visiable={infoModal}
          onCancel={() => {
            this.setState({
              infoModal: false
            })
          }}
        />
         弹出的修改密码对话框 - 默认隐藏
        <UpdatePwd
          visiable={updatePwdFlag}
          onCancel={() => {
            this.setState({
              updatePwdFlag: false
            })
          }}
        />*/}
        { this.renderUserInfo() }
      </Header>
    )
  }
}

export default GlobalHeader
