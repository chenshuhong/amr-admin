/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12 18:32
 */
import React from "react";
import { Icon, Result } from "antd";
import CardNoBorder from 'components/CardNoBorder'

export default ()=>(
  <CardNoBorder>
    <Result
      icon={<Icon type="smile" theme="twoTone" />}
      title="欢迎体验AMR框架"
    />
  </CardNoBorder>
)
