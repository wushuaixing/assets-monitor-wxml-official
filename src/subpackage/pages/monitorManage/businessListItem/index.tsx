import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Text, View, RichText} from '@tarojs/components'
import Taro from '@tarojs/taro';
import './index.scss'
import DeleteModal from '../deleteModal/index';
import {dateToFormat} from '../../../../utils/tools/common';

type isState = {
  curData: any,
}
@connect(({monitorManage}) => ({monitorManage}))
export default class BusinessListItem extends Component<any, isState> {

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

  onClick = (id) => {
    console.log('onClick', id)
    const {searchValue} = this.props;
    this.props.dispatch({
      type: 'monitorManage/getCurClickItem',
      payload: {curClickItem: ''}
    })
    Taro.navigateTo({url: `/subpackage/pages/monitorManage/businessDetail/index?id=${id}&searchValue=${searchValue}`});
  }

  onClickMore = (e, i) => {
    const {curClickItem} = this.props.monitorManage;
    this.props.dispatch({
      type: 'monitorManage/getCurClickItem',
      payload: {curClickItem: (curClickItem !== i.id && i.id)}
    })
  }

  onEditBusinessClick = (id) => {
    const {searchValue} = this.props;
    this.props.dispatch({
      type: 'monitorManage/getCurClickItem',
      payload: {curClickItem: ''}
    })
    Taro.navigateTo({url: `/subpackage/pages/monitorManage/addBusiness/index?type=editBus&searchValue=${searchValue}&id=${id}`});
  }

  onDeleteClick = (id) => {
    this.props.dispatch({
      type: 'monitorManage/getCurClickItem',
      payload: {curClickItem: ''}
    })
    console.log('onDeleteClick', id)
    this.props.dispatch({
      type: 'monitorManage/getIsDeleteOpendModal',
      payload: {deleteId: id, isDeleteOpendModal: true}
    })
  }

  render() {
    const {data, searchValue, handleBusinessList} = this.props;
    console.log('this.props', this.props)
    const {curClickItem} = this.props.monitorManage;
    // this.focusComponents = new Set([
    //   'View',
    // ])
    const reg = new RegExp(searchValue, 'gi')
    const bgRandomColor = {
      0: '#FF5454',
      1: '#FF8F1F',
      2: '#00B578',
      3: '#00CACE',
      4: '#00B7F4',
      5: '#C19030',
      6: '#4876FF',
      7: '#AB00E8',
    }
    return (
      <View>
        {
          data && data.length > 0 && data.map((i, index) => {
            return (
              <View onClick={() => {
                this.onClick(i.id)
              }} className='yc-businessListItem'>
                <View className='yc-businessListItem-content'>
                  <View className='yc-businessListItem-content-logo' style={{
                    background: bgRandomColor[index % 8],
                    lineHeight: i.obligorName.length < 3 ? '64rpx' : 'auto'
                  }}>
                    <Text className='yc-businessListItem-content-logo-text'>{i.obligorName.slice(0, 4)}</Text>
                  </View>
                  <View style={{display:'inline-block'}}>
                    <View className='yc-businessListItem-content-middleRight'>
                      <View className='yc-businessListItem-content-middleRight-middle'>
                        <View
                          className='yc-businessListItem-content-middleRight-middle-caseNumber'>{i.caseNumber}</View>
                        <View className='yc-businessListItem-content-middleRight-middle-obligorDetail'>
                          <View
                            className='yc-businessListItem-content-middleRight-middle-obligorDetail-obligorName'>借款人：</View>
                          <View className='yc-businessListItem-content-middleRight-middle-obligorDetail-obligorValue'>
                            {i.obligorName ? <RichText nodes={i.obligorName.toString().replace(
                              reg,
                              `<em style="color:#FF3B30;font-style: normal;">${searchValue}</em>`
                            )}
                            /> : '-'}
                          </View>
                        </View>
                      </View>
                    </View>
                    <View className='yc-businessListItem-content-middleRightContent'>
                      <View>
                        {/*{*/}
                        {/*  [0, 1, 2].map((_i, indexTemp) => {*/}
                        {/*    return (<View className='yc-businessListItem-content-middleRight-right-circle'*/}
                        {/*                  style={{marginRight: indexTemp !== 2 ? '6rpx' : '0'}}/>)*/}
                        {/*  })*/}
                        {/*}*/}


                        <View className='yc-circle'>
                          <View onClick={(e) => {
                            e.stopPropagation();
                          }}>
                            <View
                              onClick={(e) => this.onClickMore(e, i)}
                              className='yc-businessListItem-content-middleRightContent-circleContent'
                            >
                              {
                                [0, 1, 2].map((_i, indexTemp) => {
                                  return (
                                    <View
                                      className='yc-businessListItem-content-middleRightContent-circleContent-circle'
                                      style={{marginRight: indexTemp !== 2 ? '6rpx' : '0'}}/>)
                                })
                              }
                            </View>
                          </View>
                          <View className="popover_body"
                                style={{display: curClickItem === i.id ? "block" : "none"}}
                          >
                            <View>
                              <View>
                                <View className="ant-popover ant-popover-placement-bottomRight "
                                      style={{left: "0rpx", top: '20rpx', transformOrigin: '50% 91.6rpx'}}
                                >
                                  <View className="ant-popover-content">
                                    <View className="ant-popover-arrow">
                                      <Text className="ant-popover-arrow-content"/>
                                    </View>
                                    <View className="ant-popover-inner">
                                      <View className="ant-popover-inner-content">
                                        <View onClick={(e) => {
                                          e.stopPropagation()
                                        }}>
                                          <View className='ant-popover-inner-content-text'
                                                style={{paddingTop: '32rpx'}}
                                                onClick={()=>{this.onEditBusinessClick(i.id)}}>编辑</View>
                                        </View>
                                        <View className='ant-popover-inner-content-line'/>
                                        <View className='ant-popover-inner-content-text' onClick={(e) => {
                                          e.stopPropagation();
                                        }}>
                                          <View onClick={() => {
                                            this.onDeleteClick(i.id)
                                          }}>
                                            删除
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>


                        <View className='yc-businessListItem-content-middleRightContent-date'>
                          {dateToFormat(i.uploadTime,'YYYY-MM-DD')}
                        </View>
                      </View>
                    </View>
                    {
                      searchValue !== "" ?
                        <View className='yc-businessListItem-content-middleRight-guarantor'>
                          <View className='yc-businessListItem-content-middleRight-guarantor-contentLine'/>
                          <View className='yc-businessListItem-content-middleRight-guarantor-detail'>
                            <View className='yc-businessListItem-content-middleRight-guarantor-detail-label'>担保人：</View>
                            <View className='yc-businessListItem-content-middleRight-guarantor-detail-content'>
                              {
                                i.guarantorNameList.map(res => {
                                  return <View
                                    className='yc-businessListItem-content-middleRight-guarantor-detail-content-labelText'>
                                    {res ? <RichText nodes={res.toString().replace(
                                      reg,
                                      `<em style="color:#FF3B30;font-style: normal;">${searchValue}</em>`
                                    )}
                                    /> : '-'}
                                  </View>
                                })
                              }
                            </View>
                          </View>
                        </View>
                        : null
                    }
                  </View>

                </View>
                <View className='yc-businessListItem-line'/>
              </View>
            )
          })
        }
        <DeleteModal handleBusinessList={handleBusinessList}/>
      </View>
    )
  }
}
