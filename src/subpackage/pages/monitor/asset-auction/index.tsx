import React, { Component } from 'react'
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro';
import {View, Text, RichText, ScrollView} from '@tarojs/components'
import NavigationBar from "../../../../components/navigation-bar";
import { getAuctionStatus, getLevel, getAuctionRoleType,getAuctionStatusColor} from '../../../../components/list-item/config';
import { floatFormat, dateToFormat } from '../../../../utils/tools/common';
import {getGlobalData } from "../../../../utils/const/global";
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
    end: Date | number
    approveTime: Date | number
    valueLevel: number
    obligorName: string
    remark: string
    important: number
    roleType: number
    currentPrice: number
    historyAuction: historyAuctionType[]
  }
  scrollHeight: number
};

const Auction = [
  {round:1,title:'标题',status:1,initialPrice:600,start:1585015200,consultPrice:1},
  {round:1,title:'标题',status:1,initialPrice:600,start:1585015200,consultPrice:1},
  {round:1,title:'标题',status:1,initialPrice:600,start:1585015200,consultPrice:1},
]

export default class AssetsAuction extends Component <IProps, IState>{
  $instance = getCurrentInstance();
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      scrollHeight: 0,
    };
  }

  componentWillMount(): void {
    const onReadyEventId = this.$instance.router.onReady;
    eventCenter.once(onReadyEventId, () => {
      Taro.createSelectorQuery().select('#navBar')
        .boundingClientRect()
        .exec(res => {
          console.log('navBar res === ', res);
          let scrollHeight = getGlobalData('screenHeight') - res[0].height;
          this.setState({
            scrollHeight,
          })
        })
    });
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

  // const status = 1-即将开始、3-正在进行、5-已成交、7-已流拍、9-中止、11-撤回
  /**
   即将开始：评估价、起拍价、开拍时间
   正在进行：评估价、起拍价、拍卖结束时间
   已成交：评估价、成交价、拍卖结束时间
   其他状态：评估价、起拍价、开拍时间
   */

  render () {
    const { detail, scrollHeight } = this.state;
    // const historyAuction = detail.historyAuction || [];
    const historyAuction = Auction || [];
    console.log(detail, scrollHeight)
    // const newHistoryAuction = [...example];
    // console.log('height === ', scrollHeight);
    return (
      <View className='auction'>
        <NavigationBar border title='资产拍卖'/>
        <ScrollView scrollY style={{height: scrollHeight }}>
          {/*线索分析*/}
          <View className='auction-clues'>
            <View className='auction-clues-title'>线索分析</View>
            <View className='auction-clues-line'/>
            <View className='auction-clues-content'>
              <View className='auction-clues-content-info'>
                <View className='auction-detail-content-info-justifylabel'>价值等级</View>
                <View className='auction-detail-content-info-colon'>：</View>
                {/*<View className='auction-clues-content-info-value blod'>{getLevel(1, detail.valueLevel)}</View>*/}
                <View className='auction-clues-content-info-value'>
                   <View className='auction-item-header-title-tag-star'>
                      <Text className='iconfont icon-star auction-item-header-title-tag-star-active' />
                      <Text className={`iconfont icon-star auction-item-header-title-tag-star-${detail.valueLevel === 90 || detail.valueLevel === 80 ? `active` : `normal`}`} />
                      <Text className={`iconfont icon-star auction-item-header-title-tag-star-${detail.valueLevel === 90 ? `active` : `normal`}`} />
                    </View>
                </View>
              </View>
              {
                detail.important === 1 && <View className='auction-clues-content-info'>
					        <View className='auction-clues-content-info-label'>{detail.roleType > 0 ? getAuctionRoleType(detail.roleType) : '未知角色'}</View>
					        <View className='auction-detail-content-info-colon'>：</View>
					        <View className='auction-clues-content-info-value link'>{detail.obligorName}</View>
				        </View>
              }
              <View className='auction-clues-content-info'>
                <View className='auction-clues-content-info-label'>审核备注</View>
                <View className='auction-detail-content-info-colon'>：</View>
                <View className='auction-clues-content-info-text'>
                  <View className='auction-clues-content-info-text-time'>{dateToFormat(detail.approveTime, 'YYYY-MM-DD HH:mm')}</View>
                  {
                    detail.remark ? <RichText nodes={detail && detail.remark && detail.remark.replace(
                      /<a/gi,
                      `<a style="font-style: normal; color: #0979E6"`
                    )} /> : '--'
                  }
                </View>
              </View>
            </View>
            <View className={`auction-clues-${detail.important === 1 ? 'accurate' : 'fuzzy'}`}>{detail.important === 1 ? '精准匹配' : '模糊匹配'}</View>
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
                {/*<View className='auction-detail-content-info-value'>{getAuctionStatus(detail.status)}</View>*/}
                <View className='auction-detail-content-info-value' style={{color:getAuctionStatusColor(detail.status).color}}>{getAuctionStatusColor(detail.status).title}</View>
              </View>
              <View className='auction-detail-content-info'>
                <View className='auction-detail-content-info-justifylabel'>评估价</View>
                <View className='auction-detail-content-info-colon'>：</View>
                <View className='auction-detail-content-info-value'>{`${detail.consultPrice ? floatFormat(detail.consultPrice) + '元' : '--'}`}</View>
              </View>
              {
                detail.status === 5 ? <View className='auction-clues-content-info'>
                  <View className='auction-detail-content-info-justifylabel'>成交价</View>
                  <View className='auction-detail-content-info-colon'>：</View>
                  <View className='auction-detail-content-info-value'>{`${detail.currentPrice ?  floatFormat(detail.currentPrice) + '元' : '--'}`}</View>
                </View> : <View className='auction-clues-content-info'>
                  <View className='auction-detail-content-info-justifylabel'>起拍价</View>
                  <View className='auction-detail-content-info-colon'>：</View>
                  <View className='auction-detail-content-info-value'>{`${detail.initialPrice ? floatFormat(detail.initialPrice) + '元' : '--'}`}</View>
                </View>
              }
              {
                detail.status === 3 || detail.status === 5 ? <View className='auction-clues-content-info'>
                  <View className='auction-detail-content-info-label'>拍卖结束时间</View>
                  <View className='auction-detail-content-info-colon'>：</View>
                  <View className='auction-detail-content-info-value'>{dateToFormat(detail.end)}</View>
                </View> : <View className='auction-clues-content-info'>
                  <View className='auction-detail-content-info-label'>开拍时间</View>
                  <View className='auction-detail-content-info-colon'>：</View>
                  <View className='auction-detail-content-info-value'>{dateToFormat(detail.start)}</View>
                </View>
              }
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
                    <View className='auction-history-contents'>
                      <View className='auction-history-contents-wire'></View>
                      <View className='auction-history-contents-info '>
                        <View className='auction-history-contents-info-round'>【一拍】</View>
                        <View className='auction-history-contents-info-dot'></View>
                        <View className='auction-history-contents-info-justifylabel'>开拍时间</View>
                        <View className='auction-history-contents-info-colon'>：</View>
                        <View className='auction-history-contents-info-value'>{dateToFormat(item.start)}</View>
                      </View>
                      <View className='auction-history-contents-info history-side'>
                        <View className='auction-history-contents-info-justifylabel'>当前状态</View>
                        <View className='auction-history-contents-info-colon'>：</View>
                        <View className='auction-history-contents-info-value'>{getAuctionStatus(detail.status)}</View>
                      </View>
                      <View className='auction-history-contents-info history-side'>
                        <View className='auction-history-contents-info-justifylabel'>评估价</View>
                        <View className='auction-history-contents-info-colon'>：</View>
                        <View className='auction-history-contents-info-value'>{`${item.consultPrice > 0 ? floatFormat(item.consultPrice) + '元' : '--'}`}</View>
                      </View>
                      <View className='auction-history-contents-info history-side'>
                        <View className='auction-history-contents-info-justifylabel'>起拍价</View>
                        <View className='auction-history-contents-info-colon'>：</View>
                        <View className='auction-history-contents-info-value'>{`${item.initialPrice > 0 ? floatFormat(item.initialPrice) + '元' : '--'}`}</View>
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
        </ScrollView>
      </View>
    )
  }
}
