/**
 * @Author: 陈树鸿
 * @Date: 2019-07-11 21:03
 */
import React from "react";
import Header from 'components/Layout/Header'
import Footer from 'components/Layout/Footer'

export default class extends React.Component{
  render(){
    let props = this.props
    return (
      <div>
        <Header/>
        {
          props.children
        }
        <Footer/>
      </div>
    )
  }
}
