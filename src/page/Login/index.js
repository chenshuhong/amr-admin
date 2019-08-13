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
class Login extends React.Component {
  
  validateLogin = ()=>{
    this.props.form.validateFieldsAndScroll(['username','password'],err=>{
      if (!err){
        mod.login(this.props.onLoginSuccess)
      }
    })
  }

  render() {
    let {form} = this.props
    let {username,password,loading} = mod.state
    let {getFieldDecorator} = form
    return (
      <div className={style.flexContainer}>
        <div className={style.formContainer}>
          <div className={cn('font_38','tac','mg2b')}>
            LOGO
          </div>
          <Form.Item>
            {getFieldDecorator('username', {
              initialValue:username,
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input
                size={'large'}
                onChange={(e)=>mod.updateStore({username:e.target.value})}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              initialValue:password,
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input
                size={'large'}
                onChange={(e)=>mod.updateStore({password:e.target.value})}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Button className={'mg2t'} size={'large'} type="primary" loading={loading} style={{width:'100%'}} onClick={this.validateLogin}>
            Login
          </Button>
        </div>
      </div>
    )
  }
}

export default Form.create({name:'login'})(Login)
