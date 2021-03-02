import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import {View, Text} from '@tarojs/components'
import NavigationBar from "../../../../components/navigation-bar";
import './index.scss'

type IProps = {
}

type IState = {
  detail: {}
};


export default class AssetsAuction extends Component <IProps, IState>{
  $instance = getCurrentInstance();
  constructor(props) {
    super(props);
    this.state = {
      detail: {}
    };
  }

  onLoad(option){
    const _this = Taro.getCurrentInstance().page;
    const eventChannel = _this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (detail) => {
        console.log('detail === ', detail);
    })
  }

  navigateToDetail = () => {
    Taro.navigateTo({
      url: '/subpackage/pages/monitor/asset-auction/detail/index'
    })
  };

  render () {
    return (
      <View className='auction'>
        <NavigationBar border title='资产拍卖'/>

        {/*线索分析*/}
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
          <View className='auction-clues-type'>精准匹配</View>
        </View>

        {/*线索详情*/}
        <View className='auction-detail' onClick={this.navigateToDetail}>
          <View className='auction-detail-title'>线索详情</View>
          <View className='auction-detail-line'/>
          <View className='auction-detail-content'>
            <View className='auction-detail-content-title'>【二拍】(破) 浙AD6U68的别克小型普通客车的别克小型普通客车</View>
            <View className='auction-detail-content-info'>
              <View className='auction-detail-content-info-justifylabel'>当前状态</View>
              <View className='auction-detail-content-info-colon'>：</View>
              <View className='auction-detail-content-info-value'>即将开始</View>
            </View>
            <View className='auction-detail-content-info'>
              <View className='auction-detail-content-info-justifylabel'>评估价</View>
              <View className='auction-detail-content-info-colon'>：</View>
              <View className='auction-detail-content-info-value'>100,000元</View>
            </View>
            <View className='auction-clues-content-info'>
              <View className='auction-detail-content-info-justifylabel'>起拍价</View>
              <View className='auction-detail-content-info-colon'>：</View>
              <View className='auction-detail-content-info-value'>500,000元</View>
            </View>
            <View className='auction-clues-content-info'>
              <View className='auction-detail-content-info-justifylabel'>开拍时间</View>
              <View className='auction-detail-content-info-colon'>：</View>
              <View className='auction-detail-content-info-value'>2020-03-25 10:00</View>
            </View>
          </View>
          <View className='auction-detail-arrow' >
            <Text className='iconfont icon-right-arrow auction-detail-arrow-icon'/>
          </View>
        </View>


        {/*历史拍卖*/}
        <View className='auction-history'>
          <View className='auction-history-title'>
            <View className='auction-history-title-left'>历史拍卖</View>
            <View className='auction-history-title-right'>1次</View>
          </View>
          <View className='auction-history-line'/>
          <View className='auction-history-content'>
            <View className='auction-history-content-title'>【二拍】(破) 浙AD6U68的别克小型普通客车的别克小型普通客车</View>
            <View className='auction-history-content-info'>
              <View className='auction-history-content-info-justifylabel'>当前状态</View>
              <View className='auction-history-content-info-colon'>：</View>
              <View className='auction-history-content-info-value'>已流拍</View>
            </View>
            <View className='auction-history-content-info'>
              <View className='auction-history-content-info-justifylabel'>评估价</View>
              <View className='auction-history-content-info-colon'>：</View>
              <View className='auction-history-content-info-value'>100,000元</View>
            </View>
            <View className='auction-history-content-info'>
              <View className='auction-history-content-info-justifylabel'>起拍价</View>
              <View className='auction-history-content-info-colon'>：</View>
              <View className='auction-history-content-info-value'>500,000元</View>
            </View>
            <View className='auction-history-content-info'>
              <View className='auction-history-content-info-justifylabel'>开拍时间</View>
              <View className='auction-history-content-info-colon'>：</View>
              <View className='auction-history-content-info-value'>2020-03-25 10:00</View>
            </View>
          </View>
        </View>

      </View>
    )
  }
}
