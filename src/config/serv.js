/**
 * @Author: 陈树鸿
 * @Date: 2019-08-29 11:50
 */
import request from 'utils/request'
export function getMenus() {
  return request({
    url:'menus',
  })
}
