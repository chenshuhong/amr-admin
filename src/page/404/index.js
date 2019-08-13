/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12 18:32
 */
import React from "react";
import { Button, Result } from "antd";

export default ()=>(
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={()=>window.router.push('/')}>Back Home</Button>}
  />
)
