/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12
 */
import React from "react";
import { Form } from "antd";
import CardNoBorder from 'components/CardNoBorder'
import { observer } from "mobx-react";
import Editor from 'components/Editor'
import style from './style.less'
import mod from './mobel'

@observer
class Table extends React.Component {
  
  componentDidMount(){
  
  }

  render() {
    return (
      <div >
        <CardNoBorder>
          <Editor onChange={(editorState)=>mod.updateStore({editorState})} htmlContent = {mod.content}/>
        </CardNoBorder>
      </div>
    )
  }
}

export default Form.create()(Table)
