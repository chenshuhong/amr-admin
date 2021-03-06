/**
 * @Author: 陈树鸿
 * @Date: 2019-07-14
 */

import { observable, action, runInAction } from "mobx";
import {login} from './serv'

class Model{
  @observable
  state = {
    username:'',
    password:'',
    loading:false
  }
  
  @action
   async login(onLoginSuccess){
    let {username,password} = this.state
    this.state.loading = true
    try {
      let {auth} = await login({username,password})
      onLoginSuccess(auth,username)
    }finally {
      runInAction(() => {
        this.state.loading = false
      });
    }
  }
  
  
  // 更新状态
  @action
  updateStore = (payload={}) => {
    this.state = {
      ...this.state,
      ...payload
    }
  }
}

const mod = new Model()
export default mod
