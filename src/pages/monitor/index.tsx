import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import {View, Text, Image} from '@tarojs/components'
import { connect } from 'react-redux';
import NavigationBar from '../../components/navigation-bar';
import TagSelected from '../../components/tag-selected';
import QueryDrop from '../../components/query-drop';
import Tab from '../../components/tab';
import List from '../../components/list';
import './index.scss'


interface dataItem{
  id: number,
  title: string
  time: string
  star: number
}

interface configType{
  id: number,
  title: string,
  value: string
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
};

const tabList = [
  { title: '资产线索', id: 1 },
  { title: '风险信息', id: 2 },
];

const queryAssetsConfig = [
  {
    id: 1,
    title: '是否已读',
    isSelected: false,
    conditions: {
      type: 'selected',
      field: [
        {name: '全部', id: 1, value: '', isSelected: true},
        {name: '已读', id: 2, value: true, isSelected: false},
        {name: '未读', id: 3, value: false, isSelected: false},
      ],
    }
  },
  {
    id: 2,
    title: '线索类型',
    isSelected: false,
    conditions:   {
      type: 'line-choose',
      field: [
        {
          id: 1,
          name: '全部',
          isSelected: true,
          childrenName: [
            {name: '全部', value: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], id: 1, isSelected: true},
          ]
        },
        {
          id: 2,
          name: '涉诉资产',
          isSelected: false,
          childrenName: [
            {name: '全部', value: ['1', '2', '3', '4'], id: 1, isSelected: false},
            {name: '司法拍卖', value: ['1'], id: 2, isSelected: false},
            {name: '代位权-立案信息', value: ['2'], id: 3, isSelected: false},
            {name: '代位权-开庭公告', value: ['3'], id: 4, isSelected: false},
            {name: '代位权-裁判文书', value: ['4'], id: 5, isSelected: false},
          ]
        }
      ],
    },
  },
  {
    id: 3,
    title: '更多筛选',
    isSelected: false,
    conditions: {
      type: 'time',
      field: ['startTime', 'endTime'],
    },
  },
];
const queryRiskConfig = [
  {
    id: 1,
    title: '是否已读',
    isSelected: false,
    conditions: {
      type: 'selected',
      field: [
        {name: '全部', id: 1, value: '', isSelected: true},
        {name: '已读', id: 2, value: true, isSelected: false},
        {name: '未读', id: 3, value: false, isSelected: false},
      ],
      requird: true,
    }
  },
  {
    id: 2,
    title: '风险类型',
    isSelected: false,
    conditions:   {
      type: 'line-choose',
      field: [
        {
          id: 1,
          name: '全部',
          isSelected: true,
          childrenName: [
            {name: '全部', value: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], id: 1, isSelected: true},
          ]
        },
        {
          id: 2,
          name: '司法风险',
          isSelected: false,
          childrenName: [
            {name: '全部', value: ['1', '2', '3', '4'], id: 1, isSelected: true},
            {name: '破产重整', value: ['5', '6'], id: 2, isSelected: false},
            {name: '涉诉-立案信息', value: ['7'], id: 3, isSelected: false},
            {name: '涉诉-开庭公告', value: ['8'], id: 4, isSelected: false},
            {name: '涉诉-裁判文书', value: ['9'], id: 5, isSelected: false},
          ]
        }
      ],
      requird: true,
      value: '',
    },
  },
  {
    id: 3,
    title: '更多筛选',
    isSelected: false,
    conditions: {
      type: 'time',
      field: ['startTime', 'endTime'],
      requird: true,
      value: '',
    },
  },
];

function buildData (len) {
  return Array(len).fill(0).map((_, i) => { return {
    id: i + 1,
    title: `这是第${i}个title`,
    time: '2021-11-11',
    star: i % 3 + 1,
    dataType: i % 8 + 1,
    isRead: i % 2
  }});
}

@connect(({ monitor, common}) => ({ ...monitor, ...common }))
export default class Monitor extends Component <IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      currentId: 1,
      isScroll: false,
      data: [],
      loading: false,
      count: 0,
    };
    this.params = {};
  }

  componentWillMount(): void {
    const { dispatch } = this.props;
    dispatch({
      type:'monitor/assetList',
      payload: {}
    });
    dispatch({
      type:'monitor/assetListCount',
      payload: {}
    });
  }


  // 资产/ 风险tab的切换
  handleClick = (item) => {
    const params = {...this.params};
    this.params = {...params, type: item.id};
    this.setState({
      currentId: item.id
    })
  };

  // 资产里面切换星级，风险里面切风险程度
  handleChangeTab = (item) => {
    const params = {...this.params};
    this.params = {...params, score: item.value};
    // console.log('tab 222  params === ', this.params);

  };

  handleSetParams = (queryParams) => {
    const params = {...this.params};
    this.params = {...params, ...queryParams};
    // console.log('montior page this.params === ', this.params);
  };

  handleChangeScroll = (isScroll) => {
  };

  render () {
    const { data, currentId, isScroll } = this.state;
    const { list, count } = this.props;
    console.log('page props === ', this.props);

    return (
      <View className='monitor'>
        <NavigationBar title={'源诚资产监控'} type={'blue'}/>

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
          !isScroll &&  <View className='monitor-tips'>
						<View className='monitor-tips-notice'>
              {/*<AtIcon prefixClass='icon' value='notice' className='monitor-tips-icon'/>*/}
							<Text className='iconfont icon-notice monitor-tips-notice-icon'/>
							<Text className='monitor-tips-notice-text'>
								为您找到
								<Text className='monitor-tips-notice-text-count'>{data.length}</Text>
								条线索
							</Text>
						</View>
					</View>
        }
        <List
          data={list}
          listLength={count}
          params={this.params}
          onChangeScroll={this.handleChangeScroll}
        />
      </View>
    )
  }
}
