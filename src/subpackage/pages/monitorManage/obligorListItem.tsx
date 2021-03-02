import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Text, View, Image} from '@tarojs/components'
import './index.scss'
import LogoImg from '../../../assets/img/monitorManage/monitorManage_logo.png';
import {Message} from '../../../utils/tools/common'

type isState = {
  curData: any
}
@connect(({monitorManage}) => ({monitorManage}))
export default class ObligorListItem extends Component<any, isState> {

  constructor(props) {
    super(props);
    console.log('super', this.props)
    this.state = {
      curData: [],
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

  onPushStateClick = (pushState, id, index) => {
    this.setState({
      curData: this.props.data
    })
    setTimeout(() => {
      const {curData} = this.state;
      console.log('curData', curData)
      const buildData = [...curData];
      if (pushState) {
        this.props.dispatch({
          type: 'monitorManage/getClosePush',
          payload: {idList: [id]}
        }).then((res) => {
          console.log('res', res)
          const {code} = res;
          if (code === 200) {
            buildData[index].pushState = 0;
            this.setState({
              curData: [...buildData]
            })
            Message('取消监控成功')
          } else {
            Message(res.message)
          }
        }).catch(() => {
          Message('网络异常请稍后再试！')
        })
      } else {
        this.props.dispatch({
          type: 'monitorManage/getOpenPush',
          payload: {idList: [id]}
        }).then((res) => {
          console.log('res', res)
          const {code} = res;
          if (code === 200) {
            buildData[index].pushState = 1;
            this.setState({
              curData: [...buildData]
            })
            Message('添加监控成功')
          } else {
            Message(res.message)
          }
        }).catch(() => {
          Message('网络异常请稍后再试！')
        })
      }
    })
  }


  render() {
    const {data, type} = this.props;
    const handleRole = {
      1: '借款人',
      2: '担保人',
      3: '抵质押人',
      4: '共借人'
    }
    return (
      <View>
        {
          data && data.length > 0 && data.map((i, index) => {
            return (
              <View>
                <View className='yc-monitorManage-bottom-content'>
                  {
                    type === 'obligor' ?
                      <View className='yc-monitorManage-bottom-content-img'>
                        <Image src={LogoImg} className='yc-monitorManage-bottom-content-img-image'/>
                      </View> :
                      <View className='yc-monitorManage-bottom-content-relationImg' style={{
                        background: i.role === 1 ? '#FF3B30' : i.role === 4 ? '#FF8F1F' : '#0979E6',
                        lineHeight: '80rpx'
                      }}>
                        <View
                          className={i.role === 3 ? 'yc-monitorManage-bottom-content-relationImg-roleTextTemp' :'yc-monitorManage-bottom-content-relationImg-roleText'}
                        >{handleRole[i.role] ? handleRole[i.role] : '未知'}</View>
                      </View>
                  }
                  <View className='yc-monitorManage-bottom-content-baseInfo'>
                    {
                      i.obligorName.length > 4 && i.obligorNumber === '' ?
                        <View className='yc-monitorManage-bottom-content-baseInfo-company'>
                          {i.obligorName}
                        </View> :
                        <View className='yc-monitorManage-bottom-content-baseInfo-personal'>
                          <Text>{i.obligorName}&nbsp;&nbsp;</Text>
                          <Text style={{
                            display: i.obligorName.length === 4 ? 'block' : 'inline-block',
                            marginTop: i.obligorName.length === 4 ? '16rpx' : '0',
                          }}>({i.obligorNumber})</Text>
                        </View>
                    }

                    <View className='yc-monitorManage-bottom-content-baseInfo-bottom'>
                      <View className='yc-monitorManage-bottom-content-baseInfo-bottom-tags'>
                        {
                          i.isBorrower ?
                            <View
                              className='yc-monitorManage-bottom-content-baseInfo-bottom-tags-borrow'>借</View> : null
                        }
                        {
                          i.dishonestStatus ?
                            <View className='yc-monitorManage-bottom-content-baseInfo-bottom-tags-sx'>失信</View> : null
                        }
                        {
                          i.limitHeightStatus ?
                            <View className='yc-monitorManage-bottom-content-baseInfo-bottom-tags-sx'>限高</View> : null
                        }

                        {
                          i.isTable ? <View className='yc-monitorManage-bottom-content-baseInfo-bottom-tags-sx'
                                            style={{
                                              background: '#F5F5F5',
                                              color: '#666666'
                                            }}>{i.regStatus}</View> : null
                        }
                        {
                          i.bankruptcyStatus ? <View className='yc-monitorManage-bottom-content-baseInfo-bottom-tags-sx'
                                                     style={{width: '120rpx'}}>破产重组</View> : null
                        }
                      </View>
                      <View className='yc-monitorManage-bottom-content-baseInfo-bottom-left'>
                        <Text className='yc-monitorManage-bottom-content-baseInfo-bottom-left-text'>资产</Text>
                        <Text
                          className='yc-monitorManage-bottom-content-baseInfo-bottom-left-number'>{i.assetTotal}</Text>
                      </View>
                      <View className='yc-monitorManage-bottom-content-baseInfo-bottom-left'
                            style={{marginLeft: '12rpx'}}>
                        <Text className='yc-monitorManage-bottom-content-baseInfo-bottom-left-text'>风险</Text>
                        <Text className='yc-monitorManage-bottom-content-baseInfo-bottom-left-number'
                              style={{color: '#FF3B30'}}>{i.riskTotal}</Text>
                      </View>
                    </View>
                  </View>
                  <View className='yc-monitorManage-bottom-content-right'>
                    <View
                      className={i.pushState ? 'yc-monitorManage-bottom-content-right-yes' : 'yc-monitorManage-bottom-content-right-no'}
                      onClick={() => {
                        this.onPushStateClick(i.pushState, i.id, index)
                      }}>
                      {
                        i.pushState ?
                          <Text className="iconfont icon-selected yc-monitorManage-bottom-content-right-yesIcon"/> :
                          <Text className="iconfont icon-user_add yc-monitorManage-bottom-content-right-noIcon"/>
                      }
                      {
                        i.pushState ?
                          <Text className='yc-monitorManage-bottom-content-right-yesText'>已监控</Text> :
                          <Text className='yc-monitorManage-bottom-content-right-noText'>加监控</Text>
                      }
                    </View>
                  </View>
                  <View className='yc-monitorManage-bottom-content-line'/>
                </View>
              </View>
            )
          })
        }
          </View>
          )
        }
}
