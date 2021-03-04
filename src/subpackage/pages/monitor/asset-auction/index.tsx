import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import {View, Text, RichText } from '@tarojs/components'
import NavigationBar from "../../../../components/navigation-bar";
import { getAuctionStatus, getLevel } from '../../../../components/list-item/config';
import { floatFormat, dateToFormat } from '../../../../utils/tools/common';
import './index.scss'

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
    historyAuction: historyAuctionType[]
  }
};

// const example = [
//   { consultPrice: 1000089, court:'人民法院', currentPrice: 89829898, initialPrice: 82983928392, round: 2, start: 1928738737, status:1, title: 'this is title', url: 'www.baidu.com'},
//   { consultPrice: 1000089, court:'人民法院', currentPrice: 89829898, initialPrice: 82983928392, round: 2, start: 1928738737, status:1, title: 'this is title', url: 'www.baidu.com'},
//   { consultPrice: 1000089, court:'人民法院', currentPrice: 89829898, initialPrice: 82983928392, round: 2, start: 1928738737, status:1, title: 'this is title', url: 'www.baidu.com'},
// ];

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
    eventChannel.on('acceptDataFromOpenerPage', (detail) => this.handleState(detail))
  }

  handleState = (detail) => {
    this.setState({
      detail: detail
    });
  };

  navigateToDetail = () => {
    const { detail } = this.state;
    Taro.navigateTo({
      url: '/subpackage/pages/monitor/asset-auction/detail/index',
      success: function(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', { ...detail})
      }
    })
  };

  render () {
    const { detail } = this.state;
    const { historyAuction = [] } = detail;
    // const newHistoryAuction = [...example];
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
              <View className='auction-clues-content-info-value blod'>{getLevel(1, detail.valueLevel)}</View>
            </View>
            <View className='auction-clues-content-info'>
              <View className='auction-clues-content-info-label'>资产所有人：</View>
              <View className='auction-clues-content-info-value link'>{detail.obligorName}</View>
            </View>
            <View className='auction-clues-content-info'>
              <View className='auction-clues-content-info-label'>审核备注：</View>
              <View className='auction-clues-content-info-text'>
                {
                  detail.remark ? <RichText nodes={detail && detail.remark && detail.remark.replace(
                    /<a/gi,
                    `<a style="font-style: normal; color: #0979E6"`
                  )} /> : null
                }
              </View>
            </View>
          </View>
          {
            detail.important === 1 && <View className='auction-clues-type'>精准匹配</View>
          }
        </View>

        {/*线索详情*/}
        <View className='auction-detail' onClick={this.navigateToDetail}>
          <View className='auction-detail-title'>线索详情</View>
          <View className='auction-detail-line'/>
          <View className='auction-detail-content'>
            <View className='auction-detail-content-title'>{detail.title}</View>
            <View className='auction-detail-content-info'>
              <View className='auction-detail-content-info-justifylabel'>当前状态</View>
              <View className='auction-detail-content-info-colon'>：</View>
              <View className='auction-detail-content-info-value'>{getAuctionStatus(detail.status)}</View>
            </View>
            <View className='auction-detail-content-info'>
              <View className='auction-detail-content-info-justifylabel'>评估价</View>
              <View className='auction-detail-content-info-colon'>：</View>
              <View className='auction-detail-content-info-value'>{`${floatFormat(detail.consultPrice)}元`}</View>
            </View>
            <View className='auction-clues-content-info'>
              <View className='auction-detail-content-info-justifylabel'>起拍价</View>
              <View className='auction-detail-content-info-colon'>：</View>
              <View className='auction-detail-content-info-value'>{`${floatFormat(detail.initialPrice)}元`}</View>
            </View>
            <View className='auction-clues-content-info'>
              <View className='auction-detail-content-info-justifylabel'>开拍时间</View>
              <View className='auction-detail-content-info-colon'>：</View>
              <View className='auction-detail-content-info-value'>{dateToFormat(detail.start)}</View>
            </View>
          </View>
          <View className='auction-detail-arrow' >
            <Text className='iconfont icon-right-arrow auction-detail-arrow-icon'/>
          </View>
        </View>


        {/*历史拍卖*/}
        {
          historyAuction.length > 0 && <View className='auction-history'>
	          <View className='auction-history-title'>
		          <View className='auction-history-title-left'>历史拍卖</View>
		          <View className='auction-history-title-right'>{`${historyAuction.length}次`}</View>
	          </View>
            {
              historyAuction.map((item: {round:number, title: string, status: number, initialPrice: number, start: any, consultPrice: number, }) => {
                return (
                  <View className='auction-history-content'>
                    <View className='auction-history-content-title'>【{item.round}】{item.title}</View>
                    <View className='auction-history-content-info'>
                      <View className='auction-history-content-info-justifylabel'>当前状态</View>
                      <View className='auction-history-content-info-colon'>：</View>
                      <View className='auction-history-content-info-value'>{getAuctionStatus(item.status)}</View>
                    </View>
                    <View className='auction-history-content-info'>
                      <View className='auction-history-content-info-justifylabel'>评估价</View>
                      <View className='auction-history-content-info-colon'>：</View>
                      <View className='auction-history-content-info-value'>{`${floatFormat(item.consultPrice)}元`}</View>
                    </View>
                    <View className='auction-history-content-info'>
                      <View className='auction-history-content-info-justifylabel'>起拍价</View>
                      <View className='auction-history-content-info-colon'>：</View>
                      <View className='auction-history-content-info-value'>{`${item.initialPrice > 0 ? floatFormat(item.initialPrice) + '元' : '-'}`}</View>
                    </View>
                    <View className='auction-history-content-info'>
                      <View className='auction-history-content-info-justifylabel'>开拍时间</View>
                      <View className='auction-history-content-info-colon'>：</View>
                      <View className='auction-history-content-info-value'>{dateToFormat(item.start)}</View>
                    </View>
                  </View>
                )
              })
            }
            {/*<View className='auction-history-arrow' >*/}
            {/*  <Text className='iconfont icon-right-arrow auction-history-arrow-icon'/>*/}
            {/*</View>*/}
          </View>
        }
      </View>
    )
  }
}
