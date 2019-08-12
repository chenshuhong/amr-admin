/**
 * @Author: 陈树鸿
 * @Date: 2018-10-22
 *  动态加载loading组件
 */
import React from 'react';

export default function (props) {
  if (props.error) {
    console.log(props.error)
    return <div>error</div>;
  } else {
    return <div>Loading...</div>;
  }
}
