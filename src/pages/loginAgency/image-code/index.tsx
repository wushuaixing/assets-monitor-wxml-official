import React, {Component} from 'react'
import {Button, Input, Image, View, Text} from '@tarojs/components'
import {AtModal, AtModalContent, AtModalAction} from "taro-ui"
import {connect} from 'react-redux';
import {base} from '../../../utils/config';
import {getGlobalData} from "../../../utils/const/global";
import './index.scss'
import Taro from "@tarojs/taro";

type isState = {
  isOpened: boolean,
  codeImg: string,
  codeImgValue: string,
}
@connect(({login}) => ({login}))
export default class ImageCode extends Component<any, isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpened: true,
      codeImg: `${base}/yc/open/wechat/verificationCode?openId=${getGlobalData('openId')}&${Math.random()}`,
      codeImgValue: '',
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

  handleCancel = () => {
    const {onCancel} = this.props;
    if (onCancel) onCancel();
  };

  onConfirm = () => {
    const {codeImgValue} = this.state;
    const {onConfirm} = this.props;
    if (codeImgValue && codeImgValue.length === 4) {
      if (onConfirm) onConfirm(codeImgValue)
    } else {
      Taro.showToast({title: '请输入完整的验证码!', icon: 'none'});
    }
  }

  onInput = (e) => {
    const {detail: {value}} = e;
    this.setState({
      codeImgValue: value
    })
  }

  handleRefresh = () => {
    const {codeImg} = this.state;
    this.setState({
      codeImg: `${codeImg}&${Math.random()}`,
      codeImgValue: ''
    });
  };


  render() {
    const {codeImg, codeImgValue} = this.state;
    const {isOpenImageModal} = this.props.login.isOpenImageModal;
    return (
      <View className='yc-login-imgCode modal-content'>
        <AtModal isOpened={isOpenImageModal}>
          <AtModalContent>
            <View className='modal-content-text'>请输入验证码</View>
            <View className='modal-content-code'>
              <View className='modal-content-code-img'>
                <Image src={codeImg}/>
              </View>
              <View className='modal-content-code-text' onClick={this.handleRefresh}>换一张</View>
            </View>
            <View className='modal-content-wrapper'>
              <View className='modal-content-wrapper-icon'>
                <Text className="iconfont icon-yanzhengma" style={{fontSize: '40rpx'}}/>
              </View>
              <View className='modal-content-wrapper-input'>
                <Input onInput={this.onInput} placeholder='请输入验证码' value={codeImgValue}/>
              </View>
            </View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.handleCancel}>取消</Button>
            <Button onClick={this.onConfirm}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
