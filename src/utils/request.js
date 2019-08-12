/**
 * @Author: 陈树鸿
 * @Date: 2019-08-01 19:36
 */
import axios from 'axios';
import config from 'config'
/**
 * 获得api接口地址
 * @param  {String} url    接口地址
 * @param  {Object} config 基础配置信息
 * @return {String}        转换过的接口地址
 */
const getUrl = function(url,version) {
  if(!url) {
    throw new Error('url should not be empty')
  } else if(url.indexOf("http") >= 0) {
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
