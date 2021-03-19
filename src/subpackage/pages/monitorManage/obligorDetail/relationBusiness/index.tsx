import React, {Component} from 'react'
import {View, Text} from '@tarojs/components'
import './index.scss'
import Taro from "@tarojs/taro";

type isState = {
  isShow: boolean,
}

export default class RelationBusiness extends Component<any, isState> {

  constructor(props) {
    super(props);
    this.state = {
      isShow: false
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

  onClick = () => {
    const {isShow} = this.state;
    this.setState({
      isShow: !isShow
    })
  }

  onDetailClick = (id) => {
    Taro.navigateTo({url: `/subpackage/pages/monitorManage/businessDetail/index?id=${id}`});
  }

  render() {
    const {isShow} = this.state;
    const {relationBusiness} = this.props;
    return (
      <View className='relationBusiness'>
        <View className='relationBusiness-top' onClick={this.onClick}>
          <View className='relationBusiness-top-text'>关联监控业务 {relationBusiness && relationBusiness.length}</View>
          <Text className={`iconfont ${isShow ? 'icon-top-arrow' : 'icon-under-arrow'} relationBusiness-top-icon`}/>
        </View>
        {
          isShow ? (
            <View className='relationBusiness-content'>
              <View className='relationBusiness-content-line'/>
              {
                relationBusiness && relationBusiness.length > 0 && relationBusiness.map((i, index) => {
                  return (
                    <View>
                      <View className='relationBusiness-content-info' onClick={() => {
                        this.onDetailClick(i.businessId)
                      }}>
                        <View className='relationBusiness-content-info-busNumber'>
                          <View className='relationBusiness-content-info-busNumber-label'>业务编号</View>
                          <View className='relationBusiness-content-info-busNumber-sign'>：</View>
                          <View className='relationBusiness-content-info-busNumber-value'>{i.caseNumber || '--'}</View>
                        </View>
                        <View className='relationBusiness-content-info-news'>
                          <View className='relationBusiness-content-info-news-left'>
                            <View className='relationBusiness-content-info-news-left-label'>债务人角色：</View>
                            <View className='relationBusiness-content-info-news-left-value'>{i.roleText || '--'}</View>
                          </View>
                          <View className='relationBusiness-content-info-news-right'>{i.uploadTime || '--'}</View>
                        </View>
                      </View>
                      {
                        index !== relationBusiness.length - 1 && <View className='relationBusiness-content-info-line'/>
                      }
                    </View>
                  )
                })
              }
            </View>
          ) : null
        }
      </View>
    )
  }
}
