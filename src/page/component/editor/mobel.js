/**
 * @Author: 陈树鸿
 * @Date: 2019-07-14
 */

import { observable, action, runInAction } from "mobx";
import {getList} from './serv'

class Model{
  @observable
  state = {
    content:''
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
