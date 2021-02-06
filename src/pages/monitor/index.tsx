import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import NavigationBar from '../../components/navigation-bar';
import TagSelected from '../../components/tag-selected';
import QueryDrop from '../../components/query-drop';
import Tab from '../../components/tab';
import List from '../../components/list';
import './index.scss'
import { AtTabs, AtIcon } from "taro-ui";


type IProps = {

};


interface configType{
  id: number,
  title: string,
}

type IState = {
  current: number
  assetsConfig: configType[]
  riskConfig: configType[]
  isScroll?: boolean
};

export default class Monitor extends Component <IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      isScroll: false,
      assetsConfig: [
        { title: '全部', id: 1},
        { title: '三星', id: 2},
        { title: '二星', id: 3},
        { title: '一星', id: 4}
      ],
      riskConfig: [
        { title: '全部', id: 1},
        { title: '高风险', id: 2},
        { title: '警示', id: 3},
        { title: '提示', id: 4},
        { title: '利好', id: 5}
      ]
    };
  }

  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  handleClick = (value) => {
    console.log('value === ', value);
    this.setState({
      current: value.id
    })
  };

  handleChangeTab = (item) => {
    console.log('item === ', item);
  };


  render () {
    const tabList = [
      { title: '资产线索', id: 1 },
      { title: '风险信息', id: 2 },
    ];
    const { current, assetsConfig, riskConfig, isScroll} = this.state;
    return (
      <View className='monitor'>
        <NavigationBar title={'源诚资产监控'} type={'blue'}/>
        <Tab config={tabList} onClick={this.handleClick}/>
        <TagSelected config={current === 1 ? assetsConfig : riskConfig } onClick={this.handleChangeTab}/>
        <QueryDrop />
        {
          !isScroll &&  <View className='monitor-tips'>
						<View className='monitor-tips-notice'>
              {/*<AtIcon prefixClass='icon' value='notice' className='monitor-tips-icon'/>*/}
							<Text className='iconfont icon-notice monitor-tips-notice-icon'/>
							<Text className='monitor-tips-notice-text'>
								为您找到
								<Text className='monitor-tips-notice-text-count'>1214</Text>
								条线索
							</Text>
						</View>
					</View>
        }
        <List>
          <View>4556</View>
        </List>
      </View>
    )
  }
}
