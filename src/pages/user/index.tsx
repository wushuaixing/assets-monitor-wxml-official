import React, {Component} from 'react'
import Taro from '@tarojs/taro';
import {connect} from 'react-redux';
import {View, Image, Text} from '@tarojs/components'
import bgImg from '../../assets/img/user/user_bg.png'
import amountImg from '../../assets/img/user/amount_back.png'
import avatarImg from '../../assets/img/user/user_avatar.png'
import telImg from '../../assets/img/user/user_tel.png'
import feedbackImg from '../../assets/img/user/user_feedback.png'
import {AtAvatar, AtList, AtListItem} from 'taro-ui'
import './index.scss'

type isState = {
  baseInfoArr: any,
  name: string
}

type IProps = {
  count: number,
  dispatch: ({type: string, payload: object}) => {
    then(param: (result) => void): any;
  },
};
@connect(({user}) => ({user}))
export default class User extends Component<IProps, isState> {

  constructor(props) {
    super(props);
    this.state = {
      baseInfoArr: [
        {key: '业务', value: 0, disabled: false, field: 'business'},
        {key: '债务人', value: 0, disabled: false, field: 'obligor'},
        {key: '跟进', value: 0, disabled: true, field: 'followUp'},
        {key: '收藏', value: 0, disabled: true, field: 'collect'},
      ],
      name: ''
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
    this.props.dispatch({
      type: 'user/getUserInfo',
      payload: {}
    }).then((res) => {
      if (res.code === 200) {
        const {data: {name = '', businessCount = 0, obligorCount = 0}} = res || {};
        const buildArr = [
          {key: '业务', value: businessCount, disabled: false, field: 'business'},
          {key: '债务人', value: obligorCount, disabled: false, field: 'obligor'},
          {key: '跟进', value: 0, disabled: true, field: 'followUp'},
          {key: '收藏', value: 0, disabled: true, field: 'collect'},
        ]
        this.setState({
          name,
          baseInfoArr: buildArr
        })
      }
    })
  }

  componentDidHide() {
  }

  onTelClick = () => {
    Taro.makePhoneCall({
      phoneNumber: '13372567936'
    })
  }

  onFeedBackClick = () => {
    Taro.navigateTo({
      url: "/pages/user/feedBack/index",
    });
  }

  onOutLoginClick = () => {
    Taro.setStorageSync('token', '');
    Taro.setStorageSync('loginNumber', '');
    Taro.navigateTo({
      url: "/pages/default-page/index",
    });
  }

  navigateToPage = (disabled, field, value) => {
    if (!disabled && value !== 0) {
      Taro.navigateTo({url: `/subpackage/pages/monitorManage/index?type=${field}&origin=user`})
    }
  }

  render() {
    const {name, baseInfoArr} = this.state;
    return (
      <View className='yc-user'>
        <View className='yc-user-baseInfo'>
          <View className='yc-user-baseInfo-content'>
            <View className='yc-user-baseInfo-content-avatar'>
              <AtAvatar circle image={avatarImg}/>
            </View>
            <View className='yc-user-baseInfo-content-text'>{name}</View>
            <Image src={bgImg} className='yc-user-baseInfo-content-img'/>
          </View>
          <View>
            <Image src={amountImg} className='yc-user-baseInfo-amountImg'/>
            <View className='yc-user-baseInfo-amount'>
              {
                baseInfoArr.map((i, index) => {
                  return (
                    <View className='yc-user-baseInfo-amount-content' onClick={() => {
                      this.navigateToPage(i.disabled, i.field, i.value)
                    }}>
                      <View style={{borderLeft: index !== 0 ? 'solid 1px #E5E5E5' : 'solid 0 #fff'}}>
                        <View className='yc-user-baseInfo-amount-content-number'
                              style={{color: i.disabled || i.value === 0 ? '#CCCCCC' : '#333333'}}>{i.value}</View>
                        <View className='yc-user-baseInfo-amount-content-text'
                              style={{color: i.disabled || i.value === 0 ? '#CCCCCC' : '#666666'}}>{i.key}</View>
                      </View>
                    </View>
                  )
                })
              }
            </View>
          </View>
          <View className='yc-user-baseInfo-list'>
            {/*<AtList>*/}
            {/*  <AtListItem title='意见反馈' arrow='right' thumb={feedbackImg} onClick={this.onFeedBackClick}/>*/}
            {/*  <AtListItem title='联系客服' arrow='right' thumb={telImg} onClick={this.onTelClick}/>*/}
            {/*</AtList>*/}
            <View className='yc-user-baseInfo-list-opinion' onClick={this.onFeedBackClick}>
              <View className='yc-user-baseInfo-list-opinion-icon'>
                <Text className="iconfont icon-feedback yc-user-baseInfo-list-opinion-icon-text"/>
              </View>
              <View className='yc-user-baseInfo-list-opinion-text'>
                意见反馈
              </View>
              <View className='yc-user-baseInfo-list-opinion-arrow'>
                <Text className="iconfont icon-right-arrow yc-user-baseInfo-list-opinion-arrow-text"/>
              </View>
            </View>

            <View className='yc-user-baseInfo-list-line'/>

            <View className='yc-user-baseInfo-list-opinion' onClick={this.onTelClick}>
              <View className='yc-user-baseInfo-list-opinion-icon'>
                <Text className="iconfont icon-customService yc-user-baseInfo-list-opinion-icon-text"/>
              </View>
              <View className='yc-user-baseInfo-list-opinion-text'>
                联系客服
              </View>
              <View className='yc-user-baseInfo-list-opinion-arrow'>
                <Text className="iconfont icon-right-arrow yc-user-baseInfo-list-opinion-arrow-text"/>
              </View>
            </View>
          </View>
          <View className='yc-user-baseInfo-bottom' onClick={this.onOutLoginClick}>
            <View className='yc-user-baseInfo-bottom-text'>退出登录</View>
          </View>
        </View>
      </View>
    )
  }
}
