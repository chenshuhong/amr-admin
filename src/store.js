/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12 19:22
 */
import { observable, action, runInAction } from 'mobx';
import cookie from 'js-cookie'
import config from "src/config";
import {getMenus} from "config/serv"
class AppStore{
  @observable
  state={
    hasLogin:!!cookie.get(config.cookie.auth),
    username:cookie.get(config.cookie.username),
    auth:cookie.get(config.cookie.auth),
    menus:[]
  }
  
  @action
  onLoginSuccess=(auth,username)=>{
    this.state.hasLogin = true
    this.state.username = username
    this.state.auth = auth
    cookie.set(config.cookie.username,username,{ expires: 3 })
    cookie.set(config.cookie.auth,auth,{ expires: 3 })
    window.router.push('/')
    this.getMenus()
  }
  
  @action
  onLoginOut=()=>{
    this.state.hasLogin = false
    cookie.set(config.cookie.auth,'')
    cookie.set(config.cookie.username,'')
    window.router.push('/login')
  }
  
  @action
  getMenus = async ()=>{
    let menus = await getMenus()
    runInAction(() => {
      this.state.menus = menus
    });
  }
}

const appStore = new AppStore();
export default appStore;
