import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import NavigationBar from '../../components/navigation-bar';
import TagSelected from '../../components/tag-selected';
import './index.scss'
import {AtTabs} from "taro-ui";


type IProps = {

};

type IState = {
  current: number
};

export default class Monitor extends Component <IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  handleClick (value) {
    this.setState({
      current: value
    })
  }


  render () {
    const tabList = [
      { title: '资产线索', id: 1 },
      { title: '风险信息', id: 2 },
    ];
    const { current } = this.state;
    return (
      <View className='monitor'>
        <NavigationBar title={'源诚资产监控'} border />
        <View>
          <AtTabs
            className='large-tab'
            scroll
            current={current}
            tabList={tabList}
            onClick={this.handleClick.bind(this)}/>
        </View>
        <TagSelected/>
      </View>
    )
  }
}
