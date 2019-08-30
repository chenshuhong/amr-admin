/**
 * @Author: 陈树鸿
 * @Date: 2019-07-11 21:03
 */
import React from "react";
import { Layout, } from 'antd'
import { inject } from "mobx-react";
import Sider from 'components/Layout/Sider'
import GlobalFooter from 'components/Layout/GlobalFooter'
import GlobalHeader from 'components/Layout/GlobalHeader'
import styles from './index.less'
const {Content} = Layout;

@inject('appStore')
class BasicLayout extends React.Component {
  componentDidMount() {
    let {appStore} = this.props
    if (appStore.state.hasLogin) {
      this.props.appStore.getMenus()
    }
  }
  
  render() {
    let {appStore, children} = this.props
    return (
      <Layout className={'match_screen'}>
        <Sider className={styles.sider}/>
        <Layout>
          <GlobalHeader className={styles.header}/>
          <Content className={styles.content}>
            {children}
          </Content>
          <GlobalFooter className={styles.footer}/>
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout
