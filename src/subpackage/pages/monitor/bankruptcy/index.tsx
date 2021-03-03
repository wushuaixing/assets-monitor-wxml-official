import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import moment from "moment";
import {View, Text} from '@tarojs/components'
import NavigationBar from "../../../../components/navigation-bar";
import { getAuctionStatus, getLevel } from '../../../../components/list-item/config';
import { floatFormat } from '../../../../utils/tools/common';
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
    start: Date
    valueLevel: number
    obligorName: string
    remark: string
    important: number
    historyAuction: historyAuctionType[]
  }
};


export default class Bankruptcy extends Component <IProps, IState>{
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
    Taro.navigateTo({
      url: '/subpackage/pages/monitor/asset-auction/detail/index'
    })
  };

  onCopyClick = (val) =>{
    Taro.setClipboardData({
      data    : val.toString(),
      success : function () {
        Taro.showToast({
          title : '链接已复制，请至浏览器打开',
          icon  : 'none'
        });
      }
    });
  }

  render () {
    const { detail } = this.state;
    return (
      <View className='bankruptcy'>
        <NavigationBar border title='破产立案'/>
        {/*线索分析*/}
        <View className='bankruptcy-baseInfo'>
          <View className='bankruptcy-baseInfo-title'>线索分析</View>
          <View className='bankruptcy-baseInfo-line'/>
          <View className='bankruptcy-baseInfo-content'>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-label'>价值等级：</View>
              <View
                className='bankruptcy-baseInfo-content-info-value bankruptcy-baseInfo-content-info-valueStar'>{getLevel(2, 90)}</View>
            </View>
            <View className='bankruptcy-baseInfo-content-line'/>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-label'>信息说明：</View>
              <View className='bankruptcy-baseInfo-content-info-value'>3个月内案由为企业借贷的立案信息</View>
            </View>
          </View>
        </View>

        {/*/!*详细信息*!/*/}
        {/*<View className='bankruptcy-baseInfo'>*/}
        {/*  <View className='bankruptcy-baseInfo-title'>详细信息</View>*/}
        {/*  <View className='bankruptcy-baseInfo-line'/>*/}
        {/*  /!*{*!/*/}
        {/*  /!*  detail.bankruptcyType === 1 ? <View>*!/*/}

        {/*  /!*  </View>*!/*/}
        {/*  /!*}*!/*/}
        {/*  <View className='bankruptcy-baseInfo-content'>*/}
        {/*    <View className='bankruptcy-baseInfo-content-info'>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-justifylabel'>被申请人</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-value' style={{color: '#0979E6'}}>乐视网信息科技有限公司</View>*/}
        {/*    </View>*/}
        {/*    <View className='bankruptcy-baseInfo-content-line'/>*/}
        {/*    <View className='bankruptcy-baseInfo-content-info'>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-justifylabel'>申请人</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-value'>四川震强绿舍建材有限公司，成都川墙星建筑劳务有限公司</View>*/}
        {/*    </View>*/}
        {/*    <View className='bankruptcy-baseInfo-line' style={{margin: '24rpx 0'}}/>*/}

        {/*    <View className='bankruptcy-baseInfo-content-info'>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-justifylabel'>信息类别</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-value'>破产立案</View>*/}
        {/*    </View>*/}
        {/*    <View className='bankruptcy-baseInfo-content-info'>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-justifylabel'>发布日期</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-value'>2020-11-07</View>*/}
        {/*    </View>*/}
        {/*    <View className='bankruptcy-baseInfo-content-info'>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-justifylabel'>案号</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-value'>(2020）粤2071执17138号</View>*/}
        {/*    </View>*/}
        {/*    <View className='bankruptcy-baseInfo-content-info'>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-justifylabel'>经办法院</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-value'>(2020）粤2071执17138号</View>*/}
        {/*    </View>*/}
        {/*    <View className='bankruptcy-baseInfo-content-info'>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-justifylabel'>经办法院</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-value'>(2020）粤2071执17138号</View>*/}
        {/*    </View>*/}
        {/*    <View className='bankruptcy-baseInfo-content-info'>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-label'>管理人机构：</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-value'>江苏烨泰玻璃有限公司</View>*/}
        {/*    </View>*/}
        {/*    <View className='bankruptcy-baseInfo-content-info'>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-label'>管理人主要负责人：</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-value'>(2020）粤2071执17138号</View>*/}
        {/*    </View>*/}
        {/*    <View className='bankruptcy-baseInfo-content-line'/>*/}
        {/*    <View className='bankruptcy-baseInfo-content-info'>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-justifylabel'>判决结果</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-value'>*/}
        {/*        本案按枣庄矿业集团中兴建安工程有限公司撤回起诉处理。*/}
        {/*      </View>*/}
        {/*    </View>*/}
        {/*    <View className='bankruptcy-baseInfo-content-line'/>*/}
        {/*  </View>*/}

        {/*  <View className='bankruptcy-baseInfo-line' />*/}

        {/*  <View className='bankruptcy-baseInfo-content'>*/}
        {/*    <View className='bankruptcy-baseInfo-content-info'>*/}
        {/*      <View*/}
        {/*        className='bankruptcy-baseInfo-content-info-label bankruptcy-baseInfo-content-info-sourceLinkLabel'>源链接：</View>*/}
        {/*      <View onClick={()=>{this.onCopyClick('https://www.baidu.com')}}>*/}
        {/*        <View className='bankruptcy-baseInfo-content-info-value'*/}
        {/*              style={{color: '#0979E6',display:'inline-block'}}>www.baidu.com</View>*/}
        {/*        <Text className='iconfont icon-copy bankruptcy-baseInfo-content-info-copyIcon'/>*/}
        {/*      </View>*/}
        {/*      <View className='bankruptcy-baseInfo-content-info-label' style={{marginLeft: 'auto'}}>（来源：诉讼网）</View>*/}
        {/*    </View>*/}
        {/*  </View>*/}

        {/*</View>*/}

        {/*详细信息*/}
        <View className='bankruptcy-baseInfo'>
          <View className='bankruptcy-baseInfo-title'>详细信息</View>
          <View className='bankruptcy-baseInfo-line'/>
          <View className='bankruptcy-baseInfo-content'>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-justifylabel'>信息类别</View>
              <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
              <View className='bankruptcy-baseInfo-content-info-value' style={{color: '#0979E6'}}>乐视网信息科技有限公司</View>
            </View>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-justifylabel'>公开日期</View>
              <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
              <View className='bankruptcy-baseInfo-content-info-value'>四川震强绿舍建材有限公司，成都川墙星建筑劳务有限公司</View>
            </View>
            <View className='bankruptcy-baseInfo-line' style={{margin: '24rpx 0'}}/>

            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-justifylabel'>标题</View>
              <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
              <View className='bankruptcy-baseInfo-content-info-value'>
                东营市佳昊化工有限责任公司第二次债权人会议公告
                <View className='bankruptcy-baseInfo-content-info-value link'>查看文书详情 </View>
              </View>
            </View>
          </View>
        </View>

        <View className='bankruptcy-baseInfo'>
          <View className='bankruptcy-baseInfo-title'>关联案件</View>
          <View className='bankruptcy-baseInfo-line'/>
          <View className='bankruptcy-baseInfo-content'>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-justifylabel'>案号</View>
              <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
              <View className='bankruptcy-baseInfo-content-info-value' >2020-11-07</View>
            </View>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-justifylabel'>发布日期</View>
              <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
              <View className='bankruptcy-baseInfo-content-info-value'>2020-11-07</View>
            </View>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-justifylabel'>经办法院</View>
              <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
              <View className='bankruptcy-baseInfo-content-info-value'>九江市中级人民法院</View>
            </View>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-label'>管理人机构：</View>
              <View className='bankruptcy-baseInfo-content-info-value'>江苏烨泰玻璃有限公司</View>
            </View>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-label'>管理人主要负责人：</View>
              <View className='bankruptcy-baseInfo-content-info-value'>孙瑞玺</View>
            </View>
          </View>
          <View className='bankruptcy-baseInfo-line'/>
          <View className='bankruptcy-baseInfo-content'>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-justifylabel'>被申请人</View>
              <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
              <View className='bankruptcy-baseInfo-content-info-value' >2020-11-07</View>
            </View>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-justifylabel'>申请人</View>
              <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
              <View className='bankruptcy-baseInfo-content-info-value'>2020-11-07</View>
            </View>
          </View>

          <View className='bankruptcy-baseInfo-content'>
            <View className='bankruptcy-baseInfo-content-info'>
              <View
                className='bankruptcy-baseInfo-content-info-label bankruptcy-baseInfo-content-info-sourceLinkLabel'>源链接：</View>
              <View onClick={()=>{this.onCopyClick('https://www.baidu.com')}}>
                <View className='bankruptcy-baseInfo-content-info-value'
                      style={{color: '#0979E6',display:'inline-block'}}>www.baidu.com</View>
                <Text className='iconfont icon-copy bankruptcy-baseInfo-content-info-copyIcon'/>
              </View>
              <View className='bankruptcy-baseInfo-content-info-label' style={{marginLeft: 'auto'}}>（来源：诉讼网）</View>
            </View>
          </View>

        </View>

      </View>
    )
  }
}
