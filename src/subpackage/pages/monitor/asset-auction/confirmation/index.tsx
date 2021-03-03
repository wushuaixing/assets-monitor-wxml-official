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
        <View className='confirmation-plan'>
          <View className='confirmation-plan-title'>【网络拍卖竞价结果】</View>
          <View className='confirmation-plan-text'>
            用户姓名陈书韵通过竞买号D4771于2020年11月10日在杭州市萧山区人民法院于阿里拍卖平台开展的“位于桐庐县桐君街道富欧·罗兰公寓15幢车4室的房产”项目公开竞价中，以最高应价胜出。
            该标的网络拍卖成交价格：¥99000（玖万玖仟元）
            在网络拍卖中竞买成功的用户，必须依照标的物《竞买须知》、《竞买公告》要求，按时交付标的物网拍成交余款、办理相关手续。
            标的物最终成交以杭州市萧山区人民法院出具拍卖成交裁定为准。
          </View>
        </View>
      </View>
    )
  }
}
