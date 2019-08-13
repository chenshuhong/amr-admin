/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12 19:22
 */
import { observable,action } from 'mobx';
import cookie from 'js-cookie'
import config from "src/config";
class AppStore{
  @observable
  state={
    hasLogin:false
  }
  
  @action
  onLoginSuccess=()=>{
    this.state.hasLogin = true
    window.router.push('/')
  }
  
  @action
  onLoginOut=()=>{
    this.state.hasLogin = false
    cookie.set(config.cookie.auth,'')
    cookie.set(config.cookie.username,'')
    window.router.push('/login')
  }
}

const appStore = new AppStore();
export default appStore;
