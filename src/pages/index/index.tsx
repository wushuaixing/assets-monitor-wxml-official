import React, { Component } from 'react';
import {View, Button, Text, Image, ScrollView} from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtSwitch, AtTabs }  from 'taro-ui'
import { connect } from 'react-redux';
import NavigationBar from '../../components/navigation-bar';
import Tab from "../../components/tab";
import {getGlobalData, setGlobalData} from "../../utils/const/global";
import addBus from '../../assets/img/page/add-bus.png';
import portrait from '../../assets/img/page/portrait-search.png';
import auction from '../../assets/img/page/auction.png';
import businessMan from '../../assets/img/page/business-management.png';
import debtor from '../../assets/img/page/debtor.png';
import collection from '../../assets/img/page/collection.png';
import follow from '../../assets/img/page/follow.png';
import star from '../../assets/img/page/star.png';
import './index.scss'


type IProps = {
  count: number,
  dispatch: ({type: string, payload: object}) => {},
};

type IState = {
  animation: any,
  current: number
  type: string
};

@connect(({ home }) => ({ ...home }))
class Index extends Component <IProps, IState>{

  constructor(props) {
    super(props);
    this.state = {
      animation: '',
      current: 1,
      type: 'assets',
    };
  }

  componentWillMount () {
  }

  componentDidMount () {
    Taro.getSystemInfo().then(res => {
      console.log('statusBarHeight === ', res);
      setGlobalData('statusBarHeight', res.statusBarHeight);
    });
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }


  handleClick = (value) => {
    this.setState({
      current: value.id
    })
  };

  render () {
    const tabList = [
      { title: '资产', id: 1 },
      { title: '风险', id: 2 },
    ];
    const { current } = this.state;
    return (
      <View className='home'>
        <View className='home-title'>
          <NavigationBar title='源诚资产监控' type='blue'/>
        </View>
        <ScrollView>
          <View className='home-header'>
            <View className='home-header-tab'>
              <View className='home-header-tab-logo'>
                <Image className='home-header-tab-logo-pic' src={addBus}/>
              </View>
              <View className='home-header-tab-text'>添加业务</View>
            </View>
            <View className='home-header-tab'>
              <View className='home-header-tab-logo'>
                <Image className='home-header-tab-logo-pic' src={portrait}/>
              </View>
              <View className='home-header-tab-text'>画像查询</View>
            </View>
            <View className='home-header-tab'>
              <View className='home-header-tab-logo'>
                <Image className='home-header-tab-logo-pic' src={auction}/>
              </View>
              <View className='home-header-tab-text'>拍卖查询</View>
            </View>
          </View>

          <View className='home-middle'>
            <View className='home-middle-tab'>
              <View className='home-middle-tab-logo'>
                <Image className='home-middle-tab-logo-img' src={businessMan}/>
              </View>
              <Text className='home-middle-tab-text'>业务管理</Text>
            </View>
            <View className='home-middle-tab'>
              <View className='home-middle-tab-logo'>
                <Image className='home-middle-tab-logo-img' src={debtor}/>
              </View>
              <Text className='home-middle-tab-text'>债务人管理</Text>
            </View>
            <View className='home-middle-tab'>
              <View className='home-middle-tab-logo'>
                <Image className='home-middle-tab-logo-img' src={collection}/>
              </View>
              <Text className='home-middle-tab-text'>我的收藏</Text>
            </View>
            <View className='home-middle-tab'>
              <View className='home-middle-tab-logo'>
                <Image className='home-middle-tab-logo-img' src={follow}/>
              </View>
              <Text className='home-middle-tab-text'>我的跟进</Text>
            </View>
          </View>

          <View className='home-data'>
            <Tab type={'homeTab'} config={tabList} onClick={this.handleClick}/>
            {
              current === 1 && <View className='home-data-box'>
								<View className='home-data-box-level'>线索等级</View>
								<View className='home-data-box-star'>
									<View className='home-data-box-star-three'>
                    <Image className='home-data-box-star-three-icon' src={star}/>
                    <View className='home-data-box-star-three-text'>
											<View className='home-data-box-star-three-text-left'>
												<View className='home-data-box-star-three-text-left-title'>三星</View>
												<View className='home-data-box-star-three-text-left-title'>245</View>
											</View>
											<View className='home-data-box-star-three-text-right'>{`>`}</View>
                    </View>
                  </View>
									<View className='home-data-box-star-two'>
										<Image className='home-data-box-star-three-icon' src={star}/>
										<View className='home-data-box-star-three-text'>
											<View className='home-data-box-star-three-text-left'>
												<View className='home-data-box-star-three-text-left-title'>二星</View>
												<View className='home-data-box-star-three-text-left-title'>245</View>
											</View>
											<View className='home-data-box-star-three-text-right'>{`>`}</View>
										</View>
									</View>
									<View className='home-data-box-star-one'>
										<Image className='home-data-box-star-three-icon' src={star}/>
										<View className='home-data-box-star-three-text'>
											<View className='home-data-box-star-three-text-left'>
												<View className='home-data-box-star-three-text-left-title'>一星</View>
												<View className='home-data-box-star-three-text-left-title'>245</View>
											</View>
											<View className='home-data-box-star-three-text-right'>{`>`}</View>
										</View>
									</View>
                </View>
              </View>
            }
          </View>



          {/*<View className='home-data'>*/}
          {/*  <AtTabs className='large-tab' current={this.state.current} tabList={tabList} onClick={this.handleClick.bind(this)}/>*/}
          {/*</View>*/}

          {/*<View className='home-read'>*/}
          {/*  <View className='home-read-title'>资产线索</View>*/}
          {/*  <AtSwitch className='home-read-switch' title='只显示未读'/>*/}
          {/*</View>*/}
        </ScrollView>
      </View>
    )
  }
}
export default Index;

