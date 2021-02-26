import React, { Component } from 'react'
import {View, Text, Image} from '@tarojs/components'
import NavigationBar from "../../../../../components/navigation-bar";


type IProps = {
}

type IState = {
  current: number
  isScroll?: boolean
};


export default class AssetsDetail extends Component <IProps, IState>{

  render () {
    return (
      <View className='detail'>
        <NavigationBar border title='拍卖详情'/>
        <View className='detail-info'>
          <View className='detail-info-title'>【二拍】(破) 浙AD6U68的别克小型普通客车的别克小型普通客车</View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>当前状态：</View>
            <View className='detail-info-item-value'>即将开始</View>
          </View>
          <View className='detail-info-item'>
            <View className='detail-info-item-label'>联系电话：</View>
            <View className='detail-info-item-value'>0755-86608300</View>
          </View>

          <View className='detail-info-item'>
            <View className='detail-info-item-label'>源链接：</View>
            <View className='detail-info-item-value'>www.baidu.com</View>
            <View className='detail-info-item-value'>（来源：阿里拍卖）</View>
          </View>
        </View>
      </View>
    )
  }
}
