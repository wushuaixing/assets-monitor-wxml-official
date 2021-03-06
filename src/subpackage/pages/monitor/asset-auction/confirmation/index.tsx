import React, { Component } from 'react';
import Taro from "@tarojs/taro";
import { View } from '@tarojs/components';
import NavigationBar from "../../../../../components/navigation-bar"
import './index.scss';
import {dateToFormat} from "../../../../../utils/tools/common";

type IProps = {
}

type IState = {
  detail:{
    court: string
    title: string
    auctionSubjectMatter: string
    url: string
    start: any
    end: any
    auctionSuccessConfirmation: string
    createTime: any
  }
};


export default class Confirmation extends Component <IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      detail: {}
    };
  }

  onLoad(option){
    const _this = Taro.getCurrentInstance().page;
    const eventChannel = _this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', (detail) => this.handleState(detail))
  }

  handleState = (detail) => {
    this.setState({
      detail
    })
  };


  render () {
    const { detail } = this.state;
    console.log('detail === ', detail);

    return (
      <View className='confirmation'>
        <NavigationBar border title='竞价成功确认书'/>
        <View className='confirmation-content'>
          <View className='confirmation-content-title'>网络竞价成功确认书</View>
          <View className='confirmation-content-info'>
            <View className='confirmation-content-info-label'>处置单位</View>
            <View className='confirmation-content-info-colon'>：</View>
            <View className='confirmation-content-info-text'>{detail.court}</View>
          </View>
          <View className='confirmation-content-info'>
            <View className='confirmation-content-info-label'>标的物名称</View>
            <View className='confirmation-content-info-colon'>：</View>
            <View className='confirmation-content-info-text'>{detail.title}</View>
          </View>
          <View className='confirmation-content-info'>
            <View className='confirmation-content-info-label'>标的物网拍链接</View>
            <View className='confirmation-content-info-colon'>：</View>
            <View className='confirmation-content-info-text'>{detail.url}</View>
          </View>
          {/*<View className='confirmation-content-info'>*/}
          {/*  <View className='confirmation-content-info-label'>网拍公告时间</View>*/}
          {/*  <View className='confirmation-content-info-colon'>：</View>*/}
          {/*  <View className='confirmation-content-info-text'>{detail.createTime ? moment(detail.createTime * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'}</View>*/}
          {/*</View>*/}
          <View className='confirmation-content-info'>
            <View className='confirmation-content-info-label'>网拍开始时间</View>
            <View className='confirmation-content-info-colon'>：</View>
            <View className='confirmation-content-info-text'>{dateToFormat(detail.start, 'YYYY-MM-DD HH:mm:ss')}</View>
          </View>
          <View className='confirmation-content-info'>
            <View className='confirmation-content-info-label'>网拍结束时间</View>
            <View className='confirmation-content-info-colon'>：</View>
            <View className='confirmation-content-info-text'>{dateToFormat(detail.end, 'YYYY-MM-DD HH:mm:ss')}</View>
          </View>
        </View>
        {
          detail.auctionSuccessConfirmation && <View className='confirmation-plan'>
	          <View className='confirmation-plan-title'>【网络拍卖竞价结果】</View>
	          <View className='confirmation-plan-text'>{detail.auctionSuccessConfirmation}</View>
          </View>
        }
      </View>
    )
  }
}
