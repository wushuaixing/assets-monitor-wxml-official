import React, { Component } from 'react'
import {View, Text, Image} from '@tarojs/components'
import NavigationBar from "../../../../components/navigation-bar";
import './index.scss'


type IProps = {
}

type IState = {
  current: number
  isScroll?: boolean
};


export default class AssetsAuction extends Component <IProps, IState>{

  render () {
    return (
      <View className='auction'>
        <NavigationBar border title='资产拍卖'/>
        <View className='auction-clues'>
          <View className='auction-clues-title'>线索分析</View>
          <View className='auction-clues-line'/>
          <View className='auction-clues-content'>
            <View className='auction-clues-content-info'>
              <View className='auction-clues-content-info-label'>价值等级：</View>
              <View className='auction-clues-content-info-value blod'>三星</View>
            </View>
            <View className='auction-clues-content-info'>
              <View className='auction-clues-content-info-label'>资产所有人：</View>
              <View className='auction-clues-content-info-value link'>乐视网信息科技有限公司</View>
            </View>
            <View className='auction-clues-content-info'>
              <View className='auction-clues-content-info-label'>审核备注：</View>
              <View className='auction-clues-content-info-text'>
                2020-08-28 18:17
                经裁判文书分析，债务人被他行起诉，涉诉债权额149万，但债务人资产拍卖总额为294.5万，成交金额超过债权额145.5万，
                贵行可以进一步核实是否有可分配的余值,详情见
                <Text className='auction-clues-content-info-text-link'>文书链接1。</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
