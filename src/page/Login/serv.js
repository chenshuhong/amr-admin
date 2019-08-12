/**
 * @Author: 陈树鸿
 * @Date: 2019-08-01 19:17
 */
import request from 'utils/request'
export function login(data) {
  return request({
    url:'login',
    data
  })
}
