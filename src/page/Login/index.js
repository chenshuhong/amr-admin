/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12
 */
import React from "react";
import { Button, Form, Icon, Input } from "antd";
import style from './index.less'
import { inject } from "mobx-react";

@inject('appStore')
class Login extends React.Component {

  state={
    username:'',
    password:''
  }

  render() {
    let {form,appStore} = this.props.form
    let {getFieldDecorator} = form
    return (
      <div className={style.flexContainer}>
        <div className={style.formContainer}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Button type="primary" htmlType="submit" onClick={()=>appStore.login()}>
            Log in
          </Button>
        </div>
      </div>
    )
  }
}

export default Form.create({name:'login'})(Login)
