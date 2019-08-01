/**
 * @Author: 陈树鸿
 * @Date: 2019-07-14
 */

import { observable } from "mobx";

class Model{
  @observable
  state = {
    username:'',
    password:'',
    loading:false
  }
}
