/**
 * @Author: 陈树鸿
 * @Date: 2018-10-22
 *  动态加载loading组件
 */
import { Result, Spin } from 'antd'
import CardNoBorder from 'components/CardNoBorder'

export default function (props) {
  if (props.error) {
    return (
      <CardNoBorder>
        <Result
          status={'error'}
          title={'页面加载错误'}
          subTitle={'具体查看控制台错误信息'}>
        </Result>
      </CardNoBorder>
    );
  } else {
    return (
      <CardNoBorder>
        <Result
          icon={<Spin size="large" />}
          title='加载中'
        >
        </Result>
      </CardNoBorder>
    );
  }
}
