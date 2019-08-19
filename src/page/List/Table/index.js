/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12
 */
import React from "react";
import { Button, Form, Icon, Input } from "antd";
import { observer } from "mobx-react";
import style from './style.less'
import mod from './mobel'

@observer
class Table extends React.Component {

  render() {
    return (
      <div className={style.flexContainer}>
        列表页
      </div>
    )
  }
}

export default Form.create()(Table)
