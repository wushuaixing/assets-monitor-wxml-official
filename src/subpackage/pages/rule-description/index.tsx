import React, { Component } from 'react';
import { View } from '@tarojs/components'
import NavigationBar from '../../../components/navigation-bar';
import { setGlobalData, getGlobalData } from "../../../utils/const/global";
import './index.scss'

type IProps = {
};

type IState = {
};

export default class RuleDescription extends Component <IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(): void {
    setGlobalData('serviceWeChat', 'BackusHZ');
  }

  render () {
    const wechat = getGlobalData('serviceWeChat');
    return (
      <View className='rule'>
        <NavigationBar title='分级规则说明' />
        <View className='rule-card'>
          <View className='rule-card-title'>我们将资产线索和风险信息进行了等级划分：</View>
          <View className='rule-card-text'>
            1、资产线索的等级是根据线索类型、价值程度、时效性情况分为三星、二星和一星。其中三星的价值程度最高。
          </View>
          <View className='rule-card-text'>
            2、风险信息根据风险类型、时效性、影响的程度分为高风险、警示、提示、利好。
          </View>
          <View className='rule-card-prompt'>具体规则请添加微信客服获取，客服微信号：{wechat}</View>
        </View>
      </View>
    )
  }
}

