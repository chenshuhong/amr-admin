/**
 * @Author: 陈树鸿
 * @Date: 2019-08-12 20:34
 */
import React from "react";
import style from './index.less'
import { withRouter } from "react-router-dom";

class MatchScreen extends React.Component{
  componentDidMount(){
    window.router = this.props.history
  }
  
  render(){
    return (<div className={style.matchScreen}>
      {
        this.props.children
      }
    </div>)
  }
}

export default withRouter(MatchScreen)
