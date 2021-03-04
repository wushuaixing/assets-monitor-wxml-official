import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import moment from "moment";
import {View, Text} from '@tarojs/components'
import NavigationBar from "../../../../components/navigation-bar";
import { getAuctionStatus, getLevel } from '../../../../components/list-item/config';
import { bankruptcyAssociatedCase } from '../../../../services/monitor/bankruptcy/announcement';
import { floatFormat } from '../../../../utils/tools/common';
import './index.scss'


interface partiesType{
  name: string
  role: string
}
type IProps = {
}

type IState = {
  detail: {
    valueLevel: number
    informationExplain: string
    bankruptcyType: number
    parties: partiesType[]
    createTime?: any
    title?: string
    id: number
  }
  associatedCase: {
    title?: string
  }
};


export default class Bankruptcy extends Component <IProps, IState>{
  $instance = getCurrentInstance();
  constructor(props) {
    super(props);
    this.state = {
      detail: {},
      associatedCase: {},
    };
  }

  onLoad(option){
    const _this = Taro.getCurrentInstance().page;
    const eventChannel = _this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (detail) => this.handleState(detail))
  }

  handleState = (detail) => {
    console.log('detail === ', detail);
    this.setState({
      detail: detail
    });
    this.handleRequestAssociatedCase(detail.id)
  };

  handleRequestAssociatedCase = (id: number) => {
    bankruptcyAssociatedCase({id}).then((res) => {
      if(res.code === 200){
        this.setState({
          associatedCase: res.data
        })
      }
    }).catch()
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
    const { detail, associatedCase } = this.state;
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
                className='bankruptcy-baseInfo-content-info-value bankruptcy-baseInfo-content-info-valueStar'>{getLevel(2, detail.valueLevel)}</View>
            </View>
            <View className='bankruptcy-baseInfo-content-line'/>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-label'>信息说明：</View>
              <View className='bankruptcy-baseInfo-content-info-value'>{detail.informationExplain}</View>
            </View>
          </View>
        </View>

        {
          detail.bankruptcyType === 2 ? <View className='bankruptcy-baseInfo'>
              <View className='bankruptcy-baseInfo-title'>详细信息</View>
              <View className='bankruptcy-baseInfo-line'/>
              <View className='bankruptcy-baseInfo-content'>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>被申请人</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value link'>{detail.parties.filter(item => item.role === '被申请人')[0].name}</View>
                </View>
                <View className='bankruptcy-baseInfo-content-line'/>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>申请人</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>{detail.parties.filter(item => item.role === '申请人')[0].name}</View>
                </View>
                <View className='bankruptcy-baseInfo-line' style={{margin: '24rpx 0'}}/>

                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>信息类别</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>破产立案</View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>发布日期</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>2020-11-07</View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>案号</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>(2020）粤2071执17138号</View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>经办法院</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>(2020）粤2071执17138号</View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>经办法院</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>(2020）粤2071执17138号</View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-label'>管理人机构：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>江苏烨泰玻璃有限公司</View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-label'>管理人主要负责人：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>(2020）粤2071执17138号</View>
                </View>
                <View className='bankruptcy-baseInfo-content-line'/>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>判决结果</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>
                    本案按枣庄矿业集团中兴建安工程有限公司撤回起诉处理。
                  </View>
                </View>
                <View className='bankruptcy-baseInfo-content-line'/>
              </View>
              <View className='bankruptcy-baseInfo-line' />
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
          </View> : <View>
            <View className='bankruptcy-baseInfo'>
              <View className='bankruptcy-baseInfo-title'>详细信息</View>
              <View className='bankruptcy-baseInfo-line'/>
              <View className='bankruptcy-baseInfo-content'>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>信息类别</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value link'>破产公告</View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>公开日期</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>{moment(detail.createTime * 1000).format('YYYY-MM-DD')}</View>
                </View>
                <View className='bankruptcy-baseInfo-line' style={{margin: '24rpx 0'}}/>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>标题</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>
                    {detail.title}
                  </View>
                  <View className='bankruptcy-baseInfo-content-info-value link'>查看文书详情 </View>
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
                  <View className='bankruptcy-baseInfo-content-info-value' >{associatedCase.title}</View>
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
        }

      </View>
    )
  }
}
