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
    console.log("onScrollToLower===")
    const {onScrollToLower} = this.props;
    if (onScrollToLower) onScrollToLower();
  }

  onRefresherRefresh = () =>{
    console.log('onRefresherRefresh===')
    const {handleBusinessList} = this.props;
    if(handleBusinessList)handleBusinessList();
  }

  onRefresherRestore = () =>{
    console.log('onRefresherRestore===')
  }


  render() {
    const {data,current,searchValue,handleBusinessList,loading} = this.props;
    return (
      <View className='yc-monitorManage-bottom'>
        <ScrollView
          style={{height: `calc(100vh - 255rpx)`}}
          scrollY
          scrollWithAnimation
          lowerThreshold={60}
          // refresherThreshold={0}
          // upperThreshold={1}
          refresherTriggered={loading}
          onScrollToLower={this.onScrollToLower}
          onRefresherRefresh={this.onRefresherRefresh}
          refresherEnabled
          refresherDefaultStyle='none'
          refresherBackground='transparent none no-repeat no-scroll 0% 0%'
          onRefresherRestore={this.onRefresherRestore}
        >
          {
            current ? <ObligorListItem data={data} type='obligor'/> : <BusinessListItem data={data} searchValue={searchValue} handleBusinessList={handleBusinessList}/>
          }

        </ScrollView>
      </View>
    )
  }
}
