/**
 * @Author: 陈树鸿
 * @Date: 2019-08-13 11:07
 */
import { Modal, notification } from 'antd'
import {debounce} from 'lodash'
const msgTypeList = ['info', 'success', 'error', 'warn']

export function showNotification (msgObj, type = 'error', duration = 3) {
  if(!msgTypeList.includes(type) ){
    type = 'info'
  }
  
  notification[type]({
    message: msgObj.title,
    description: msgObj.description,
    duration
  });
}

export function showModal(msgObj,type = 'warning') {
  if(!msgTypeList.includes(type) ){
    type = 'info'
  }
  Modal[type]({
    title: msgObj.title,
    content: msgObj.description,
    onOk: () => {
      msgObj.onOk?msgObj.onOk():msgObj.onClose&&msgObj.onClose()
    },
    afterClose: () =>  {
      msgObj.onClose&&msgObj.onClose()
    }
  })
}

export const showUnLoginModal = debounce(showModal, 1000, {leading:true,trailing:false})

