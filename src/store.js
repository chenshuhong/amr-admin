/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12 19:22
 */
import { observable, action, useStrict, runInAction, autorun } from 'mobx';
class AppStore{
  @observable
  state={
    isAuthenticated:false,
    isLoginIng:false
  }
}

const appStore = new AppStore();
export default appStore;
