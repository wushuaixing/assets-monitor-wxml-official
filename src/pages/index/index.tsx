import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import {View, Text, Image, ScrollView} from '@tarojs/components';
import { connect } from 'react-redux';
import NavigationBar from '../../components/navigation-bar';
import Tab from "../../components/tab";
import { setGlobalData} from "../../utils/const/global";
import addBus from '../../assets/img/page/add-bus.png';
import portrait from '../../assets/img/page/portrait-search.png';
import auction from '../../assets/img/page/auction.png';
import businessMan from '../../assets/img/page/business-management.png';
import debtor from '../../assets/img/page/debtor.png';
import collection from '../../assets/img/page/collection.png';
import follow from '../../assets/img/page/follow.png';
import star from '../../assets/img/page/star.png';
import high from '../../assets/img/page/high-risk.png';
import warn from '../../assets/img/page/warn-risk.png';
import tip from '../../assets/img/page/tip-risk.png';
import good from '../../assets/img/page/good-risk.png';
import noresult from '../../assets/img/components/blank_noresult.png'
import noData from '../../assets/img/page/blank_nodate.png';


import './index.scss'

interface dataItem{
  id: number
  name: string
  icon: string
  num: number
  isRule: boolean
}

interface caseItem{
  title: string
  time: string
  text: string
}

type IProps = {
  count: number,
  businessCount: number
  dispatch: ({type: string, payload: object}) => {}
  assetsArray: dataItem[]
  riskArray: dataItem[]
  starLevel: { [propName: string]: number}
};

type IState = {
  animation: any,
  current: number
  type: string
  scrollViewHeight: number
  caseArray: caseItem[]
};

