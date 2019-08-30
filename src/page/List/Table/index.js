/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12
 */
import React from "react";
import { Card,Form } from "antd";
import CardNoBorder from 'components/CardNoBorder'
import { observer } from "mobx-react";
import Grid from 'components/Grid'
import style from './style.less'
import mod from './mobel'

@observer
class Table extends React.Component {
  
  componentDidMount(){
    mod.getList()
  }
  
  // 表格
  columns = [
    { title: '分类', dataIndex: 'category' },
    { title: '型号', dataIndex: 'name' },
    { title: '价格', dataIndex: 'price' },
    {
      title: '操作', dataIndex: 'operation',isActions: true, fixed: 'right', render: (text, record) => (
        <a onClick={()=>console.log('查看')}>查看</a>
      ),
    },
  ]

  render() {
    let {tableData,tableLoading} = mod.state
    return (
      <div >
        <CardNoBorder>
          填充
        </CardNoBorder>
        <CardNoBorder>
          填充
        </CardNoBorder>
        <CardNoBorder>
          <Grid
            nameSpace={'rightsMgntListMod'}
            data={{
              columns: this.columns,
              ...tableData,
            }}
            method='getList'
            loading={tableLoading}
            scroll={{ x: 'max-content' }}
            pageChange={(pageNum, pageSize) => {
              mod.getList({ pageNum, pageSize })
            }}
          />
        </CardNoBorder>
      </div>
    )
  }
}

export default Form.create()(Table)
