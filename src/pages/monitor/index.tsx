import React, { Component } from 'react'
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import { connect } from 'react-redux';
import {handleDealAuthRule, isRule } from '../../utils/tools/common';
import NavigationBar from '../../components/navigation-bar';
import TagSelected from '../../components/tag-selected';
import QueryDrop from '../../components/query-drop';
import Tab from '../../components/tab';
import ListItem from '../../components/list-item/index';
import blankNodata from '../../assets/img/page/blank_nodate.png';
import {getGlobalData, setGlobalData} from "../../utils/const/global";
import backTop from '../../assets/img/components/back-top.png'
import { getStarValue, getRuleName, filterArray, getUpdateRuleConfig } from './config';
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
  scrollTop: number
};

const tabList = [
  { title: '资产线索', id: 1 },
  { title: '风险信息', id: 2 },
];

let assestRuleArray = ['zcwjzcpm', 'zcwjdwq'];
let riskRuleArray = ['fxjkqypccz', 'fxjkssjk'];

const initialAssetsConfig = [
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
          {name: '全部', value: ['zcwjzcpm', 'zcwjdwq'], id: 1, isSelected: true, isRule: true},
        ]
      },
      {
        id: 2,
        name: '诉讼资产',
        isSelected: false,
        isRule: true,
        childrenName: [
          {name: '全部', value: ['zcwjzcpm', 'zcwjdwq'], id: 1, isSelected: true, isRule: true },
          {name: '资产拍卖', value: ['zcwjzcpm'], id: 2, isSelected: false, isRule: 'zcwjzcpm'},
          {name: '代位权', value: ['zcwjdwq'], id: 3, isSelected: false, isRule: 'zcwjdwq'},
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
];
const initialRiskConfig = [
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
          {name: '全部', value: ['fxjkqypccz', 'fxjkssjk'], id: 1, isSelected: true, isRule: true,},
        ]
      },
      {
        id: 2,
        name: '司法风险',
        isSelected: false,
        isRule: true,
        childrenName: [
          {name: '全部', value: ['fxjkqypccz', 'fxjkssjk'], id: 1, isSelected: true, isRule: true },
          {name: '破产重整', value: ['fxjkqypccz'], id: 2, isSelected: false, isRule: 'fxjkqypccz'},
          {name: '涉诉信息', value: ['fxjkssjk'], id: 3, isSelected: false, isRule: 'fxjkssjk'},
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
];

@connect(({ home, monitor, queryDrop}) => ({ ...home, ...monitor, ...queryDrop }))
export default class Monitor extends Component <IProps, IState>{
  $instance = getCurrentInstance();
  constructor(props) {
    super(props);
    this.state = {
      currentId: 1,
      isScroll: false,
      loading: true,
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
      scrollTop: 0,
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
    // 设置第一次进入监控页触发加载
    setGlobalData('refreshMonitor', true);
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
    const {  dispatch } = this.props;
    if(getGlobalData('refreshMonitor')){
      dispatch({
        type: 'home/getAuthRule',
        payload: {}
      }).then(res => {
        if(res.code === 200){
          let ruleArray = handleDealAuthRule(res.data.orgPageGroups);
          setGlobalData('ruleArray', ruleArray);
          let assetsConfig = getUpdateRuleConfig(JSON.parse(JSON.stringify(initialAssetsConfig)));
          let riskConfig = getUpdateRuleConfig( JSON.parse(JSON.stringify(initialRiskConfig)));
          const { monitorParams } = this.props;
          const { currentId, starId, params} = this.state;
          // console.log(' monitorParams 111=== ', monitorParams);
          if(monitorParams && Object.keys(monitorParams).length > 0){
            let tabId = monitorParams.tabId > 0 ? monitorParams.tabId : currentId;
            let newStarId = monitorParams.starId > 0 ? monitorParams.starId : starId;
            let assetAndRiskTypeValue = monitorParams.value ? filterArray([monitorParams.value]).join() : filterArray(tabId === 1 ? assestRuleArray : riskRuleArray).join();
            let newParams = {
              ...params,
              assetAndRiskType: assetAndRiskTypeValue,
              score: getStarValue(tabId, newStarId)
            };
            this.setState({
              queryAssetsConfig: this.handleUpdataConfig(JSON.parse(JSON.stringify(assetsConfig)), monitorParams),
              queryRiskConfig: this.handleUpdataConfig(JSON.parse(JSON.stringify(riskConfig)), monitorParams),
              currentId: tabId,
              starId: newStarId,
              params: {...newParams},
              loading: true,
            }, () => {
              this.handleRequestList({...newParams}, true);
            });
          }
          else {
            this.setState({
              queryAssetsConfig: JSON.parse(JSON.stringify(assetsConfig)),
              queryRiskConfig: JSON.parse(JSON.stringify(riskConfig)),
              loading: true,
            }, () => {
              this.handleRequestList({...params}, true);
            });
          }
        }
      }).catch(() => {});
    }
  }

  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>): boolean {
    const { listCount, currentId, page, isScroll} = this.state;
    return listCount !== nextState.listCount || currentId !== nextState.currentId || page !== nextState.page || isScroll !== nextState.isScroll;
  }

  componentWillReceiveProps(nextProps: Readonly<IProps>, nextContext: any): void {
    const { currentId, starId } = this.state;
    const { monitorParams } = this.props;
    if(JSON.stringify(monitorParams) !== JSON.stringify(nextProps.monitorParams)){
      this.setState({
        starId: monitorParams.starId > 0 ? monitorParams.starId : starId,
        currentId: monitorParams.tabId > 0 ? monitorParams.tabId : currentId,
      })
    }
  }

  // 手动更新下拉框的配置
  handleUpdataConfig = (config, params?: any) => {
    const { tabId, value} = params;
    if( tabId === 1 && value){
      let assetsConfig =  [...config];
      assetsConfig[1].isSelected = true;
      assetsConfig[1].title = getRuleName(value);
      return assetsConfig;
    }
    if( tabId === 2 && value ){
      let riskConfig = [...config];
      riskConfig[1].isSelected = true;
      riskConfig[1].title = getRuleName(value);
      return riskConfig;
    }
    return JSON.parse(JSON.stringify(config));
  };

  // 请求资产或者风险列表
  handleRequestList = (payload, isNew: boolean) => {
    const { currentId, assetsList, riskList, page } = this.state;
    const { dispatch } = this.props;
    if(currentId === 1){
      Taro.showLoading({
        title: '正在加载',
      });
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
            loading: false,
            page: page + 1,
            assetsList: isNew ? data.list : assetsList.concat(data.list),
            listCount: data.total,
            hasNext: data.hasNext,
          })
        }
      }).catch(err => {
        Taro.hideLoading();
        this.setState({
          loading: false,
        })
      });
    }
    else {
      Taro.showLoading({
        title: '正在加载',
      });
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
            loading: false,
            page: page + 1,
            riskList: isNew ? data.list : riskList.concat(data.list),
            listCount: data.total,
            hasNext: data.hasNext,
          })
        }
      }).catch(err => {
        Taro.hideLoading();
        this.setState({
          loading: false,
        })
      });
    }
  };

  // 资产/ 风险tab的切换
  handleClick = (info) => {
    const { loading, params } = this.state;
    let assetAndRiskTypeParams = filterArray(info.id === 1 ? assestRuleArray : riskRuleArray).join();
    let newParams = {...params, assetAndRiskType: assetAndRiskTypeParams};
    this.setState({
      queryAssetsConfig: getUpdateRuleConfig(JSON.parse(JSON.stringify(initialAssetsConfig))),
      queryRiskConfig: getUpdateRuleConfig(JSON.parse(JSON.stringify(initialRiskConfig))),
      currentId: info.id,
      loading: true,
      params: newParams,
      page: 1,
      starId: 1,
    }, () => {
      this.backToTop();
      this.handleRequestList({assetAndRiskType: assetAndRiskTypeParams}, true)
    });
  };

  // 资产里面切换星级，风险里面切风险程度
  handleChangeTab = (info) => {
    const { loading, params, currentId } = this.state;
    if(!loading){
      let newParams = {...params, score: getStarValue(currentId, info.id)};
      this.setState({
        params: newParams,
        page: 1,
        starId: info.id,
        loading: true,
      }, () => {
        this.backToTop();
        this.handleRequestList({...newParams}, true);
      });
    }
  };

  // 子组件向上传的参数
  handleSetParams = (queryParams) => {
    const { loading, params} = this.state;
    if(!loading){
      let newParams = {...params, ...queryParams};
      this.setState({
        params: newParams,
        page: 1,
        loading: true,
      }, () => {
        this.backToTop();
        this.handleRequestList({...newParams}, true)
      });
    }
  };

  // 可视化滚动的触底函数
  handleScrollToLower = (event) => {
    const { hasNext, params } = this.state;
    if(hasNext){
      this.setState({
        loading: true,
      }, () => {
        this.handleRequestList({...params}, false)
      });
    }
  };

  // 监听滚动条
  handleScroll = (event) => {
    const { detail } = event;
    if(detail.scrollTop > 100){
      this.setState({
        isScroll: true
      })
    }
  };

  // 回到顶部
  backToTop = () => {
    this.setState({
      isScroll: false,
      scrollTop: 0,
    })
  };

  render () {
    const { scrollTop, isScroll, currentId, scrollHeight, listCount, starId, assetsList, riskList, queryAssetsConfig, queryRiskConfig, loading} = this.state;
    let list = currentId === 1 ? assetsList : riskList;
    // console.log('scrollTop === ', scrollTop);
    // console.log('monitor === ',  JSON.stringify(queryAssetsConfig));
    return (
      <View className='monitor'>
        <NavigationBar title={'源诚资产监控'} type={'blue'} color='white'/>
        <Tab config={tabList} onClick={this.handleClick} initId={currentId} loading={loading}/>
        <TagSelected
          initId={starId}
          type={currentId === 1 ? 'assets' : 'risk' }
          onClick={this.handleChangeTab}
          loading={loading}
        />
        <View id='drop' className='monitor-drop'>
          <QueryDrop
            type={currentId === 1 ? 'assets' : 'risk' }
            initConfig={currentId === 1 ? queryAssetsConfig : queryRiskConfig}
            onsetParams={this.handleSetParams}
            loading={loading}
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
            className='monitor-scroll'
            scrollY={true}
            enableBackToTop={true}
            style={{height: scrollHeight}}
            scrollTop={scrollTop}
            onScroll={this.handleScroll}
            onScrollToLower={this.handleScrollToLower}
            scrollWithAnimation={true}
          >
	          <View className='monitor-tips'>
		          <View className='monitor-tips-notice'>
			          <Text className='iconfont icon-notice monitor-tips-notice-icon'/>
			          <Text className='monitor-tips-notice-text'>
				          为您找到
				          <Text className='monitor-tips-notice-text-count'>{listCount}</Text>
				          条
                  {
                    currentId === 1 ? '资产线索' : '风险信息'
                  }
			          </Text>
		          </View>
	          </View>
            {
              list.map((item: any, index: number) => {
                return (
                  item.dataType > 0 ? <ListItem
                    loading={loading}
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
