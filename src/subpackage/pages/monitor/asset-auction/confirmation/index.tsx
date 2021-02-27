import React, { Component } from 'react';
import { View } from '@tarojs/components';
import NavigationBar from "../../../../../components/navigation-bar"
import './index.scss';

type IProps = {
}

type IState = {

};


export default class Confirmation extends Component <IProps, IState>{

  render () {
    return (
      <View className='confirmation'>
        <NavigationBar border title='竞价成功确认书'/>
        <View className='confirmation-content'>
          <View className='confirmation-content-title'>网络竞价成功确认书</View>
          <View className='confirmation-content-info'>
            <View className='confirmation-content-info-label'>处置单位</View>
            <View className='confirmation-content-info-colon'>：</View>
            <View className='confirmation-content-info-text'>杭州市萧山区人民法院</View>
          </View>
          <View className='confirmation-content-info'>
            <View className='confirmation-content-info-label'>标的物名称</View>
            <View className='confirmation-content-info-colon'>：</View>
            <View className='confirmation-content-info-text'>位于桐庐县桐君街道富欧·罗兰公寓15幢车4室的房产</View>
          </View>
          <View className='confirmation-content-info'>
            <View className='confirmation-content-info-label'>标的物网拍链接</View>
            <View className='confirmation-content-info-colon'>：</View>
            <View className='confirmation-content-info-text'>https://sf-item.taobao.com/sf_84401.htm</View>
          </View>
          <View className='confirmation-content-info'>
            <View className='confirmation-content-info-label'>网拍公告时间</View>
            <View className='confirmation-content-info-colon'>：</View>
            <View className='confirmation-content-info-text'>2020/10/09 16:17:37</View>
          </View>
          <View className='confirmation-content-info'>
            <View className='confirmation-content-info-label'>网拍开始时间</View>
            <View className='confirmation-content-info-colon'>：</View>
            <View className='confirmation-content-info-text'>2020/10/09 16:17:37</View>
          </View>
          <View className='confirmation-content-info'>
            <View className='confirmation-content-info-label'>网拍结束时间</View>
            <View className='confirmation-content-info-colon'>：</View>
            <View className='confirmation-content-info-text'>2020/10/09 16:17:37</View>
          </View>

        </View>

      </View>
    )
  }
}
