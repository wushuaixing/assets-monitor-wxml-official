import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import NavigationBar from "../../../../../components/navigation-bar"
import './index.scss';

type IProps = {
}

type IState = {

};


export default class AnnouncementDetail extends Component <IProps, IState>{

  navigateToConfirmation = () => {
    Taro.navigateTo({
      url: '/subpackage/pages/monitor/asset-auction/confirmation/index'
    })
  };

  render () {
    return (
      <View className='announcement'>
        <NavigationBar border title='拍卖详情'/>


      </View>
    )
  }
}