@connect(({ home }) => ({ ...home }))
class Index extends Component <IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      animation: '',
      current: 1,
      type: 'assets',
      caseArray: [
        {title: '排污权处置案例', time: '2020-10-10', text: '山东某分行通过“排污权”信息成功收回100万元山东某分行通过“排污权”信息成功收回100万元！'},
        {title: '排污权处置案例', time: '2020-10-10', text: '山东某分行通过“排污权”信息成功收回100万元山东某分行通过“排污权”信息成功收回100万元！'},
        // {title: '排污权处置案例', time: '2020-10-10', text: '山东某分行通过“排污权”信息成功收回100万元山东某分行通过“排污权”信息成功收回100万元！'},
        // {title: '排污权处置案例', time: '2020-10-10', text: '山东某分行通过“排污权”信息成功收回100万元山东某分行通过“排污权”信息成功收回100万元！'},
        // {title: '排污权处置案例', time: '2020-10-10', text: '山东某分行通过“排污权”信息成功收回100万元山东某分行通过“排污权”信息成功收回100万元！'},
        // {title: '排污权处置案例', time: '2020-10-10', text: '山东某分行通过“排污权”信息成功收回100万元山东某分行通过“排污权”信息成功收回100万元！'},
        // {title: '排污权处置案例', time: '2020-10-10', text: '山东某分行通过“排污权”信息成功收回100万元山东某分行通过“排污权”信息成功收回100万元！'},
        // {title: '排污权处置案例', time: '2020-10-10', text: '山东某分行通过“排污权”信息成功收回100万元山东某分行通过“排污权”信息成功收回100万元！'},
        // {title: '排污权处置案例', time: '2020-10-10', text: '山东某分行通过“排污权”信息成功收回100万元山东某分行通过“排污权”信息成功收回100万元！'},
        // {title: '排污权处置案例', time: '2020-10-10', text: '山东某分行通过“排污权”信息成功收回100万元山东某分行通过“排污权”信息成功收回100万元！'},
        // {title: '排污权处置案例', time: '2020-10-10', text: '山东某分行通过“排污权”信息成功收回100万元山东某分行通过“排污权”信息成功收回100万元！'},
        // {title: '排污权处置案例', time: '2020-10-10', text: '山东某分行通过“排污权”信息成功收回100万元山东某分行通过“排污权”信息成功收回100万元！'},
      ],
      scrollViewHeight: 0,
    };
  }

  componentWillMount () {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/getCurrentOrganization',
      payload: {}
    });
    dispatch({
      type: 'home/getAssets',
      payload: {}
    })
  }

  componentDidMount () {
    Taro.getSystemInfo().then(res => {
      console.log('statusBarHeight === ', res);
      setGlobalData('statusBarHeight', res.statusBarHeight);
      this.setState({
        scrollViewHeight: res.windowHeight - res.statusBarHeight
      })
    });
  }

  handleClick = (value) => {
    const { dispatch } = this.props;
    if(value.id === 1){
      dispatch({
        type: 'home/getAssets',
        payload: {}
      });
    }
    else {
      dispatch({
        type: 'home/getRisk',
        payload: {}
      });
    }
    this.setState({
      current: value.id
    })
  };

  navigateToPage = (type: string) => {
    Taro.navigateTo({url:`/subpackage/pages/monitorManage/index?type=${type}`})
  };

  navigateToRule = () => {
    Taro.navigateTo({url:'/subpackage/pages/rule-description/index'})
  };

  render () {
    const tabList = [
      { title: '资产', id: 1 },
      { title: '风险', id: 2 },
    ];
    const { current, caseArray, scrollViewHeight} = this.state;
    const { assetsArray, riskArray, businessCount, starLevel } = this.props;
    console.log('data === ', starLevel, businessCount, assetsArray, riskArray);
    return (
      <View className='home'>
        <View className='home-title'>
          <NavigationBar  title='源诚资产监控' type='gradient' color='white'/>
        </View>
        {
          businessCount > 0 && <ScrollView scrollY style={{ height: scrollViewHeight }}>
            <View className='home-bg'>
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
            </View>

            <View className='home-middle'>
              <View className='home-middle-tab' onClick={()=>{this.navigateToPage('business')}}>
                <View className='home-middle-tab-logo'>
                  <Image className='home-middle-tab-logo-img' src={businessMan}/>
                </View>
                <Text className='home-middle-tab-text'>业务管理</Text>
              </View>
              <View className='home-middle-tab' onClick={()=>{this.navigateToPage('obligor')}}>
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
                current === 1 && (
                  assetsArray.length > 0 ? <View className='home-data-box'>
                    <View className='home-data-box-level'>
                      <Text>线索等级</Text>
                      <Text className='iconfont icon-question home-data-box-level-icon' onClick={this.navigateToRule}/>
                    </View>
                    <View className='home-data-box-star'>
                      <View className='home-data-box-star-three'>
                        <Image className='home-data-box-star-three-icon' src={star}/>
                        <View className='home-data-box-star-three-text'>
                          <View className='home-data-box-star-three-text-left'>
                            <View className='home-data-box-star-three-text-left-title'>三星</View>
                            <View className='home-data-box-star-three-text-left-title'>{starLevel.threeStar}</View>
                          </View>
                          <Text className='iconfont icon-right-arrow home-data-box-star-three-text-right' />
                        </View>
                      </View>
                      <View className='home-data-box-star-two'>
                        <Image className='home-data-box-star-two-icon' src={star}/>
                        <View className='home-data-box-star-two-text'>
                          <View className='home-data-box-star-two-text-left'>
                            <View className='home-data-box-star-two-text-left-title'>二星</View>
                            <View className='home-data-box-star-two-text-left-title'>{starLevel.twoStar}</View>
                          </View>
                          <Text className='iconfont icon-right-arrow home-data-box-star-three-text-right' />
                        </View>
                      </View>
                      <View className='home-data-box-star-one'>
                        <Image className='home-data-box-star-one-icon' src={star}/>
                        <View className='home-data-box-star-one-text'>
                          <View className='home-data-box-star-one-text-left'>
                            <View className='home-data-box-star-one-text-left-title'>一星</View>
                            <View className='home-data-box-star-one-text-left-title'>{starLevel.oneStar}</View>
                          </View>
                          <Text className='iconfont icon-right-arrow home-data-box-star-three-text-right' />
                        </View>
                      </View>
                    </View>
                    <View className='home-data-box-typeTitle'>线索类型</View>
                    <View className='home-data-box-firstLine'/>
                    <View className='home-data-box-type'>
                      {
                        assetsArray.map((item, index) => {
                          return(
                            <View className='home-data-box-type-logo'>
                              <View className='home-data-box-type-logo-left'>
                                <Text className={`iconfont ${item.icon} home-data-box-type-logo-left-icon`}/>
                              </View>
                              <View className='home-data-box-type-logo-right'>
                                <View className='home-data-box-type-logo-right-name'>{item.name}</View>
                                <View className='home-data-box-type-logo-right-num'>{item.num}</View>
                              </View>
                              {
                                index % 2 === 0 && <View className='home-data-box-type-logo-divider'/>
                              }
                            </View>
                          )
                        })
                      }
                    </View>
                  </View> : <View className='home-data-noData'>
                    <View className='home-data-noData-pic'>
                      <Image className='home-data-noData-pic-img' src={noresult}/>
                    </View>
                    <View className='home-data-noData-tips'>暂未发现债务人相关的资产线索</View>
                    <View className='home-data-noData-advice'>建议添加监控业务</View>
                  </View>
                )
              }
              {
                current === 2 && (
                  riskArray.length > 0 ? <View className='home-data-box'>
                    <View className='home-data-box-level'>
                      <Text>风险等级</Text>
                      <Text className='iconfont icon-question home-data-box-level-icon' onClick={this.navigateToRule} />
                    </View>
                    <View className='home-data-box-star'>
                      <View className='home-data-box-star-high'>
                        <Image className='home-data-box-star-high-icon' src={high}/>
                        <View className='home-data-box-star-high-text'>
                          <View className='home-data-box-star-high-text-left'>
                            <View className='home-data-box-star-high-text-left-title'>高风险</View>
                            <View className='home-data-box-star-high-text-left-title'>{starLevel.high}</View>
                          </View>
                          <Text className='iconfont icon-right-arrow home-data-box-star-three-text-right' />
                        </View>
                      </View>
                      <View className='home-data-box-star-warn'>
                        <Image className='home-data-box-star-warn-icon' src={warn}/>
                        <View className='home-data-box-star-warn-text'>
                          <View className='home-data-box-star-warn-text-left'>
                            <View className='home-data-box-star-warn-text-left-title'>警示</View>
                            <View className='home-data-box-star-warn-text-left-title'>{starLevel.warn}</View>
                          </View>
                          <Text className='iconfont icon-right-arrow home-data-box-star-three-text-right' />
                        </View>
                      </View>
                      <View className='home-data-box-star-tip'>
                        <Image className='home-data-box-star-tip-icon' src={tip}/>
                        <View className='home-data-box-star-tip-text'>
                          <View className='home-data-box-star-tip-text-left'>
                            <View className='home-data-box-star-tip-text-left-title'>提示</View>
                            <View className='home-data-box-star-tip-text-left-title'>{starLevel.tip}</View>
                          </View>
                          <Text className='iconfont icon-right-arrow home-data-box-star-three-text-right' />
                        </View>
                      </View>
                      <View className='home-data-box-star-good'>
                        <Image className='home-data-box-star-good-icon' src={good}/>
                        <View className='home-data-box-star-good-text'>
                          <View className='home-data-box-star-good-text-left'>
                            <View className='home-data-box-star-good-text-left-title'>利好</View>
                            <View className='home-data-box-star-good-text-left-title'>{starLevel.good}</View>
                          </View>
                          <Text className='iconfont icon-right-arrow home-data-box-star-three-text-right' />
                        </View>
                      </View>
                    </View>
                    <View className='home-data-box-typeTitle'>风险类型</View>
                    <View className='home-data-box-firstLine'/>
                    <View className='home-data-box-type'>
                      {
                        riskArray.map((item, index) => {
                          return(
                            <View className='home-data-box-type-logo'>
                              <View className='home-data-box-type-logo-left'>
                                <Text className={`iconfont ${item.icon} home-data-box-type-logo-left-icon`}/>
                              </View>
                              <View className='home-data-box-type-logo-right'>
                                <View className='home-data-box-type-logo-right-name'>{item.name}</View>
                                <View className='home-data-box-type-logo-right-num'>{item.num}</View>
                              </View>
                              {
                                index % 2 === 0 && <View className='home-data-box-type-logo-divider'/>
                              }
                            </View>
                          )
                        })
                      }
                    </View>
                  </View> : <View className='home-data-noData'>
                    <View className='home-data-noData-pic'>
                      <Image className='home-data-noData-pic-img' src={noresult}/>
                    </View>
                    <View className='home-data-noData-tips'>暂未发现债务人相关的风险线索</View>
                    <View className='home-data-noData-advice'>建议添加监控业务</View>
                  </View>
                )
              }
            </View>

            {/*目前线索使用案例只和资产有关*/}
            {
              assetsArray.length === 0 && <View className='home-case'>
								<View className='home-case-title'>线索使用案例</View>
								<View className='home-case-titleLine'/>
                {
                  caseArray.map((item, index) => {
                    return (
                      <View className='home-case-info'>
                        <View className='home-case-info-title'>
                          <View className='home-case-info-title-text'>{item.title}</View>
                          <View className='home-case-info-title-time'>更新日期：{item.time}</View>
                        </View>
                        <View className='home-case-info-text'>{item.text}</View>
                        {
                          index !== caseArray.length - 1 && <View className='home-case-info-line'/>
                        }
                      </View>
                    )
                  })
                }
							</View>
            }

            {
              assetsArray.length === 0 && <View className='home-bottom'>
								<View className='home-bottom-left'/>
								<View className='home-bottom-text'>我也是有底线的</View>
								<View className='home-bottom-right'/>
							</View>
            }

          </ScrollView>
        }
        {
          businessCount <= 0 && <ScrollView style={{ height: scrollViewHeight }} className='home-noBusiness'>
						<View className='home-noBusiness-box'>
							<Image className='home-noBusiness-box-pic' src={noData} />
						</View>
						<View className='home-noBusiness-prompt'>您还未添加监控的业务</View>
						<View className='home-noBusiness-btn'>
							<View className='home-noBusiness-btn-text'>添加业务</View>
						</View>
					</ScrollView>
        }
      </View>
    )
  }
}
export default Index;

