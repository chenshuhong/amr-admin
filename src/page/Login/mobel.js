/**
 * @Author: 陈树鸿
 * @Date: 2019-07-14
 */

import { observable, action, runInAction } from "mobx";
import cookie from 'js-cookie'
import {login} from './serv'
import config from "src/config";

class Model{
  @observable
  state = {
    username:'',
    password:'',
    loading:false
  }
  
  @action
   async login(){
    let {username,password} = this.state
    this.state.loading = true
    try {
      let {auth} = await login({username,password})
      cookie.set(config.cookie.username,username,{ expires: 3 })
      cookie.set(config.cookie.auth,auth,{ expires: 3 })
      window.router.push('/')
    }finally {
      runInAction(() => {
        this.state.loading = false
      });
    }
  }
}

const mod = new Model()
export default mod
