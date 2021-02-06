import React,{Component} from 'react'
import {Button,Input,Image,View,Text} from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtIcon } from "taro-ui"
import { connect } from 'react-redux';
import {base} from '../../../utils/config';
import {getGlobalData} from "../../../utils/const/global";
import './index.scss'

type isState ={
  isOpened:boolean,
  codeImg:string,
  codeImgValue:string,
}
@connect(({ login }) => ({ login }))
export default class ImageCode extends Component<any,isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpened:true,
      codeImg:`${base}/yc/open/wechat/verificationCode?openId=${getGlobalData('openId')}&${Math.random()}`,
      codeImgValue:'',
    }
  }


  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  handleCancel=() => {
    const { onCancel } = this.props;
    if (onCancel)onCancel();
  };

  onConfirm = () =>{
    const {codeImgValue} = this.state;
    const { onConfirm } = this.props;
    this.setState({
      isOpened:false
    })
    if(onConfirm){
      onConfirm(codeImgValue)
    }
  }

  onInput = (e) =>{
    const {detail:{value}} = e;
    this.setState({
      codeImgValue:value
    })
  }


  render() {
    const {isOpened,codeImg} = this.state;
    console.log('imageCodethis.state',this.state)
    return (
      <AtModal isOpened={isOpened}>
        <AtModalContent className="modal-content">
          <View className='modal-content-text'>请输入验证码</View>
          {/*<Image src={codeImg} />*/}
          {/*<Input onInput={this.onInput}/>*/}
        </AtModalContent>
        <AtModalAction>
          <Button onClick={this.handleCancel}>取消</Button>
          <Button onClick={this.onConfirm}>确定</Button>
        </AtModalAction>
      </AtModal>
    )
  }
}
