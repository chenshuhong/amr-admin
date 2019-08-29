import React from 'react';
import { Menu,Layout } from 'antd';
import { inject, observer } from "mobx-react";
import {withRouter} from 'react-router-dom'
import styles from './index.less'
import logo from 'img/logo.svg'

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const {Sider} = Layout

const getMenus = function (menuArray) {
  return menuArray.map(item => {
    if (item.noShow){
      return
    }
    if (item.children&&item.children.length>0) {
      return (
        <SubMenu key={item.routePath} title={<span>{item.name}</span>}>
          {getMenus(item.children)}
        </SubMenu>
      )
    }
    return (
      <MenuItem key={item.routePath}>
        <span>{item.name}</span>
      </MenuItem>
    )
  })
}

@inject('appStore')
@observer
class SiderView extends React.Component {
  
  constructor(props) {
    super(props);
    this.renderMenuItems = this.renderMenuItems.bind(this)
    this.onMenuClick = this.onMenuClick.bind(this)
    this.onOpenChange = this.onOpenChange.bind(this)
    this.getPath = this.getPath.bind(this)
    let paths = this.getPath(props.location.pathname)
    let openKeys = this.getOpenKeys(paths)
    this.state = {
      selectedKeys: [paths.join('/')],
      openKeys,
    };
  }
  
  
  getPath(path) {
    let paths = path.split('/')
    return paths
  }
  
  getOpenKeys = (paths)=>{
    let openKeys = []
    if (paths.length > 0) {
      openKeys.push(paths[0])
      if (paths.length>1){
        openKeys.push(paths[0]+'/'+paths[1])
      }
    }
    return openKeys
  }
  
  /*componentWillReceiveProps(newProps) {
    let paths = this.getPath(newProps.pathname, false)
    this.setState({
      selectedKeys: [paths.join('/')],
      menuConfig: this.getMenu(newProps.pathname),
    })
    
    if (paths.length > 0) {
      let openKeys = []
      openKeys.push(paths[0])
      if (paths.length>1){
        openKeys.push(paths[0]+'/'+paths[1])
      }
      this.setState({
        openKeys,
      })
    }
  }*/
  
  renderMenuItems(menus) {
    return getMenus(menus)
  }
  
  onMenuClick({item, key, keyPath}) {
    window.router.push(key)
  }
  
  onMenuSelect({item, key, keyPath}) {
  
  }
  
  onOpenChange(openKeys) {
    this.setState({
      openKeys
    })
  }
  
  render() {
    let {menus} = this.props.appStore.state
    return (
      <Sider
        theme='light'
        className={styles.sider}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <span className={cn('font_38',styles.title)}>AMR</span>
        </div>
        <div className={styles.menuWrap}>
          <Menu
            mode="inline"
            selectedKeys={this.state.selectedKeys}
            openKeys={this.state.openKeys}
            onSelect={this.onMenuSelect}
            onOpenChange={this.onOpenChange}
            onClick={this.onMenuClick}>
            {this.renderMenuItems(menus)}
          </Menu>
        </div>
      </Sider>
    )
  }
  
}

export default withRouter(SiderView)
