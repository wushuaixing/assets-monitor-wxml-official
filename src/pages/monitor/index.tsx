import React, { Component } from 'react'
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro'
// import VirtualList from '@tarojs/components/virtual-list'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import { connect } from 'react-redux';
import NavigationBar from '../../components/navigation-bar';
import TagSelected from '../../components/tag-selected';
import QueryDrop from '../../components/query-drop';
import Tab from '../../components/tab';
import ListItem from '../../components/list-item/index';
import blankNodata from '../../assets/img/page/blank_nodate.png';
import { getGlobalData } from "../../utils/const/global";
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

function isRule(rule) {
  let ispermission: number = 0;
  let ruleArray: string[] = getGlobalData('ruleArray');
  if(ruleArray && ruleArray.length > 0 ){
    if(Array.isArray(rule) && rule.length > 0){
      rule.forEach(item => {
        ispermission = ruleArray.includes(item) ? ispermission + 1 : ispermission
      });
      return ispermission > 0
    }
    else {
      return ruleArray.includes(rule)
    }
  }
  else {
    return false
  }
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
  let star = 90;
  if(tabId === 1){
    switch (starId) {
      case 2: star = 90; break;
      case 3: star = 80; break;
      case 4: star = 60; break;
    }
  }
  else {
    switch (starId) {
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
                {name: '全部', value: filterArray(['zcwjzcpm', 'zcwjdwq']), id: 1, isSelected: true, isRule: isRule(['zcwjzcpm', 'zcwjdwq'])},
              ]
            },
            {
              id: 2,
              name: '涉诉资产',
              isSelected: false,
              isRule: true,
              childrenName: [
                {name: '全部', value: filterArray(['zcwjzcpm', 'zcwjdwq']), id: 1, isSelected: true, isRule: isRule(['zcwjzcpm', 'zcwjdwq'])},
                {name: '司法拍卖', value: ['1'], id: 2, isSelected: false, isRule: isRule('zcwjzcpm') },
                {name: '代位权', value: ['2', '3', '4'], id: 3, isSelected: false, isRule: isRule('zcwjdwq')},
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
      params: {
        assetAndRiskType: filterArray(assestRuleArray).join(),
      },
      starId: 1,
      assetsList: [],
      riskList: [],
      scrollHeight: 0,
      page: 1,
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
    const onShowEventId = this.$instance.router.onShow;
    eventCenter.on(onShowEventId, this.onShow);
  }


  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>): boolean {
    const { listCount, currentId} = this.state;
    return listCount !== nextState.listCount || currentId !== nextState.currentId;
  }

  componentWillUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): void {
    const { assetsList, riskList } = this.state;
    if(JSON.stringify(assetsList) !== JSON.stringify(nextState.assetsList)){
      this.setState({
        assetsList: [...nextState.assetsList,]
      })
    }
    if(JSON.stringify(riskList) !== JSON.stringify(nextState.riskList)){
      this.setState({
        riskList: [...nextState.riskList],
      })
    }
  }

  componentWillUnmount () {
    const onShowEventId = this.$instance.router.onShow;
    // 卸载
    eventCenter.off(onShowEventId, this.onShow)
  }

  onShow = () => {
    this.handleDealInitParams()
  };

  // 请求其他页面带来的参数
  handleDealInitParams = () => {
    const { monitorParams } = this.props;
    const { currentId, starId, params } = this.state;
    if(Object.keys(monitorParams).length !== 0){
      let tabId = monitorParams.tabId > 0 ? monitorParams.tabId : currentId;
      let newStarId = monitorParams.starId > 0 ? monitorParams.starId : starId;
      let dataArray = Array.isArray(monitorParams.value) && monitorParams.value.length > 0 ? monitorParams.value : (tabId === 1 ?  assestRuleArray : riskRuleArray );
      let assetAndRiskTypeValue = filterArray(dataArray).join();
      let newParams = {
        ...params,
        assetAndRiskType: assetAndRiskTypeValue,
        score: getStarValue(tabId, newStarId)
      };
      let config = monitorParams.tabId === 1 ? {queryAssetsConfig: this.handleUpdataConfig(monitorParams)} : {queryRiskConfig: this.handleUpdataConfig(monitorParams)};
      // @ts-ignore
      this.setState({
        ...config,
        currentId: tabId,
        starId: newStarId,
        params: {...newParams},
      }, () => {
        console.log('newParams === ', newParams);
        this.handleRequestList({...newParams}, true);
      });
    }
    else {
      const { params } = this.state;
      console.log('newParams === ', params);
      this.handleRequestList({...params}, true);
    }
  };

  // 更新页面的config
  handleUpdataConfig = (params) => {
    const { tabId, value} = params;
    const { queryAssetsConfig, queryRiskConfig } = this.state;
    if( tabId === 1 && Array.isArray(value) && value.length === 1){
      let assetsConfig = [...queryAssetsConfig];
      assetsConfig[1].isSelected = true;
      assetsConfig[1].title = getRuleName(value);
      return assetsConfig;
    }
    if( tabId === 2 && Array.isArray(value) && value.length === 1){
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
          let list = [
            {
              dataType: 5,
              object: {
                obligorName: '乐视网信息科技有限公司',
                bankruptcyType: 1,
                valueLevel: 90,
                publishDate: '2020-12-12',
                isRead: true,
                court: '九江市中级人民法院',
              }
            },
            {
              dataType: 6,
              object: {
                obligorName: '乐视网信息科技有限公司',
                bankruptcyType: 1,
                valueLevel: 60,
                publishDate: '2020-12-12',
                isRead: true,
                court: '九江市中级人民法院',
              }
            },
            {
              dataType: 6,
              object: {
                obligorName: '乐视网信息科技有限公司',
                bankruptcyType: 1,
                valueLevel: 80,
                publishDate: '2020-12-12',
                isRead: true,
                court: '九江市中级人民法院',
              }
            },
            {
              dataType: 6,
              object: {
                obligorName: '乐视网信息科技有限公司',
                bankruptcyType: 1,
                valueLevel: 40,
                publishDate: '2020-12-12',
                isRead: true,
                court: '九江市中级人民法院',
              }
            },
          ];
          this.setState({
            page: page + 1,
            riskList: [...list],
            listCount: 4,
          })
          // this.setState({
          //   page: page + 1,
          //   riskList: isNew ? [...list] : riskList.concat(data.list),
          //   listCount: data.total,
          // })
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
    });
    this.handleRequestList({...newParams}, true);
  };

  handleSetParams = (queryParams) => {
    const { params} = this.state;
    let newParams = {...params, ...queryParams};
    this.setState({
      params: newParams,
    });
    this.handleRequestList({...newParams}, true)
  };


  // 点击已读和跳转详情页
  handleReadListItem = (id) => {
    Taro.navigateTo({
      url: `/subpackage/pages/monitor/asset-auction/index`,
    })
  };

  // 可视化滚动的触底函数
  handleScrollToLower = (event) => {
    const { currentId } = this.state;
    this.handleRequestList({assetAndRiskType: filterArray(currentId === 1 ? ['zcwjzcpm', 'zcwjdwq'] : ['fxjkqypccz', 'fxjkssjk'], '').join()}, false)
  };

  render () {
    const { currentId, scrollHeight, listCount, queryAssetsConfig, queryRiskConfig, starId, assetsList, riskList } = this.state;
    console.log('monitor state === ', this.props, this.state);
    let list = currentId === 1 ? assetsList : riskList;
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
            style={{height: scrollHeight}}
            onScrollToLower={this.handleScrollToLower}
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
              list.map((item: any) => {
                return (
                  <ListItem
                    {...item}
                    onClick={() => this.handleReadListItem(item.object.id)}
                    type={currentId === 1 ? 'assets' : 'risk'}
                  />
                )
              })
            }
		      </ScrollView>
        }
      </View>
    )
  }
}
