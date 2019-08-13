/**
 * @Author: 陈树鸿
 * @Date: 2019-08-01 19:36
 */
import axios from 'axios';
import config from 'config'
import { showUnLoginModal, showNotification } from 'utils/notification'
import appStore from 'src/store'
/**
 * 获得api接口地址
 * @param  {String} url    接口地址
 * @param  {Object} config 基础配置信息
 * @return {String}        转换过的接口地址
 */
const getUrl = function(url,version) {
  if(!url) {
    throw new Error('url should not be empty')
  } else if(url.startsWith("http")) {
    return url
  }
  let str = ""
  // 本机开发环境，则当前assets/mock下面的json
  if(config.mock){
    return window.location.origin + "/assets/mock/" + url.replace(/\//g, "-") + '.json'
  }else{
    return `${config.baseUrl}/api/${version}/` + url;
  }
}

export default function(options){
  let { data, url, method = 'get',version = 'v1' } = options;
  let wholeUrl = getUrl(url,version)
  return axios({
    method,
    url:wholeUrl,
    data
  })
}

//响应拦截
axios.interceptors.response.use(({data})=>{
  let {resultCode,resultMsg} = data
  if (resultCode===0){
    return data.data
  }else if (resultCode === config.errorCode.unLogin) {
    showUnLoginModal({
      title:'登录信息失效',
      description:resultMsg||'登录信息失效,请重新登录',
      onClose:appStore.onLoginOut()
    })
  }else {
    showNotification({
      title:'系统提示',
      description:resultMsg||'接口服务故障'
    })
  }
},({data,status,statusText})=>{
  if(status+'' === '401'){
    showUnLoginModal({
      title:'登录信息失效',
      description:statusText||'登录信息失效,请重新登录',
      onClose:appStore.onLoginOut()
    })
  }else{
    showNotification({
      title: '系统提示',
      description: data.resultMsg||statusText || '接口服务故障'
    }, 'warn')
  }
})
