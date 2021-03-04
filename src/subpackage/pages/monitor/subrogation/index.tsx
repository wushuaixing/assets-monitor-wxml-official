import React, {Component} from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro';
import {View, Text} from '@tarojs/components'
import NavigationBar from "../../../../components/navigation-bar";
import './index.scss'
import {dateToFormat} from "../../../../utils/tools/common";


type IProps = {}

type IState = {
  detail: {
    parties:any,
    informationExplain:string,
    valueLevel:number,
    caseNumber:string,
    gmtJudgment:any,
    gmtPublish:any,
    gmtRegister:any,
    caseReason:string,
    caseType:number,
    court:string,
    url:string,
    gmtTrial:any,
    dataType:number,
  }
};


export default class Subrogation extends Component <IProps, IState> {
  // $instance = getCurrentInstance();
  constructor(props) {
    super(props);
    this.state = {
      detail: {}
    };
  }


  onLoad(option){
    console.log('onLoad===')
    const _this = Taro.getCurrentInstance().page;
    const eventChannel = _this.getOpenerEventChannel();
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', (detail) => {
      console.log('detail',detail)
      this.handleState(detail)})
  }

  handleState = (detail) => {
    this.setState({
      detail: detail
    });
  };

  onCopyClick = (val) => {
    if (val) {
      Taro.setClipboardData({
        data: val.toString(),
        success: function () {
          Taro.showToast({
            title: '链接已复制，请至浏览器打开',
            icon: 'none'
          });
        }
      });
    }
  }


  render() {
    const {detail} = this.state;
    const handleType = {
      2: '代位-立案信息',
      3: '代位-开庭信息',
      4: '涉诉-文书信息',
    }
    const dateType = {
      2: '立案',
      3: '开庭',
    }
    const levelType = {
      60: '1星',
      80: '2星',
      90: '3星'
    }
    const caseType = {
      1: '普通',
      2: '破产',
      3: '执行',
      4: '终本'
    }
    const plaintiffData = detail && detail.parties && detail.parties.filter(i => i.obligorId > 0 && i.roleType === 1); // 原告
    const handlePlaintiffData = plaintiffData && plaintiffData.map(i => {
      return i.name
    })
    const defendantData = detail && detail.parties && detail.parties.filter(i => i.roleType === 2); // 被告
    const handleDefendantData = defendantData && defendantData.map(i => {
      return i.name
    })
    return (
      <View className='yc-subrogation'>
        <NavigationBar border title={handleType[detail.dataType]}/>
        <View className='yc-subrogation-line'/>
        {/*线索分析*/}
        <View className='yc-subrogation-baseInfo'>
          <View className='yc-subrogation-baseInfo-title'>线索分析</View>
          <View className='yc-subrogation-baseInfo-line'/>
          <View className='yc-subrogation-baseInfo-content'>
            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-label'>价值等级：</View>
              <View
                className='yc-subrogation-baseInfo-content-info-value yc-subrogation-baseInfo-content-info-valueStar'>{levelType[detail.valueLevel] || '-'}</View>
            </View>
            <View className='yc-subrogation-baseInfo-content-line'/>
            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-label'>信息说明：</View>
              <View className='yc-subrogation-baseInfo-content-info-value'>{detail.informationExplain || '-'}</View>
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
              <View className='yc-subrogation-baseInfo-content-info-value'
                    style={{color: handleDefendantData && handlePlaintiffData.join('，') ? '#0979E6' : '#666666'}}>{handleDefendantData && handlePlaintiffData.join('，') || '-'}</View>
            </View>

            <View className='yc-subrogation-baseInfo-content-line'/>

            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-label'>被告：</View>
              <View className='yc-subrogation-baseInfo-content-info-value'>{handleDefendantData && handleDefendantData.join('，') || '-'}</View>
            </View>

            <View className='yc-subrogation-baseInfo-line' style={{margin: '24rpx 0'}}/>

            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-justifylabel'>案号</View>
              <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
              <View className='yc-subrogation-baseInfo-content-info-value'>{detail.caseNumber || '-'}</View>
            </View>

            <View className='yc-subrogation-baseInfo-content-line'/>
            {
              detail.dataType === 4 ?
                <View>
                  <View className='yc-subrogation-baseInfo-content-info'>
                    <View className='yc-subrogation-baseInfo-content-info-justifylabel'>判决日期</View>
                    <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
                    <View
                      className='yc-subrogation-baseInfo-content-info-value'>{dateToFormat(detail.gmtJudgment, 'YYYY-MM-DD') || '-'}</View>
                  </View>
                  <View className='yc-subrogation-baseInfo-content-line'/>
                  <View className='yc-subrogation-baseInfo-content-info'>
                    <View className='yc-subrogation-baseInfo-content-info-justifylabel'>发布日期</View>
                    <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
                    <View
                      className='yc-subrogation-baseInfo-content-info-value'>{dateToFormat(detail.gmtPublish, 'YYYY-MM-DD') || '-'}</View>
                  </View>
                </View> :
                <View className='yc-subrogation-baseInfo-content-info'>
                  <View className='yc-subrogation-baseInfo-content-info-justifylabel'>{dateType[detail.dataType]}日期</View>
                  <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
                  <View
                    className='yc-subrogation-baseInfo-content-info-value'>{detail.dataType === 2 ? dateToFormat(detail.gmtRegister, 'YYYY-MM-DD') : detail.dataType === 3 ? dateToFormat(detail.gmtTrial, 'YYYY-MM-DD') : '-'}</View>
                </View>
            }


            <View className='yc-subrogation-baseInfo-content-line'/>

            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-justifylabel'>案由</View>
              <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
              <View className='yc-subrogation-baseInfo-content-info-value'>{detail.caseReason || '-'}</View>
            </View>

            <View className='yc-subrogation-baseInfo-content-line'/>

            {
              detail.dataType !== 3 ?
                <View className='yc-subrogation-baseInfo-content-info'>
                  <View className='yc-subrogation-baseInfo-content-info-justifylabel'>案件类型</View>
                  <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
                  <View
                    className='yc-subrogation-baseInfo-content-info-value'>{caseType[detail.caseType] ? `${caseType[detail.caseType]}案件` : '-'}</View>
                </View>
                : null
            }

            <View className='yc-subrogation-baseInfo-content-line'/>

            <View className='yc-subrogation-baseInfo-content-info'>
              <View className='yc-subrogation-baseInfo-content-info-justifylabel'>法院</View>
              <View className='yc-subrogation-baseInfo-content-info-colon'>：</View>
              <View className='yc-subrogation-baseInfo-content-info-value'>{detail.court || '-'}</View>
            </View>

          </View>

          <View className='yc-subrogation-baseInfo-line' style={{marginTop: '24rpx'}}/>

          {/*{*/}
          {/*  detail.dataType === 4 ?*/}
          {/*    <View>*/}
          {/*      <View className='yc-subrogation-baseInfo-content'>*/}
          {/*        <View className='yc-subrogation-baseInfo-content-info'>*/}
          {/*          <View className='yc-subrogation-baseInfo-content-info-label'>判决结果：</View>*/}
          {/*          <View className='yc-subrogation-baseInfo-content-info-value'>本案按枣庄矿业集团中兴建安工程有限公司撤回起诉处理。</View>*/}
          {/*        </View>*/}
          {/*      </View>*/}
          {/*      <View className='yc-subrogation-baseInfo-line' style={{marginTop: '24rpx'}}/>*/}
          {/*    </View> : null*/}
          {/*}*/}

          <View className='yc-subrogation-baseInfo-content'>
            <View className='yc-subrogation-baseInfo-content-info'>
              <View
                className='yc-subrogation-baseInfo-content-info-label yc-subrogation-baseInfo-content-info-sourceLinkLabel'>源链接：</View>
              <View onClick={() => {
                this.onCopyClick(detail.url)
              }}>
                <View className='yc-subrogation-baseInfo-content-info-value'
                      style={{color: detail.url ? '#0979E6' : '#666666', display: 'inline-block'}}>{detail.url || '-'}</View>
                {
                  detail.url ? <Text className='iconfont icon-copy yc-subrogation-baseInfo-content-info-copyIcon'/> : null
                }

              </View>
              {/*<View className='yc-subrogation-baseInfo-content-info-label' style={{marginLeft: 'auto'}}>（来源：诉讼网）</View>*/}
            </View>
          </View>

        </View>

      </View>
    )
  }
}
