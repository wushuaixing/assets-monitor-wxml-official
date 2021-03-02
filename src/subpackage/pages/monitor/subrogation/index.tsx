import React, {Component} from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro';
import {View, Text} from '@tarojs/components'
import NavigationBar from "../../../../components/navigation-bar";
import './index.scss'


type IProps = {}

type IState = {
  type: string,
};


export default class Subrogation extends Component <IProps, IState> {

  constructor(props) {
    super(props);
    this.state = {
      type: '',
    };
  }

  componentWillMount() {
    const {router: {params: {type}}} = getCurrentInstance();
    this.setState({type})
  }

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


  render() {
    const {type} = this.state;
    const handleType = {
      2: '代位-立案信息',
      3: '代位-开庭信息',
      4: '涉诉-文书信息',
    }
    const dateType = {
      2: '立案',
      3: '开庭'
    }
    return (
      <View className='yc-subrogation'>
        <NavigationBar border title={handleType[type]}/>
        <View className='yc-subrogation-line'/>
        {/*线索分析*/}
        <View className='yc-subrogation-baseInfo'>
          <View className='yc-subrogation-baseInfo-title'>线索分析</View>
          <View className='yc-subrogation-baseInfo-line'/>
          <View className='yc-subrogation-baseInfo-content'>
            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-label'>价值等级：</View>
              <View
                className='yc-subrogation-baseInfo-content-info-value yc-subrogation-baseInfo-content-info-valueStar'>二星</View>
            </View>
            <View className='yc-subrogation-baseInfo-content-line'/>
            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-label'>信息说明：</View>
              <View className='yc-subrogation-baseInfo-content-info-value'>3个月内案由为企业借贷的立案信息</View>
            </View>
          </View>
        </View>

        <View className='yc-subrogation-line'/>

        {/*详细信息*/}
        <View className='yc-subrogation-baseInfo'>
          <View className='yc-subrogation-baseInfo-title'>详细信息</View>
          <View className='yc-subrogation-baseInfo-line'/>
          <View className='yc-subrogation-baseInfo-content'>
            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-label'>原告：</View>
              <View className='yc-subrogation-baseInfo-content-info-value' style={{color: '#0979E6'}}>乐视网信息科技有限公司</View>
            </View>

            <View className='yc-subrogation-baseInfo-content-line'/>

            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-label'>被告：</View>
              <View className='yc-subrogation-baseInfo-content-info-value'>四川震强绿舍建材有限公司，成都川墙星建筑劳务有限公司</View>
            </View>

            <View className='yc-subrogation-baseInfo-line' style={{margin: '24rpx 0'}}/>

            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-justifylabel'>案号</View>
              <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
              <View className='yc-subrogation-baseInfo-content-info-value'>(2020）粤2071执17138号</View>
            </View>

            <View className='yc-subrogation-baseInfo-content-line'/>
            {
              type === '4' ?
                <View>
                  <View className='yc-subrogation-baseInfo-content-info'>
                    <View className='yc-subrogation-baseInfo-content-info-justifylabel'>判决日期</View>
                    <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
                    <View className='yc-subrogation-baseInfo-content-info-value'>2020-11-07</View>
                  </View>
                  <View className='yc-subrogation-baseInfo-content-line'/>
                  <View className='yc-subrogation-baseInfo-content-info'>
                    <View className='yc-subrogation-baseInfo-content-info-justifylabel'>发布日期</View>
                    <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
                    <View className='yc-subrogation-baseInfo-content-info-value'>2020-11-07</View>
                  </View>
                </View> :
                <View className='yc-subrogation-baseInfo-content-info'>
                  <View className='yc-subrogation-baseInfo-content-info-justifylabel'>{dateType[type]}日期</View>
                  <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
                  <View className='yc-subrogation-baseInfo-content-info-value'>2020-11-07</View>
                </View>
            }


            <View className='yc-subrogation-baseInfo-content-line'/>

            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-justifylabel'>案由</View>
              <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
              <View className='yc-subrogation-baseInfo-content-info-value'>企业借贷</View>
            </View>

            <View className='yc-subrogation-baseInfo-content-line'/>

            {
              type !== '3' ?
                <View className='yc-subrogation-baseInfo-content-info'>
                  <View className='yc-subrogation-baseInfo-content-info-justifylabel'>案件类型</View>
                  <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
                  <View className='yc-subrogation-baseInfo-content-info-value'>执行案件</View>
                </View>
                : null
            }

            <View className='yc-subrogation-baseInfo-content-line'/>

            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-justifylabel'>法院</View>
              <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
              <View className='yc-subrogation-baseInfo-content-info-value'>九江市中级人民法院</View>
            </View>

          </View>

          <View className='yc-subrogation-baseInfo-line' style={{marginTop: '24rpx'}}/>

          {
            type === '4' ?
              <View>
                <View className='yc-subrogation-baseInfo-content'>
                  <View className='yc-subrogation-baseInfo-content-info'>
                    <View className='yc-subrogation-baseInfo-content-info-label'>判决结果：</View>
                    <View className='yc-subrogation-baseInfo-content-info-value'>本案按枣庄矿业集团中兴建安工程有限公司撤回起诉处理。</View>
                  </View>
                </View>
                <View className='yc-subrogation-baseInfo-line' style={{marginTop: '24rpx'}}/>
              </View> : null
          }

          <View className='yc-subrogation-baseInfo-content'>
            <View className='yc-subrogation-baseInfo-content-info'>
              <View
                className='yc-subrogation-baseInfo-content-info-label yc-subrogation-baseInfo-content-info-sourceLinkLabel'>源链接：</View>
              <View onClick={()=>{this.onCopyClick('https://www.baidu.com')}}>
                <View className='yc-subrogation-baseInfo-content-info-value'
                      style={{color: '#0979E6',display:'inline-block'}}>www.baidu.com</View>
                <Text className='iconfont icon-copy yc-subrogation-baseInfo-content-info-copyIcon'/>
              </View>
              <View className='yc-subrogation-baseInfo-content-info-label' style={{marginLeft: 'auto'}}>（来源：诉讼网）</View>
            </View>
          </View>

        </View>

      </View>
    )
  }
}
