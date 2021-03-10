import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import {View, Text} from '@tarojs/components'
import NavigationBar from "../../../../components/navigation-bar";
import {  getLevel } from '../../../../components/list-item/config';
import { bankruptcyAssociatedCase } from '../../../../services/monitor/bankruptcy/announcement';
import {dateToFormat} from '../../../../utils/tools/common';
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
    url: string
    publishDate?: Date | number
    court: string
    ah: string
    obligorName: string
  }
  associatedCase: {
    title?: string
    court: string
    parties: partiesType[]
    publishDate?: Date | number
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
  };

  handleGetName = (parties?: any = [], field, name, replaceName?: string) => {
    const applicantName = parties.filter(item =>item[field] === name) || [];
    return applicantName.length > 0 ? applicantName.map(item => { return item.name }).join() : (replaceName || '--');
  };

  render () {
    const { detail, associatedCase = {} } = this.state;
    return (
      <View className='bankruptcy'>
        <NavigationBar border title={`${detail.bankruptcyType === 1 ? '破产立案' : '破产公告'}`} />
        {/*线索分析*/}
        <View className='bankruptcy-baseInfo'>
          <View className='bankruptcy-baseInfo-title'>线索分析</View>
          <View className='bankruptcy-baseInfo-line'/>
          <View className='bankruptcy-baseInfo-content'>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-justifylabel'>价值等级</View>
              <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
              <View className={`bankruptcy-baseInfo-content-info-valueStar risk${detail.valueLevel}`}>{getLevel(2, detail.valueLevel)}</View>
            </View>
            <View className='bankruptcy-baseInfo-content-line'/>
            <View className='bankruptcy-baseInfo-content-info'>
              <View className='bankruptcy-baseInfo-content-info-justifylabel'>信息说明</View>
              <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
              <View className='bankruptcy-baseInfo-content-info-value'>{detail.informationExplain}</View>
            </View>
          </View>
        </View>
        {
          detail.bankruptcyType === 1 ? <View className='bankruptcy-baseInfo'>
              <View className='bankruptcy-baseInfo-title'>详细信息</View>
              <View className='bankruptcy-baseInfo-line'/>
              <View className='bankruptcy-baseInfo-content'>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>被申请人</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value link'>{this.handleGetName(detail.parties, 'role', '被申请人', detail.obligorName)}</View>
                </View>
                <View className='bankruptcy-baseInfo-content-line'/>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>申请人</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>{this.handleGetName(detail.parties,'role', '申请人')}</View>
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
                  <View className='bankruptcy-baseInfo-content-info-value'>{dateToFormat(detail.publishDate)}</View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>案号</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>{detail.title}</View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>经办法院</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>{detail.court}</View>
                </View>
              </View>
              {
                detail.url ? <View>
                  <View className='bankruptcy-baseInfo-line' style={{margin: '0 24rpx'}} />
                  <View className='bankruptcy-baseInfo-content'>
                    <View className='bankruptcy-baseInfo-content-info'>
                      <View className='bankruptcy-baseInfo-content-info-justifylabel'>源链接</View>
                      <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                      <View className='bankruptcy-baseInfo-content-info-value link' onClick={()=>{this.onCopyClick(detail.url)}}>
                        <Text className='bankruptcy-baseInfo-content-info-value-url'>{detail.url}</Text>
                        <Text className='iconfont icon-copy bankruptcy-baseInfo-content-info-copyIcon'/>
                      </View>
                      {/*<View className='bankruptcy-baseInfo-content-info-label' style={{marginLeft: 'auto'}}>（来源：诉讼网）</View>*/}
                    </View>
                  </View>
                </View> : null
              }
          </View> : <View>
            <View className='bankruptcy-baseInfo'>
              <View className='bankruptcy-baseInfo-title'>详细信息</View>
              <View className='bankruptcy-baseInfo-line'/>
              <View className='bankruptcy-baseInfo-content'>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>信息类别</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>破产公告</View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>发布日期</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'>{dateToFormat(detail.publishDate)}</View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>标题</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'> {detail.title} </View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>案号</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'> {detail.ah} </View>
                </View>
                <View className='bankruptcy-baseInfo-content-info'>
                  <View className='bankruptcy-baseInfo-content-info-justifylabel'>经办法院</View>
                  <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                  <View className='bankruptcy-baseInfo-content-info-value'> {detail.court} </View>
                </View>
              </View>
              {
                detail.url ? <View>
                  <View className='bankruptcy-baseInfo-line' style={{margin: '0 24rpx'}} />
                  <View className='bankruptcy-baseInfo-content'>
                    <View className='bankruptcy-baseInfo-content-info'>
                      <View className='bankruptcy-baseInfo-content-info-justifylabel'>源链接</View>
                      <View className='bankruptcy-baseInfo-content-info-colon'>：</View>
                      <View className='bankruptcy-baseInfo-content-info-value link' onClick={()=>{this.onCopyClick(detail.url)}}>
                        <Text className='bankruptcy-baseInfo-content-info-value-url'>{detail.url}</Text>
                        <Text className='iconfont icon-copy bankruptcy-baseInfo-content-info-copyIcon'/>
                      </View>
                      {/*<View className='bankruptcy-baseInfo-content-info-label' style={{marginLeft: 'auto'}}>（来源：诉讼网）</View>*/}
                    </View>
                  </View>
                </View> : null
              }
            </View>
            {/*{*/}
            {/*  Object.keys(associatedCase).length > 0 ? <View className='bankruptcy-baseInfo'>*/}
            {/*    <View className='bankruptcy-baseInfo-title'>关联案件</View>*/}
            {/*    <View className='bankruptcy-baseInfo-line'/>*/}
            {/*    <View className='bankruptcy-baseInfo-content'>*/}
            {/*      <View className='bankruptcy-baseInfo-content-info'>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-justifylabel'>案号</View>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-value' >{associatedCase.title}</View>*/}
            {/*      </View>*/}
            {/*      <View className='bankruptcy-baseInfo-content-info'>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-justifylabel'>发布日期</View>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-value'>{floatFormat(associatedCase.publishDate)}</View>*/}
            {/*      </View>*/}
            {/*      <View className='bankruptcy-baseInfo-content-info'>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-justifylabel'>经办法院</View>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-value'>{associatedCase.court}</View>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*    <View className='bankruptcy-baseInfo-line'/>*/}
            {/*    <View className='bankruptcy-baseInfo-content'>*/}
            {/*      <View className='bankruptcy-baseInfo-content-info'>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-justifylabel'>被申请人</View>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-value' >{this.handleGetName(associatedCase.parties,'role', '被申请人')}</View>*/}
            {/*      </View>*/}
            {/*      <View className='bankruptcy-baseInfo-content-info'>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-justifylabel'>申请人</View>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-colon'>：</View>*/}
            {/*        <View className='bankruptcy-baseInfo-content-info-value'>{this.handleGetName(associatedCase.parties,'role', '申请人')}</View>*/}
            {/*      </View>*/}
            {/*    </View>*/}
            {/*  </View> : null*/}
            {/*}*/}
          </View>
        }

      </View>
    )
  }
}
