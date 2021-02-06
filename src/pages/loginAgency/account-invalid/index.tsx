import React,{Component} from 'react'
import {Button} from '@tarojs/components'
import { AtModal, AtModalContent, AtModalAction } from "taro-ui"
import {View} from '@tarojs/components'
import './index.scss'

type isState ={
  isOpened:boolean,
}

export default class ImageCode extends Component<any,isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpened:true,
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


  onConfirm = () =>{
    const { onConfirm } = this.props;
    this.setState({
      isOpened:false
    })
    if(onConfirm){
      onConfirm()
    }
  }


  render() {
    const {isOpened} = this.state;
    return (
      <AtModal isOpened={isOpened}>
        <AtModalContent>
          <View className='yc-login-accountInvalid-text'>
            账号已过期，建议联系客服<br />客服电话：133-7256-7936
          </View>
        </AtModalContent>
        <AtModalAction>
          <Button onClick={this.onConfirm}>我知道了</Button>
        </AtModalAction>
      </AtModal>
    )
  }
}
