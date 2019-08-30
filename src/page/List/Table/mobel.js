/**
 * @Author: 陈树鸿
 * @Date: 2019-07-14
 */

import { observable, action, runInAction } from "mobx";
import {getList} from './serv'

class Model{
  @observable
  state = {
    tableData: {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      dataSource: [],
    },
  }
  
  //获取列表
  @action getList = async (payload={}) =>{
    this.state.tableLoading = true;
    //如果没有传页码则默认取state中的
    const { tableData} = this.state;
    let params = {
      pageNum: tableData.pageNum,
      pageSize: tableData.pageSize,
      ...payload
    };

    try {
      const { list, ...rest } = await getList(params);
      runInAction(()=>{
        this.state.tableData = {
          pageNum: rest.pageNum,
          pageSize: rest.pageSize,
          total: rest.total,
          dataSource:list,
        }
      })
      
    }finally {
      runInAction(()=>{
        this.state.tableLoading = false;
      })
    }
  };
  
  
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
