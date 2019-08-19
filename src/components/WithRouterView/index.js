/**
 * @Author: 陈树鸿
 * @Date: 2019-08-12 20:34
 */
import React from "react";
import { withRouter } from "react-router-dom";

class WithRouterView extends React.Component{
  componentDidMount(){
    window.router = this.props.history
  }
  
  render(){
    return (<div className={'match_screen'}>
      {
        this.props.children
      }
    </div>)
  }
}

export default withRouter(WithRouterView)
