import React, { Component } from 'react'
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import { connect } from 'react-redux';
import moment from "moment";
import {handleDealAuthRule, isRule } from '../../utils/tools/common';
import NavigationBar from '../../components/navigation-bar';
import TagSelected from '../../components/tag-selected';
import QueryDrop from '../../components/query-drop';
import Tab from '../../components/tab';
import ListItem from '../../components/list-item/index';
import blankNodata from '../../assets/img/page/blank_nodate.png';
import { setGlobalData} from "../../utils/const/global";
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
    dateType: string
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
  queryAssetsConfig: any
  queryRiskConfig: any
  params: any
  starId?: number
  listCount: number
  scrollHeight: number
  page: number
  hasNext: boolean
  scrollTop: number
  isShowBottom: boolean
  isPropsMask: boolean
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
          {name: '诉讼资产-全部', value: ['zcwjzcpm', 'zcwjdwq'], id: 1, isSelected: true, isRule: true },
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
        field: ['updateTimeStart', 'updateTimeEnd'],
        value: [],
        chooseType: 'quickTimeTag',
        chooseTag: [
          {name: '今天', value: '1', active: false},
          {name: '近七天', value: '2', active: false},
          {name: '全部', value: '3', active: false},
        ]
      },
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
          {name: '司法风险-全部', value: ['fxjkqypccz', 'fxjkssjk'], id: 1, isSelected: true, isRule: true },
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
        field: ['updateTimeStart', 'updateTimeEnd'],
        value: [],
        chooseType: 'quickTimeTag',
        chooseTag: [
          {name: '今天', value: '1', active: false},
          {name: '近七天', value: '2', active: false},
          {name: '全部', value: '3', active: false},
        ]
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
      starId: 1,
      assetsList: [],
      riskList: [],
      scrollHeight: 0,
      page: 1,
      hasNext: false,
      scrollTop: 0,
      isShowBottom: false,
      isPropsMask: false,
      params: {
        assetAndRiskType: filterArray(assestRuleArray).join(),
      },
      queryAssetsConfig: [
        {
          id: 1,
          title: '是否已读',
          isSelected: false,
          field: 'isRead',
          type: 'singelSelected',
          value: '',
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
          value: '',
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
                {name: '涉诉资产-全部', value: filterArray(['zcwjzcpm', 'zcwjdwq']), id: 1, isSelected: true, isRule: true },
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
              value: '',
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
                {name: '司法风险-全部', value: filterArray(['fxjkqypccz', 'fxjkssjk']), id: 1, isSelected: true, isRule: true },
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
          height = info.windowHeight;
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
    const { dispatch } = this.props;
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
        const { currentId, starId } = this.state;
        // console.log('monitorParams === ', monitorParams, JSON.stringify(monitorParams));
        if(monitorParams && Object.keys(monitorParams).length > 0){
          this.backToTop();
          let tabId = monitorParams.tabId > 0 ? monitorParams.tabId : currentId;
          let newStarId = monitorParams.starId > 0 ? monitorParams.starId : starId;
          let assetAndRiskTypeValue = monitorParams.value ? filterArray([monitorParams.value]).join() : filterArray(tabId === 1 ? assestRuleArray : riskRuleArray).join();
          let newParams = {
            assetAndRiskType: assetAndRiskTypeValue,
            score: getStarValue(tabId, newStarId),
            updateTimeStart: monitorParams.dateType !== '1' ? (monitorParams.dateType === '2' ? moment().subtract(7, 'd').format('YYYY-MM-DD') : undefined) : moment().format('YYYY-MM-DD'),
            updateTimeEnd: monitorParams.dateType === '3' ? undefined : moment().format('YYYY-MM-DD'),
          };
          this.setState({
            queryAssetsConfig: this.handleUpdataConfig(JSON.parse(JSON.stringify(assetsConfig)), monitorParams),
            queryRiskConfig: this.handleUpdataConfig(JSON.parse(JSON.stringify(riskConfig)), monitorParams),
            currentId: tabId,
            starId: newStarId,
            params: {...newParams},
            loading: true,
            isPropsMask: false,
          }, () => {
            this.handleRequestList({...newParams}, true);
          });
        }
        else {
          this.setState({
            queryAssetsConfig: JSON.parse(JSON.stringify(assetsConfig)),
            queryRiskConfig: JSON.parse(JSON.stringify(riskConfig)),
            params: {
              assetAndRiskType: filterArray(assestRuleArray).join(),
            },
            loading: true,
            isPropsMask: false,
          }, () => {
            this.handleRequestList({
              assetAndRiskType: filterArray(assestRuleArray).join(),
            }, true);
          });
        }
      }
    }).catch(() => {});
  }

  shouldComponentUpdate(_nextProps: Readonly<IProps>, nextState: Readonly<IState>): boolean {
    const { listCount, currentId, page, isScroll, starId} = this.state;
    return listCount !== nextState.listCount || currentId !== nextState.currentId || page !== nextState.page || isScroll !== nextState.isScroll || starId !== nextState.starId;
  }

  componentWillReceiveProps(nextProps: Readonly<IProps> ): void {
    const { currentId, starId } = this.state;
    const { monitorParams } = this.props;
    if(JSON.stringify(monitorParams) !== JSON.stringify(nextProps.monitorParams)){
      this.setState({
        starId: monitorParams.starId > 0 ? monitorParams.starId : starId,
        currentId: monitorParams.tabId > 0 ? monitorParams.tabId : currentId,
      })
    }
  }

  componentDidHide (): void {
    let assetsConfig = getUpdateRuleConfig(JSON.parse(JSON.stringify(initialAssetsConfig)));
    let riskConfig = getUpdateRuleConfig( JSON.parse(JSON.stringify(initialRiskConfig)));
    const { dispatch } = this.props;
    dispatch({
      type: 'home/emptyMonitorParams',
      payload: {}
    });
    this.setState({
      isPropsMask: false,
      page: 1,
      starId: 1,
      currentId: 1,
      params: {
        assetAndRiskType: filterArray(assestRuleArray).join()
      },
      queryAssetsConfig: assetsConfig,
      queryRiskConfig: riskConfig,
    })
  }

  // 手动更新下拉框的配置
  handleUpdataConfig = (config, params: {tabId?: number, value?: string, dateType: string}) => {
    const { tabId, value, dateType } = params;
    if( tabId === 1 ){
      let assetsConfig = [...config];
      if(value){
        assetsConfig[1].isSelected = true;
        assetsConfig[1].title = getRuleName(value);
      }
      let newChooseTag: any = [];
      let chooseTag = assetsConfig[2].conditions[0].chooseTag;
      chooseTag.forEach(item => {
        newChooseTag.push({...item, active: item.value === dateType })
      });
      let conditions = JSON.parse(JSON.stringify(assetsConfig[2].conditions[0]));
      conditions.chooseTag = JSON.parse(JSON.stringify(newChooseTag));
      assetsConfig[2].conditions[0] = conditions;
      return assetsConfig;
    }
    if( tabId === 2 ){
      let riskConfig = [...config];
      if(value){
        riskConfig[1].isSelected = true;
        riskConfig[1].title = getRuleName(value);
      }
      let newChooseTag: any = [];
      let chooseTag = riskConfig[2].conditions[0].chooseTag;
      chooseTag.forEach(item => {
        newChooseTag.push({...item, active: item.value === dateType })
      });
      riskConfig[2].conditions[0].chooseTag = JSON.parse(JSON.stringify(newChooseTag));
      return riskConfig;
    }
    return JSON.parse(JSON.stringify(config));
  };

  // 请求资产或者风险列表
  handleRequestList = (payload, isNew: boolean) => {
    const { currentId, assetsList, riskList, page } = this.state;
    const { dispatch } = this.props;
    if(currentId === 1){
      if(page === 1){
        Taro.showLoading({
          title: '正在加载',
        });
      }
      dispatch({
        type:'monitor/assetList',
        payload: {
          ...payload,
          page: isNew ? 1 : page,
        }
      }).then(res => {
        const {code, data } = res;
        if(page === 1){
          Taro.hideLoading();
        }
        if(code === 200){
          this.setState({
            loading: false,
            page: data.page + 1,
            assetsList: isNew ? data.list : assetsList.concat(data.list),
            listCount: data.total,
            hasNext: data.hasNext,
          })
        }
        else {
          this.setState({
            loading: false,
            listCount: 0,
            hasNext: false,
          })
        }
      }).catch(err => {
        console.log('page err === ', err);
        if(page === 1){
          Taro.hideLoading();
        }
        this.setState({
          loading: false,
        })
      });
    }
    else {
      if(page === 1){
        Taro.showLoading({
          title: '正在加载',
        });
      }
      dispatch({
        type:'monitor/riskList',
        payload: {
          ...payload,
          page: isNew ? 1 : page,
        }
      }).then(res => {
        const {code, data } = res;
        if(page === 1){
          Taro.hideLoading();
        }
        if(code === 200){
          this.setState({
            loading: false,
            page: data.page + 1,
            riskList: isNew ? data.list : riskList.concat(data.list),
            listCount: data.total,
            hasNext: data.hasNext,
          })
        }
        else {
          this.setState({
            loading: false,
            listCount: 0,
            hasNext: false,
          })
        }
      }).catch(err => {
        if(page === 1){
          Taro.hideLoading();
        }
        this.setState({
          loading: false,
        })
      });
    }
  };

  // 资产/ 风险tab的切换
  handleClick = (info) => {
    let assetAndRiskTypeParams = filterArray(info.id === 1 ? assestRuleArray : riskRuleArray).join();
    let newParams = { assetAndRiskType: assetAndRiskTypeParams};
    this.setState({
      queryAssetsConfig: getUpdateRuleConfig(JSON.parse(JSON.stringify(initialAssetsConfig))),
      queryRiskConfig: getUpdateRuleConfig(JSON.parse(JSON.stringify(initialRiskConfig))),
      currentId: info.id,
      loading: true,
      params: newParams,
      page: 1,
      starId: 1,
      isPropsMask: false,
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
        isPropsMask: false,
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
    if(detail.scrollTop <= 100){
      this.setState({
        isScroll: false
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
    const { scrollTop, isPropsMask, isScroll, currentId, scrollHeight, listCount, starId, assetsList, riskList, queryAssetsConfig, queryRiskConfig, loading, hasNext } = this.state;
    let list = currentId === 1 ? assetsList : riskList;
    // console.log('queryAssetsConfig === ', queryAssetsConfig, JSON.stringify(queryAssetsConfig));
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
        <View id='drop'>
          <QueryDrop
            type={currentId === 1 ? 'assets' : 'risk' }
            initConfig={currentId === 1 ? queryAssetsConfig : queryRiskConfig}
            onsetParams={this.handleSetParams}
            loading={loading}
            isPropsMask={isPropsMask}
          />
          {
            isScroll && <View className='monitor-drop'/>
          }
        </View>
        {
          listCount === 0 && !loading && <View className='monitor-blank'>
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
            {
              !loading && <View className='monitor-tips'>
	              <Text className='iconfont icon-notice monitor-tips-icon'/>
	              <Text className='monitor-tips-text'>
		              为您找到
		              <Text className='monitor-tips-text-count'>{listCount}</Text>
		              条
                  {
                    currentId === 1 ? '资产线索' : '风险信息'
                  }
	              </Text>
              </View>
            }
            {
              list.map((item: any, index: number) => {
                return (
                  item.dataType > 0 ? <ListItem
                    loading={loading}
                    {...item}
                    type={currentId === 1 ? 'assets' : 'risk'}
                    index={index}
                    listCount={listCount}
                  /> : null
                )
              })
            }
            {
              hasNext ? <View className='monitor-scroll-more' >正在加载中...</View> : (!loading && <View className='monitor-scroll-done'>
	              <View className='monitor-scroll-done-left' />
	              <View className='monitor-scroll-done-text'>我是有底线的</View>
	              <View className='monitor-scroll-done-right' />
              </View>)
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
