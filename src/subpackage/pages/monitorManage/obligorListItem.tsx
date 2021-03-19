import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Text, View, Image} from '@tarojs/components'
import './index.scss'
import LogoImg from '../../../assets/img/monitorManage/monitorManage_logo.png';
import {Message} from '../../../utils/tools/common';
import Taro from '@tarojs/taro';
import TagGroup from "../../../components/tag-group";

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

  onPushStateClick = (pushState, id, index, obligorId) => {
    const {type} = this.props;
    this.setState({
      curData: this.props.data
    })
    setTimeout(() => {
      const {curData} = this.state;
      console.log('curData', curData)
      const buildData = [...curData];
      if (pushState) {
        const curApi = type === 'businessRelation' ? 'monitorManage/getBusClosePush' : 'monitorManage/getClosePush';
        const curId = type === 'businessRelation' ? obligorId : id
        this.props.dispatch({
          type: curApi,
          payload: {idList: [curId]}
        }).then((res) => {
          console.log('res', res)
          const {code} = res;
          if (code === 200) {
            buildData[index].pushState = 0;
            buildData[index].obligorPushType = 0;
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
        const curApi = type === 'businessRelation' ? 'monitorManage/getBusOpenPush' : 'monitorManage/getOpenPush';
        const curId = type === 'businessRelation' ? obligorId : id
        this.props.dispatch({
          type: curApi,
          payload: {idList: [curId]}
        }).then((res) => {
          console.log('res', res)
          const {code} = res;
          if (code === 200) {
            buildData[index].pushState = 1;
            buildData[index].obligorPushType = 1;
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

  onDetailClick = (obligorId) =>{
    Taro.navigateTo({url:`/subpackage/pages/monitorManage/obligorDetail/index?obligorId=${obligorId}`})
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
              <View onClick={()=>{this.onDetailClick(type === 'obligor' ? i.id : i.obligorId)}}>
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
                          className={i.role === 3 ? 'yc-monitorManage-bottom-content-relationImg-roleTextTemp' : 'yc-monitorManage-bottom-content-relationImg-roleText'}
                        >{handleRole[i.role] ? handleRole[i.role] : '未知'}</View>
                      </View>
                  }
                  <View className='yc-monitorManage-bottom-content-baseInfo'>
                    {
                      i.obligorName.length > 4 ?
                        <View className='yc-monitorManage-bottom-content-baseInfo-company'>
                          {i.obligorName || '--'}
                        </View> :
                        <View className='yc-monitorManage-bottom-content-baseInfo-personal'>
                          <Text>{i.obligorName || '--'}&nbsp;&nbsp;</Text>
                          <Text style={{
                            display: i.obligorName.length === 4 ? 'block' : 'inline-block',
                            marginTop: i.obligorName.length === 4 ? '16rpx' : '0',
                          }}>{i.obligorNumber && `(${i.obligorNumber})` }</Text>
                        </View>
                    }

                    <View className='yc-monitorManage-bottom-content-baseInfo-bottom'>
                      <View className='yc-monitorManage-bottom-content-baseInfo-bottom-tags'>
                        <TagGroup
                          isBorrower={i.isBorrower}
                          dishonestStatus={i.dishonestStatus}
                          limitHeightStatus={i.limitHeightStatus}
                          isTable={i.isTable}
                          bankruptcyStatus={i.bankruptcyStatus || i.bankruptcy}
                          regStatus={i.regStatus}
                        />
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
                  <View className='yc-monitorManage-bottom-content-right' onClick={(e)=>{e.stopPropagation();}}>
                    <View
                      className={i.pushState || i.obligorPushType ? 'yc-monitorManage-bottom-content-right-yes' : 'yc-monitorManage-bottom-content-right-no'}
                      onClick={() => {
                        this.onPushStateClick(i.pushState || i.obligorPushType, i.id, index, i.obligorId || undefined)
                      }}>
                      {
                        i.pushState || i.obligorPushType ?
                          <Text className="iconfont icon-selected yc-monitorManage-bottom-content-right-yesIcon"/> :
                          <Text className="iconfont icon-add yc-monitorManage-bottom-content-right-noIcon"/>
                      }
                      {
                        i.pushState || i.obligorPushType ?
                          <Text className='yc-monitorManage-bottom-content-right-yesText'>已监控</Text> :
                          <Text className='yc-monitorManage-bottom-content-right-noText'>监控</Text>
                      }
                    </View>
                  </View>
                  {
                    index !== data.length - 1 &&  <View className='yc-monitorManage-bottom-content-line'/>
                  }
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}
