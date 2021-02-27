import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import {View, Text, Image} from '@tarojs/components'
import { connect } from 'react-redux';
import NavigationBar from '../../components/navigation-bar';
import TagSelected from '../../components/tag-selected';
import QueryDrop from '../../components/query-drop';
import Tab from '../../components/tab';
import List from '../../components/list';
import blankNodata from '../../assets/img/page/blank_nodate.png';
import { getGlobalData } from "../../utils/const/global";
import './index.scss'


interface dataItem{
  id: number,
  title: string
  time: string
  star: number
}


type IProps = {
  dispatch: (params: any) => void
  list: dataItem[]
}

type IState = {
  currentId: number
  isScroll?: boolean
  data: dataItem[]
  loading: boolean
  count: number
  queryAssetsConfig: any
  queryRiskConfig: any
  params: any
};

const tabList = [
  { title: '资产线索', id: 1 },
  { title: '风险信息', id: 2 },
];

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

function filterArray(rule, initValue) {
  let ruleArray: string[] = getGlobalData('ruleArray');
  let resultArray = [];
  if(ruleArray && ruleArray.length > 0 ){
    if(Array.isArray(rule) && rule.length > 0){
      rule.forEach(item => {
        if(ruleArray.includes(item)){
          let itemArr = getRuleValue(item);
          console.log('itemArr === ', itemArr);
          resultArray = [...resultArray, ...getRuleValue(item)]
        }
      });
      return  resultArray;
    }
    else {
      return ruleArray.includes(rule) ? [`${initValue}`] : ['']
    }
  }
  else {
    return []
  }
}


@connect(({ monitor, queryDrop}) => ({ ...monitor, ...queryDrop }))
export default class Monitor extends Component <IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      currentId: 1,
      isScroll: false,
      data: [],
      loading: false,
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
                {name: '全部', value: ['zcwjzcpm', 'zcwjdwq'], id: 1, isSelected: true, isRule: true},
              ]
            },
            {
              id: 2,
              name: '涉诉资产',
              isSelected: false,
              isRule: true,
              childrenName: [
                {name: '全部', value: ['zcwjzcpm', 'zcwjdwq'], id: 1, isSelected: true, isRule: true},
                {name: '司法拍卖', value: ['zcwjzcpm'], id: 2, isSelected: false, isRule: true },
                {name: '代位权-立案信息', value: ['zcwjdwq'], id: 3, isSelected: false, isRule: true},
                {name: '代位权-开庭公告', value: ['zcwjdwq'], id: 4, isSelected: false, isRule: true},
                {name: '代位权-裁判文书', value: ['zcwjdwq'], id: 5, isSelected: false, isRule: true},
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
                {name: '全部', value: filterArray(['fxjkqypccz', 'fxjkssjk'], ''), id: 1, isSelected: true, isRule: true,},
              ]
            },
            {
              id: 2,
              name: '司法风险',
              isSelected: false,
              isRule: isRule(['fxjkqypccz', 'fxjkssjk']),
              childrenName: [
                {name: '全部', value: filterArray(['fxjkqypccz', 'fxjkssjk'], ''), id: 1, isSelected: true, isRule: true },
                {name: '破产重整', value: filterArray('fxjkqypccz', '5'), id: 2, isSelected: false, isRule: isRule('fxjkqypccz') },
                {name: '涉诉-立案信息', value: filterArray('fxjkssjk', '6'), id: 3, isSelected: false, isRule: isRule('fxjkssjk') },
                {name: '涉诉-开庭公告', value: filterArray('fxjkssjk', '7'), id: 4, isSelected: false, isRule: isRule('fxjkssjk') },
                {name: '涉诉-裁判文书', value: filterArray('fxjkssjk', '8'), id: 5, isSelected: false, isRule: isRule('fxjkssjk') },
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
      params: {}
    };
  }

  componentWillMount(): void {
    this.handleRequestList({});
  }




  handleRequestList = (payload) => {
    console.log('new payload === ', payload);
    const { currentId } = this.state;
    const { dispatch } = this.props;
    if(currentId === 1){
      // dispatch({
      //   type:'monitor/assetList',
      //   payload: payload
      // });
      // dispatch({
      //   type:'monitor/assetListCount',
      //   payload: payload
      // });
    }
    else {
      // dispatch({
      //   type:'monitor/riskList',
      //   payload: payload
      // });
      // dispatch({
      //   type:'monitor/riskListCount',
      //   payload: payload
      // });
    }
  };

  // 资产/ 风险tab的切换
  handleClick = (info) => {
    this.setState({
      currentId: info.id
    });
    this.handleRequestList({})
  };

  // 资产里面切换星级，风险里面切风险程度
  handleChangeTab = (info) => {
    const { currentId, params} = this.state;
    let newParams = {...params, score: info.value};
    this.setState({
      params: newParams,
    });
    this.handleRequestList({...newParams});
  };

  handleSetParams = (queryParams) => {
    const { currentId, params} = this.state;
    let newParams = {...params, ...queryParams};
    this.setState({
      params: newParams,
    });
    this.handleRequestList({...newParams})
  };

  handleChangeScroll = (isScroll) => {
  };

  render () {
    const { currentId, isScroll, queryAssetsConfig, queryRiskConfig} = this.state;
    const { count } = this.props;
    // console.log('monitor state === ',this.state);
    return (
      <View className='monitor'>
        <NavigationBar title={'源诚资产监控'} type={'blue'} color='white'/>
        <Tab config={tabList} onClick={this.handleClick}/>
        <TagSelected
          type={currentId === 1 ? 'assets' : 'risk' }
          onClick={this.handleChangeTab}
        />
        <QueryDrop
          type={currentId === 1 ? 'assets' : 'risk' }
          initConfig={currentId === 1 ? queryAssetsConfig : queryRiskConfig}
          onsetParams={this.handleSetParams}
        />
        {
          count === 0 ? <View className='monitor-blank'>
            <View className='monitor-blank-segmentation'/>
            <Image className='monitor-blank-pic' src={blankNodata} />
            <View className='monitor-blank-text'>暂未找到相关数据</View>
          </View> : null
        }
        {
          !isScroll && count > 0 && <View className='monitor-tips'>
						<View className='monitor-tips-notice'>
              {/*<AtIcon prefixClass='icon' value='notice' className='monitor-tips-icon'/>*/}
							<Text className='iconfont icon-notice monitor-tips-notice-icon'/>
							<Text className='monitor-tips-notice-text'>
								为您找到
								<Text className='monitor-tips-notice-text-count'>{count}</Text>
								条线索
							</Text>
						</View>
					</View>
        }
        {/*{*/}
        {/*  count > 0 && <List*/}
				{/*		data={currentId === 1 ? [...assetsList] : [...riskList]}*/}
				{/*		count={count}*/}
				{/*		params={this.params}*/}
				{/*		onChangeScroll={this.handleChangeScroll}*/}
				{/*	/>*/}
        {/*}*/}
      </View>
    )
  }
}
