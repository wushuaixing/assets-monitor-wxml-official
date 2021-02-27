import React, {Component} from 'react'
import {View, ScrollView} from '@tarojs/components'
import ObligorListItem from "./obligorListItem";
import BusinessListItem from "./businessListItem/index";
import './index.scss'

export default class ListManage extends Component {

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

  onScrollToLower = () => {
    const {onScrollToLower} = this.props;
    if (onScrollToLower) onScrollToLower();
  }

  render() {
    const {data,current,searchValue} = this.props;
    return (
      <View className='yc-monitorManage-bottom'>
        <ScrollView
          style={{height: `calc(100vh - 255rpx)`}}
          scrollY
          scrollWithAnimation
          lowerThreshold={60}
          onScrollToLower={this.onScrollToLower}
        >
          {
            current ? <ObligorListItem data={data} type='obligor'/> : <BusinessListItem data={data} searchValue={searchValue}/>
          }

        </ScrollView>
      </View>
    )
  }
}
