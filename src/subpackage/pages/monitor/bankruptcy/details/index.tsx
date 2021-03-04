import React, { Component } from 'react';
import { View } from '@tarojs/components';
import NavigationBar from "../../../../../components/navigation-bar"
import './index.scss';

type IProps = {
}

type IState = {

};


export default class AnnouncementDetail extends Component <IProps, IState>{

  render () {
    return (
      <View className='announcement'>
        <NavigationBar border title='拍卖详情'/>


      </View>
    )
  }
}
