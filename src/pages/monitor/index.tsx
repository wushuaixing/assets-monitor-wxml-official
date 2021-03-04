import React, { Component } from 'react'
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro'
// import VirtualList from '@tarojs/components/virtual-list'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import { connect } from 'react-redux';
import { isRule } from '../../utils/tools/common';
import NavigationBar from '../../components/navigation-bar';
import TagSelected from '../../components/tag-selected';
import QueryDrop from '../../components/query-drop';
import Tab from '../../components/tab';
import ListItem from '../../components/list-item/index';
import blankNodata from '../../assets/img/page/blank_nodate.png';
import {getGlobalData} from "../../utils/const/global";
import backTop from '../../assets/img/components/back-top.png'
import './index.scss'

interface dataItem{
  id: number
  title: string
  time: string
  star: number
}


type IProps = {
  dispatch: any
  list: dataItem[]
  monitorParams: {
    tabId: number
    value: string[]
    starId: number
  }
  assetsList: []
  riskList: []
}

type IState = {
  currentId: number
  isScroll?: boolean
  assetsList: []
  riskList: []
  loading: boolean
  count: number
  queryAssetsConfig: any
  queryRiskConfig: any
  params: any
  starId?: number
  listCount: number
  scrollHeight: number
  page: number
  hasNext: boolean
  isClose: boolean
};

const tabList = [
  { title: '资产线索', id: 1 },
  { title: '风险信息', id: 2 },
];

let assestRuleArray = ['zcwjzcpm', 'zcwjdwq'];
let riskRuleArray = ['fxjkqypccz', 'fxjkssjk'];

// 资产/风险类型 1：资产拍卖 2：代位权-立案 3：代位权-开庭 4：代位权-裁判文书 5：破产重组 6：涉诉-立案 7：涉诉-开庭 8：涉诉-裁判文书
function getRuleValue(rule) {
  let array: string[] = [];
  switch (rule) {
    case 'zcwjzcpm': array = ['1']; break;
    case 'zcwjdwq': array = ['2', '3', '4']; break;
    case 'fxjkqypccz': array = ['5']; break;
    case 'fxjkssjk': array = ['6', '7', '8']; break;
  }
  return array;
}

function getRuleName(rule) {
  let title: string = '资产拍卖';
  switch (rule) {
    case 'zcwjzcpm': title = '资产拍卖'; break;
    case 'zcwjdwq': title = '代位权'; break;
    case 'fxjkqypccz': title = '破产重整'; break;
    case 'fxjkssjk': title = '涉诉监控'; break;
  }
  return title;
}

function filterArray(rule) {
  let ruleArray: string[] = getGlobalData('ruleArray');
  let resultArray: string[] = [];
  if(ruleArray && ruleArray.length > 0 ){
    rule.forEach(item => {
      if(ruleArray.includes(item)){
        resultArray = [...resultArray, ...getRuleValue(item)]
      }
    });
    return  resultArray;
  }
  else {
    return []
  }
}

/**
 * tabId 和starId id分别对应的score值
 * @param tabId
 * @param starId
 */
function getStarValue(tabId: number, starId: number) {
  let star: number | undefined = undefined;
  if(tabId === 1){
    switch (starId) {
      case 1: star = undefined; break;
      case 2: star = 90; break;
      case 3: star = 80; break;
      case 4: star = 60; break;
    }
  }
  else {
    switch (starId) {
      case 1: star = undefined; break;
      case 2: star = 90; break;
      case 3: star = 80; break;
      case 4: star = 60; break;
      case 5: star = 40; break;
    }
  }
  return star;
}

