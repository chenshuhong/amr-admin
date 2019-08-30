import React from 'react'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
import 'braft-extensions/dist/color-picker.css'
import ColorPicker from 'braft-extensions/dist/color-picker'
import Table from 'braft-extensions/dist/table'
import HeaderId from 'braft-extensions/dist/header-id'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/table.css'
import './index.less'
import {Input} from 'antd'
import config from "config/config";
import { reqInform } from "utils/notification";
import { request } from "config/request";

const TextArea = Input.TextArea

const tableOptions = {
  defaultColumns: 3, // 默认列数
  defaultRows: 3, // 默认行数
  withDropdown: false, // 插入表格前是否弹出下拉菜单
  exportAttrString: '', // 指定输出HTML时附加到table标签上的属性字符串
}
const colorOptions = {
  theme: 'light', // 指定取色器样式主题，支持dark和light两种样式
}

BraftEditor.use(Table(tableOptions))
BraftEditor.use(ColorPicker(colorOptions))
BraftEditor.use(HeaderId({}))
export default class Editor extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
      // 创建一个空的editorState作为初始值
      insertHtml:'',
      editorState: BraftEditor.createEditorState(this.props.htmlContent)
    }
    this.myUploadFn = this.myUploadFn.bind(this)
    this.changeState = this.changeState.bind(this)
  }
  
  changeState(obj){
    this.setState(obj)
  }
  
  calculate_object_name(g_dirname, group, filename) {
    if(!filename){
      return '';
    }
    let suffix = this.get_suffix(filename)
    let g_object_name = g_dirname + this.random_string(10) + suffix
    if(!!group){
      if(g_dirname.indexOf('/') == -1){
        g_dirname += '/'
      }
      g_object_name = decodeURIComponent(g_dirname + group + '/' + this.random_string(10) + suffix)
    }
    return g_object_name;
  }
  
  random_string(len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
  
  
  get_suffix(filename) {
    let pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos != -1) {
      suffix = filename.substring(pos)
    }
    return suffix;
  }
  
  // 获取签名串
  getSign(file){
    return request({
      url:config.apiAppName(config.requestApiUrl.getPolicyUrl,'data'),
      method: "GET",
    }).then(({resultCode,data})=>{
      console.log(resultCode,data)
      if(resultCode + '' === '0'){
        let uploadCfg = {}
        uploadCfg.uploadImgServer = data.host
        uploadCfg.uploadImgParams = {
          OSSAccessKeyId: data.accessid,
          policy: data.policy,
          signature: data.signature,
          key: this.calculate_object_name(data.dir, 'article', file && file.name),
          name: file && file.name,
          size: file && file.size,
          success_action_status: '200'
        }
        uploadCfg.file= file
        return Promise.resolve(uploadCfg)
      } else {
        return Promise.reject('出错啦111')
      }
    })
  }
  
  // 上传对象到OSS
  postObject2OSS(uploadCfg){
    let file = uploadCfg.file
    // FormData对象
    let formData = new FormData()
    // 附加参数
    let ump = uploadCfg.uploadImgParams
    Object.keys(ump).map((k, i) => {
      formData.append(k, ump[k])
    })
    formData.append('file', file)
    
    // 上传文件
    return $.ajax({
      url: uploadCfg.uploadImgServer,
      type: 'POST',
      cache: false,
      data: formData,
      processData: false,
      contentType: false
    }).then(function(res) {
      let tmpKey = ump.key
      
      if(!!file.client_width || !!file.client_height){
        tmpKey += '?x-oss-process=image/resize'
        
        if(!!file.client_width){
          tmpKey += `,w_${file.client_width}`
        }
        
        if(!!file.client_height){
          tmpKey += `,h_${file.client_height}`
        }
      }
      return Promise.resolve(uploadCfg.uploadImgServer + '/' + tmpKey)
    }).fail(function(err) {
      return Promise.resolve(err)
    })
  }
  
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.htmlContent!==this.props.htmlContent){
      this.setState({
        editorState: BraftEditor.createEditorState(nextProps.htmlContent)
      })
    }
  }
  
  handleEditorChange = (editorState) => {
    this.setState({editorState})
    this.props.onChange(editorState)
  }
  
  async myUploadFn(param){
    try {
      let sign = await this.getSign(param.file)
      let url = await this.postObject2OSS(sign)
      param.success({
        url,
        
      })
    }catch(e){
      console.log(e)
      param.error({
        message:e.toString()
      })
    }
  }
  
  render() {
    const {editorState} = this.state
    const extendControls = [
      {
        key: 'insert-html-modal',
        type: 'modal',
        text: '插入html',
        modal: {
          id: 'my-moda-1',
          title: '请在下面输入html',
          width: 800, // 指定弹窗组件的宽度
          showConfirm: true, // 指定是否显示确认按钮
          confirmable: true, // 指定确认按钮是否可用
          showCancel: true, // 指定是否显示取消按钮
          onConfirm: () => {
          
          }, // 指定点击确认按钮后的回调函数
          children: (
            <div className='h-html-container'>
              <TextArea value={this.state.insertHtml} onChange={(e)=>this.changeState({insertHtml: e.target.value})}>
              </TextArea>
            </div>
          )
        }
      }
    ]
    return (
      <div className="h-editor">
        <BraftEditor
          readOnly={this.props.readOnly}
          value={editorState}
          onChange={this.handleEditorChange}
          /*media = {{
            uploadFn:this.myUploadFn
          }}*/
          extendControls={extendControls}
        />
      </div>
    )
  }
}
