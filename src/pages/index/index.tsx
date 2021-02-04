import React, { Component } from 'react';
import {View, Button, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtSwitch, AtTabs }  from 'taro-ui'
import { connect } from 'react-redux';
import NavigationBar from '../../components/navigation-bar';
import img from '../../assets/img/tab-bar/home.png';
import './index.scss'
import {getGlobalData, setGlobalData} from "../../utils/const/global";

type IProps = {
  count: number,
  dispatch: ({type: string, payload: object}) => {},
};

type IState = {
  animation: any,
  current: number
};

@connect(({ home }) => ({ ...home }))
class Index extends Component <IProps, IState>{

  constructor(props) {
    super(props);
    this.state = {
      animation: '',
      current: 0,
    };
  }

  componentWillMount () {
  }

  componentDidMount () {
    Taro.getSystemInfo().then(res => {
      setGlobalData('statusBarHeight', res.statusBarHeight);
    });
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
      { title: '资产', id: 1 },
      { title: '风险', id: 2 },
    ];
    return (
      <View className='home'>
        <View className='home-title'>
          <NavigationBar title='源诚资产监控'/>
        </View>
        <View className='home-header'>
          <View className='home-header-tab'>
            <Image className='home-header-tab-img' src={img}/>
            <Text className='home-header-tab-text'>添加业务</Text>
          </View>
          <View className='home-header-tab'>
            <Image className='home-header-tab-img' src={img}/>
            <Text className='home-header-tab-text'>画像查询</Text>
          </View>
          <View className='home-header-tab'>
            <Image className='home-header-tab-img' src={img}/>
            <Text className='home-header-tab-text'>拍卖查询</Text>
          </View>
        </View>

        <View className='home-middle'>
          <View className='home-middle-tab'>
            <Image className='home-middle-tab-img' src={img}/>
            <Text className='home-middle-tab-text'>添加业务</Text>
          </View>
          <View className='home-middle-tab'>
            <Image className='home-middle-tab-img' src={img}/>
            <Text className='home-middle-tab-text'>添加业务</Text>
          </View>
          <View className='home-middle-tab'>
            <Image className='home-middle-tab-img' src={img}/>
            <Text className='home-middle-tab-text'>添加业务</Text>
          </View>
          <View className='home-middle-tab'>
            <Image className='home-middle-tab-img' src={img}/>
            <Text className='home-middle-tab-text'>添加业务</Text>
          </View>
        </View>

        <View className='home-data'>
          <AtTabs className='large-tab' scroll current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}/>
        </View>

        <View className='home-read'>
          <View className='home-read-title'>资产线索</View>
          <AtSwitch className='home-read-switch' title='只显示未读'/>
        </View>
      </View>
    )
  }
}
export default Index;