@connect(({ home, monitor, queryDrop}) => ({ ...home, ...monitor, ...queryDrop }))
export default class Monitor extends Component <IProps, IState>{
  $instance = getCurrentInstance();
  constructor(props) {
    super(props);
    this.state = {
      currentId: 1,
      isScroll: false,
      loading: false,
      listCount: 0,
      count: 0,
      params: {
        assetAndRiskType: filterArray(assestRuleArray).join(),
      },
      starId: 1,
      assetsList: [],
      riskList: [],
      scrollHeight: 0,
      page: 1,
      hasNext: false,
      isClose: false,
      queryAssetsConfig: [
        {
          id: 1,
          title: '是否已读',
          isSelected: false,
          field: 'isRead',
          type: 'singelSelected',
          initValue: '',
          conditions: [
            {name: '全部', id: 1, value: undefined, isSelected: true},
            {name: '已读', id: 2, value: true, isSelected: false},
            {name: '未读', id: 3, value: false, isSelected: false},
          ]
        },
        {
          id: 2,
          title: '线索类型',
          isSelected: false,
          field: 'assetAndRiskType',
          type: 'lineChoose',
          initValue: '',
          conditions: [
            {
              id: 1,
              name: '全部',
              isSelected: true,
              isRule: true,
              childrenName: [
                {name: '全部', value: filterArray(['zcwjzcpm', 'zcwjdwq']), id: 1, isSelected: true, isRule: true},
              ]
            },
            {
              id: 2,
              name: '涉诉资产',
              isSelected: false,
              isRule: true,
              childrenName: [
                {name: '全部', value: filterArray(['zcwjzcpm', 'zcwjdwq']), id: 1, isSelected: true, isRule: true },
                {name: '司法拍卖', value: filterArray(['zcwjzcpm']), id: 2, isSelected: false, isRule: isRule('zcwjzcpm')},
                {name: '代位权', value: filterArray( ['zcwjdwq']), id: 3, isSelected: false, isRule: isRule('zcwjdwq')},
              ]
            }
          ],
        },
        {
          id: 3,
          title: '更多筛选',
          isSelected: false,
          type: 'multipleForm',
          conditions: [
            {
              name: '推送日期',
              type: 'time',
              field: ['startTime', 'endTime'],
              value: [],
            }
          ],
        },
      ],
      queryRiskConfig: [
        {
          id: 1,
          title: '是否已读',
          isSelected: false,
          field: 'isRead',
          type: 'singelSelected',
          initValue: '',
          conditions: [
            {name: '全部', id: 1, value: '', isSelected: true},
            {name: '已读', id: 2, value: true, isSelected: false},
            {name: '未读', id: 3, value: false, isSelected: false},
          ]
        },
        {
          id: 2,
          title: '线索类型',
          isSelected: false,
          field: 'assetAndRiskType',
          type: 'lineChoose',
          initValue: '',
          conditions: [
            {
              id: 1,
              name: '全部',
              isSelected: true,
              isRule: true,
              childrenName: [
                {name: '全部', value: filterArray(['fxjkqypccz', 'fxjkssjk']), id: 1, isSelected: true, isRule: true,},
              ]
            },
            {
              id: 2,
              name: '司法风险',
              isSelected: false,
              isRule: isRule(['fxjkqypccz', 'fxjkssjk']),
              childrenName: [
                {name: '全部', value: filterArray(['fxjkqypccz', 'fxjkssjk']), id: 1, isSelected: true, isRule: true },
                {name: '破产重整', value: filterArray(['fxjkqypccz']), id: 2, isSelected: false, isRule: isRule('fxjkqypccz') },
                {name: '涉诉监控', value: filterArray(['fxjkssjk']), id: 3, isSelected: false, isRule: isRule('fxjkssjk') },
              ]
            }
          ],
        },
        {
          id: 3,
          title: '更多筛选',
          isSelected: false,
          type: 'multipleForm',
          conditions: [
            {
              name: '推送日期',
              type: 'time',
              field: ['startTime', 'endTime'],
              value: [],
            }
          ],
        },
      ]
    };
  }

  componentWillMount(): void {
    const onReadyEventId = this.$instance.router.onReady;
    eventCenter.once(onReadyEventId, () => {
      let height = 0;
      Taro.getSystemInfo({
        success: (info) => {
          // console.log('info === ', info);
          height = info.windowHeight;
          // onReady 触发后才能获取小程序渲染层的节点
          Taro.createSelectorQuery().select('#drop')
            .boundingClientRect()
            .exec(res => {
              // console.log('res === ', res, height);
              let scrollHeight = height - res[0].top - res[0].height;
              this.setState({
                scrollHeight,
              })
            })
        }
      });
    });
  }

