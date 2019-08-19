/**
 * @Author: 陈树鸿
 * @Date: 2019-07-14
 */

import { observable, action, runInAction } from "mobx";
import {login} from './serv'

class Model{
  @observable
  state = {
  
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
