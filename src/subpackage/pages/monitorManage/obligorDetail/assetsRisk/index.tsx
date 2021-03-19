import React, {Component} from 'react'
import {Text, View} from '@tarojs/components'
import './index.scss'
import {AtTabs} from 'taro-ui'

type isState = {
  current: number,
}
export default class AssetsRisk extends Component<any, isState> {

  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  handleClick = (value) => {
    this.setState({
      current: value
    })
  }


  render() {
    const tabList = [
      {title: '资产线索', id: 1},
      {title: '风险信息', id: 2},
    ];
    const {obligorNature, assetsArr, riskArr} = this.props;
    const {current} = this.state;
    const buildData = current ? riskArr : assetsArr;
    const infoText = current ? '司法风险' : '诉讼资产';
    const personalShow = (assetsArr && assetsArr.length > 0) || (riskArr && riskArr.length > 0);
    const tabShow = (riskArr && riskArr.length === 0) && (assetsArr && assetsArr.length > 0);
    const personalRiskData = obligorNature === 1 && riskArr && riskArr.length > 0 && riskArr.filter(i=>i.type === 'ss');
    return (
      <View className='assetsRisk'>
        <View className='assetsRisk-content'>
          {
            obligorNature === 2 ? (
              <View>
                {
                  !tabShow ? (
                    <View>
                      <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}
                              className='assetsRisk-content-atTab'/>
                      <View className='assetsRisk-content-companyLine'/>
                    </View>
                  ) : null
                }
                <View className='assetsRisk-content-risk'>
                  <View className='assetsRisk-content-risk-info'>
                    <View className='assetsRisk-content-risk-info-text'>{infoText}</View>
                  </View>
                  <View className='assetsRisk-content-risk-line'>
                    <View className='assetsRisk-content-risk-line-line'/>
                  </View>

                  <View className='assetsRisk-content-risk-content'>
                    {
                      buildData && buildData.length > 0 && buildData.map((i, index) => {
                        return (
                          <View
                            className={`assetsRisk-content-risk-content-info ${index < 2 ? 'assetsRisk-content-risk-content-infoLine' : ''}`}
                            style={{color: i.number === 0 ? '#999999' : '#666666'}}
                          >
                            <View className='assetsRisk-content-risk-content-info-number'>{i.number}</View>
                            <Text className={`iconfont ${i.icon} assetsRisk-content-risk-content-info-icon`}
                                  style={{color: i.number === 0 ? '#CCCCCC' : '#666666'}}
                            />
                            <View className='assetsRisk-content-risk-content-info-text'>{i.title}</View>
                          </View>
                        )
                      })
                    }
                  </View>
                  <View className='assetsRisk-content-risk-content-line'/>
                </View>
              </View>
            ) : null
          }
          {
            obligorNature === 1 && personalShow ? (
              <View>
                {
                  assetsArr && assetsArr.length > 0 ? (
                    <View>
                      <View className='assetsRisk-content-risk'>
                        <View className='assetsRisk-content-risk-info'>
                          <View className='assetsRisk-content-risk-info-text'>诉讼资产</View>
                        </View>
                        <View className='assetsRisk-content-risk-line'>
                          <View className='assetsRisk-content-risk-line-line'/>
                        </View>

                        <View className='assetsRisk-content-risk-content'>
                          {
                            assetsArr && assetsArr.length > 0 && assetsArr.map((i, index) => {
                              return (
                                <View
                                  className={`assetsRisk-content-risk-content-info ${index < 2 ? 'assetsRisk-content-risk-content-infoLine' : ''}`}
                                  style={{color: i.number === 0 ? '#999999' : '#666666'}}
                                >
                                  <View className='assetsRisk-content-risk-content-info-number'>{i.number}</View>
                                  <Text className={`iconfont ${i.icon} assetsRisk-content-risk-content-info-icon`}
                                        style={{color: i.number === 0 ? '#CCCCCC' : '#666666'}}
                                  />
                                  <View className='assetsRisk-content-risk-content-info-text'>{i.title}</View>
                                </View>
                              )
                            })
                          }
                        </View>
                        <View className='assetsRisk-content-risk-content-line'/>
                      </View>
                      <View className='assetsRisk-content-line'/>
                    </View>
                  ) : null
                }
                {
                  personalRiskData && personalRiskData.length > 0 ? (
                    <View className='assetsRisk-content-risk'>
                      <View className='assetsRisk-content-risk-info'>
                        <View className='assetsRisk-content-risk-info-text'>司法风险</View>
                      </View>
                      <View className='assetsRisk-content-risk-line'>
                        <View className='assetsRisk-content-risk-line-line'/>
                      </View>

                      <View className='assetsRisk-content-risk-content'>
                        {
                          personalRiskData && personalRiskData.length > 0 && personalRiskData.map((i, index) => {
                            return (
                              <View
                                className={`assetsRisk-content-risk-content-info ${index < 2 ? 'assetsRisk-content-risk-content-infoLine' : ''}`}
                                style={{color: i.number === 0 ? '#999999' : '#666666'}}
                              >
                                <View className='assetsRisk-content-risk-content-info-number'>{i.number}</View>
                                <Text className={`iconfont ${i.icon} assetsRisk-content-risk-content-info-icon`}
                                      style={{color: i.number === 0 ? '#CCCCCC' : '#666666'}}
                                />
                                <View className='assetsRisk-content-risk-content-info-text'>{i.title}</View>
                              </View>
                            )
                          })
                        }
                      </View>
                      <View className='assetsRisk-content-risk-content-line'/>
                    </View>
                  ) : null
                }
              </View>
            ) : null
          }
        </View>
      </View>
    )
  }
}