  componentDidShow() {
    const { monitorParams } = this.props;
    const { currentId, starId, params} = this.state;
    if(Object.keys(monitorParams).length !== 0){
      let tabId = monitorParams.tabId > 0 ? monitorParams.tabId : currentId;
      let newStarId = monitorParams.starId > 0 ? monitorParams.starId : starId;
      let assetAndRiskTypeValue = monitorParams.value ? filterArray([monitorParams.value]).join() : filterArray(tabId === 1 ? assestRuleArray : riskRuleArray).join();
      let newParams = {
        ...params,
        assetAndRiskType: assetAndRiskTypeValue,
        score: getStarValue(tabId, newStarId)
      };
      this.setState({
        queryAssetsConfig: this.handleUpdataConfig(monitorParams),
        queryRiskConfig: this.handleUpdataConfig(monitorParams),
        currentId: tabId,
        starId: newStarId,
        params: {...newParams},
      }, () => {
        this.handleRequestList({...newParams}, true);
      });
    }
    else {
      const { isClose } = this.state;
      if(!isClose){
        this.handleRequestList({...params}, true);
      }
    }
  }

  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>): boolean {
    const { listCount, currentId, page } = this.state;
    return listCount !== nextState.listCount || currentId !== nextState.currentId || page !== nextState.page;
  }

  componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
    const { currentId, starId } = this.state;
    const { monitorParams } = this.props;
    if(JSON.stringify(monitorParams) !== JSON.stringify(nextProps.monitorParams)){
      this.setState({
        starId: monitorParams.starId > 0 ? monitorParams.starId : starId,
        currentId: monitorParams.tabId > 0 ? monitorParams.tabId : currentId,
        queryAssetsConfig: this.handleUpdataConfig(nextProps.monitorParams),
        queryRiskConfig: this.handleUpdataConfig(nextProps.monitorParams),
      })
    }
  }

  componentDidHide(){
    this.setState({
      isClose: true,
    })
  }

  handleUpdataConfig = (params?: any) => {
    const { queryRiskConfig } = this.state;
    const { tabId, value} = params;
    if( tabId === 1 ){
      let assetsConfig =  [...queryRiskConfig];
      assetsConfig[1].isSelected = true;
      assetsConfig[1].title = getRuleName(value);
      return assetsConfig;
    }
    if( tabId === 2 ){
      let riskConfig = [...queryRiskConfig];
      riskConfig[1].isSelected = true;
      riskConfig[1].title = getRuleName(value);
      return riskConfig;
    }
  };

  // 请求资产或者风险列表
  handleRequestList = (payload, isNew: boolean) => {
    const { loading, currentId, assetsList, riskList, page } = this.state;
    if(!loading){
      Taro.showLoading({
        title: '正在加载',
      })
    }
    const { dispatch } = this.props;
    if(currentId === 1){
      dispatch({
        type:'monitor/assetList',
        payload: {
          ...payload,
          page: isNew ? 1 : page,
        }
      }).then(res => {
        const {code, data } = res;
        Taro.hideLoading();
        if(code === 200){
          this.setState({
            page: page + 1,
            assetsList: isNew ? data.list : assetsList.concat(data.list),
            listCount: data.total,
            hasNext: data.hasNext,
          })
        }
      }).catch(err => {
        Taro.hideLoading();
      });
    }
    else {
      dispatch({
        type:'monitor/riskList',
        payload: {
          ...payload,
          page: isNew ? 1 : page,
        }
      }).then(res => {
        const {code, data } = res;
        Taro.hideLoading();
        if(code === 200){
          this.setState({
            page: page + 1,
            riskList: isNew ? data.list : riskList.concat(data.list),
            listCount: data.total,
            hasNext: data.hasNext,
          })
        }
      }).catch(err => {
        Taro.hideLoading();
      });
    }
  };

  // 资产/ 风险tab的切换
  handleClick = (info) => {
    const { params } = this.state;
    let assetAndRiskTypeParams = filterArray(info.id === 1 ? assestRuleArray : riskRuleArray).join();
    let newParams = {...params, assetAndRiskType: assetAndRiskTypeParams};
    this.setState({
      currentId: info.id,
      params: newParams,
      page: 1,
      starId: 1,
    }, () => {
      this.handleRequestList({assetAndRiskType: assetAndRiskTypeParams}, true)
    });
  };

  // 资产里面切换星级，风险里面切风险程度
  handleChangeTab = (info) => {
    const { params, currentId } = this.state;
    let newParams = {...params, score: getStarValue(currentId, info.id)};
    this.setState({
      params: newParams,
      page: 1,
      starId: info.id
    }, () => {
      this.handleRequestList({...newParams}, true);
    });
  };

  handleSetParams = (queryParams) => {
    console.log('queryParams === ', queryParams);
    const { params} = this.state;
    let newParams = {...params, ...queryParams};
    this.setState({
      params: newParams,
      page: 1,
    }, () => {
      this.handleRequestList({...newParams}, true)
    });
  };

  // 点击已读和跳转详情页
  // handleReadListItem = (id, index) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type:'monitor/auctionMarkRead',
  //     payload: {
  //       idList: [`${id}`],
  //     }
  //   }).then(res => {
  //     if(res.code === 200 && res.data){
  //       this.handleUpdateList(1, index);
  //       Taro.navigateTo({
  //         url: `/subpackage/pages/monitor/asset-auction/index`,
  //       })
  //     }
  //     else {
  //       Taro.navigateTo({
  //         url: `/subpackage/pages/monitor/asset-auction/index`,
  //       })
  //     }
  //   })
  // };

  // 可视化滚动的触底函数
  handleScrollToLower = (event) => {
    const { hasNext, params } = this.state;
    if(hasNext){
      this.handleRequestList({...params}, false)
    }
  };

  handleScroll = (event) => {
    const { detail } = event;
    if(detail.scrollHeight > 0){
      this.setState({
        isScroll: true
      })
    }
  };

  backToTop = () => {
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  };

  render () {
    const { isScroll, currentId, scrollHeight, listCount, starId, assetsList, riskList, queryAssetsConfig, queryRiskConfig} = this.state;
    let list = currentId === 1 ?  assetsList : riskList;
    console.log('props === ', JSON.stringify(starId), JSON.stringify(this.props));
    return (
      <View className='monitor'>
        <NavigationBar title={'源诚资产监控'} type={'blue'} color='white'/>
        <Tab config={tabList} onClick={this.handleClick} initId={currentId}/>
        <TagSelected
          initId={starId}
          type={currentId === 1 ? 'assets' : 'risk' }
          onClick={this.handleChangeTab}
        />
        <View id='drop' className='monitor-drop'>
          <QueryDrop
            type={currentId === 1 ? 'assets' : 'risk' }
            initConfig={currentId === 1 ? queryAssetsConfig : queryRiskConfig}
            onsetParams={this.handleSetParams}
          />
        </View>
        {
          listCount === 0 && <View className='monitor-blank'>
            <View className='monitor-blank-segmentation'/>
            <Image className='monitor-blank-pic' src={blankNodata} />
            <View className='monitor-blank-text'>暂未找到相关数据</View>
          </View>
        }
        {
          listCount > 0 && <ScrollView
            scrollY
            className='monitor-scroll'
            enableBackToTop
            style={{height: scrollHeight}}
            onScrollToLower={this.handleScrollToLower}
            onScroll={this.handleScroll}
          >
	          <View className='monitor-tips'>
		          <View className='monitor-tips-notice'>
			          <Text className='iconfont icon-notice monitor-tips-notice-icon'/>
			          <Text className='monitor-tips-notice-text'>
				          为您找到
				          <Text className='monitor-tips-notice-text-count'>{listCount}</Text>
				          条线索
			          </Text>
		          </View>
	          </View>
            {
              list.map((item: any, index: number) => {
                return (
                  item.dataType > 0 ? <ListItem
                    {...item}
                    type={currentId === 1 ? 'assets' : 'risk'}
                    index={index}
                  /> : null
                )
              })
            }
		      </ScrollView>
        }
        {
          isScroll && <View className='monitor-back' onClick={this.backToTop}>
	          <Image src={backTop} className='monitor-back-pic' />
          </View>
        }
      </View>
    )
  }
}
