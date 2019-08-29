/**
 * @Author: 陈树鸿
 * @Date: 2019-07-12 18:32
 */
import { Button, Result } from "antd";
import CardNoBorder from 'components/CardNoBorder'

export default ()=>(
  <CardNoBorder>
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" onClick={()=>window.router.push('/')}>Back Home</Button>}
    />
  </CardNoBorder>
)
