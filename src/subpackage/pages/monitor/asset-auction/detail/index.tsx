import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import NavigationBar from "../../../../../components/navigation-bar"
import './index.scss';

type IProps = {
}

type IState = {

};


export default class AssetsDetail extends Component <IProps, IState>{

  navigateToConfirmation = () => {
    Taro.navigateTo({
      url: '/subpackage/pages/monitor/asset-auction/confirmation/index'
    })
  };

  render () {
    return (
      <View className='detail'>
        <NavigationBar border title='拍卖详情'/>
        {/*拍卖详情*/}
        <View className='detail-info'>
          <View className='detail-info-title'>【二拍】(破) 浙AD6U68的别克小型普通客车的别克小型普通客车</View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>当前状态</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>即将开始</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>联系电话</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>0755-86608300</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>评估价</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>100,000元</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>起拍价</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>500,000元</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>开拍时间</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>2020-03-25 10:00</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>处置单位</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>江苏省无锡市惠山区人民法院</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>联系人</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value'>同伦拍拍科技服务有限公司</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>联系电话</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value link'>0755-86608300、0755-86608300</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>源链接</View>
            <View className='detail-info-item-colon'>：</View>
            <View className='detail-info-item-value link'>
              <Text >www.baidu.com</Text>
              <Text className='iconfont icon-copy detail-info-item-value-icon' />
            </View>
          </View>
        </View>

        {/*竞买公告*/}
        <View className='detail-other'>
          <View className='detail-other-item'>
            <View className='detail-other-item-text'>竞买公告</View>
            <View className='detail-other-item-icon'>
              <Text className='iconfont icon-right-arrow detail-other-item-icon-logo'/>
            </View>
          </View>
          <View className='detail-other-line'/>
          <View className='detail-other-item' onClick={this.navigateToConfirmation}>
            <View className='detail-other-item-text'>竞价成功确认书</View>
            <View className='detail-other-item-icon'>
              <Text className='iconfont icon-right-arrow detail-other-item-icon-logo'/>
            </View>
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
