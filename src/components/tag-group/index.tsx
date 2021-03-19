import React, {Component} from 'react';
import {View} from '@tarojs/components';
import './index.scss';

type isState = {}

export default class TagGroup extends Component<any, isState> {

  constructor(props) {
    super(props);
    this.state = {};
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


  render() {
    const {isBorrower, dishonestStatus, limitHeightStatus, isTable, bankruptcyStatus, regStatus, isAll} = this.props;
    const greenArr = ['在业', '存续'];
    const blueArr = ['迁入', '迁出'];
    const grayArr = ['清算','停业','撤销','吊销','注销'];
    const grayStyle = {
      background: '#F5F5F5',
      color: '#666666'
    }
    const greenStyle = {
      background: '#DAFFF3',
      color: '#00B478'
    }
    const blueStyle = {
      background: '#DEECFF',
      color: '#0979E6'
    }
    const pcczStyle = {
      width: '120rpx'
    }
    return (
      <View className='yc-tagGroup'>
        {isBorrower ? <View className='yc-tagGroup-borrow'>借</View> : null}
        {isAll && greenArr.includes(regStatus) ? <View className='yc-tagGroup-sx' style={greenStyle}>{regStatus}</View> : null}
        {isAll && blueArr.includes(regStatus) ? <View className='yc-tagGroup-sx' style={blueStyle}>{regStatus}</View> : null}
        {dishonestStatus ? <View className='yc-tagGroup-sx'>失信</View> : null}
        {limitHeightStatus ? <View className='yc-tagGroup-sx'>限高</View> : null}
        {isTable ? <View className='yc-tagGroup-sx' style={grayStyle}>{regStatus}</View> : null}
        {bankruptcyStatus ? <View className='yc-tagGroup-sx' style={pcczStyle}>破产重组</View> : null}
        {isAll && grayArr.includes(regStatus) ? <View className='yc-tagGroup-sx' style={grayStyle}>{regStatus}</View> : null}
      </View>
    )
  }
}
