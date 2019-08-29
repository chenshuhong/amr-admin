/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12
 */
import React from "react";
import { Card,Form } from "antd";
import { observer } from "mobx-react";
import style from './style.less'
import mod from './mobel'

@observer
class Table extends React.Component {

  render() {
    return (
      <div >
        <Card>
          列表页
        </Card>
      </div>
    )
  }
}

export default Form.create()(Table)
