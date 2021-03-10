import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import NavigationBar from "../../../../../components/navigation-bar"
import { getAuctionStatus } from "../../../../../components/list-item/config";
import {dateToFormat, floatFormat} from '../../../../../utils/tools/common'
import './index.scss';

interface historyAuctionType{
  round?: number
  consultPrice?: number
  court?: string
  currentPrice?: number
  initialPrice?: number
  start?: string
  status?: number
  title?: string
  url?: string
}

type IProps = {
}

type IState = {
  detail: {
    title: string
    status: number
    consultPrice: number
    initialPrice: number
    start: Date | number
    valueLevel: number
    obligorName: string
    remark: string
    important: number
    mobile: []
    court: string
    liaisonPerson: string
    url: string
    historyAuction: historyAuctionType[]
  }
};

export default class AssetsDetail extends Component <IProps, IState>{
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

  navigateToConfirmation = () => {
    const { detail } = this.state;
    Taro.navigateTo({
      url: '/subpackage/pages/monitor/asset-auction/confirmation/index',
      success: function(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { ...detail})
      }
    })
  };

  onCopyClick = (val) => {
    Taro.setClipboardData({
      data : val.toString(),
      success : function () {
        Taro.showToast({
          title : '链接已复制，请至浏览器打开',
          icon  : 'none'
        });
      }
    });
  };

  handleMakeCall = (mobile) => {
    Taro.makePhoneCall({
      phoneNumber: mobile
    })
  };


  render () {
    const { detail } = this.state;
    const mobile = detail.mobile || [];
    console.log('detail === ', detail);
    return (
      <View className='detail'>
        <NavigationBar border title='拍卖详情'/>
        {/*拍卖详情*/}
        <View className='detail-info'>
          <View className='detail-info-title'>{detail.title}</View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>当前状态</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>{getAuctionStatus(detail.status)}</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>评估价</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>{`${detail.consultPrice > 0 ? floatFormat(detail.consultPrice) + '元' : '--'}`}</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>起拍价</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>{`${detail.initialPrice > 0 ? floatFormat(detail.initialPrice) + '元' : '--'}`}</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>开拍时间</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>{dateToFormat(detail.start, 'YYYY-MM-DD HH:mm:ss')}</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>处置单位</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>{detail.court || '--'}</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>联系人</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>{detail.liaisonPerson || '--'}</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>联系电话</View>
            <View className='detail-info-item-colon'>：</View>
            <View className={`'detail-info-item-value ${mobile.length > 0 ? 'link' : ''}'`}>
              {
                mobile.length > 0 ? mobile.map((item, index) => {
                  return <View onClick={() => this.handleMakeCall(item)}>{item}{index < mobile.length - 1 ? '、' : ''}</View>
                }) : '--'
              }
            </View>
          </View>
          {
            detail.url && <View className='detail-info-item'>
	            <View className='detail-info-item-label'>源链接</View>
	            <View className='detail-info-item-colon'>：</View>
	            <View className='detail-info-item-value-other link' onClick={() => this.onCopyClick(`${detail.url}`)}>
		            <Text className='detail-info-item-value-other-url'>{detail.url}</Text>
		            <Text className='iconfont icon-copy detail-info-item-value-icon' />
	            </View>
            </View>
          }
        </View>

        {/*竞买公告*/}
        <View className='detail-other'>
          {/*<View className='detail-other-item'>*/}
          {/*  <View className='detail-other-item-text'>竞买公告</View>*/}
          {/*  <View className='detail-other-item-icon'>*/}
          {/*    <Text className='iconfont icon-right-arrow detail-other-item-icon-logo'/>*/}
          {/*  </View>*/}
          {/*</View>*/}
          <View className='detail-other-item' onClick={this.navigateToConfirmation}>
            <View className='detail-other-item-text'>竞价成功确认书</View>
            <Text className='iconfont icon-right-arrow detail-other-item-icon'/>
          </View>
        </View>
        {/*标的物介绍*/}
        {/*<View className='detail-other'>*/}
        {/*  <View className='detail-other-item'>*/}
        {/*    <View className='detail-other-item-text'>标的物介绍</View>*/}
        {/*  </View>*/}
        {/*</View>*/}

      </View>
    )
  }
}
