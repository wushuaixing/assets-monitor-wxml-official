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



interface configType{
  id: number,
  title: string,
  value: string
}

type IProps = {
}

type IState = {
  current: number
  isScroll?: boolean
};

const tabList = [
  { title: '资产线索', id: 1 },
  { title: '风险信息', id: 2 },
];

const queryAssetsConfig = [
  {
    id: 1,
    title: '立案日期',
    isOpen: false,
    isSelectd: false,
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
    title: '线索类型',
    isOpen: false,
    isSelectd: false,
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
      requird: true,
      value: '',
    },
  },
  {
    id: 3,
    title: '更多筛选',
    isOpen: false,
    isSelectd: false,
    conditions: {
      type: 'time',
      field: ['startTime', 'endTime'],
      requird: true,
      value: '',
    },
  },
];
const queryRiskConfig = [
  {
    id: 1,
    title: '立案日期',
    isOpen: false,
    isSelectd: false,
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
    title: '线索类型',
    isOpen: false,
    isSelectd: false,
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
    isOpen: false,
    isSelectd: false,
    conditions: {
      type: 'time',
      field: ['startTime', 'endTime'],
      requird: true,
      value: '',
    },
  },
];

@connect(({ monitor }) => ({ ...monitor }))
export default class Monitor extends Component <IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      isScroll: false,
    };
    this.params = {};
  }


  handleClick = (item) => {
    const params = {...this.params};
    this.params = {...params, type: item.id};
    this.setState({
      current: item.id
    })
  };

  handleChangeTab = (item) => {
    const params = {...this.params};
    this.params = {...params, score: item.value};
  };

  handleSetParams = (queryParams) => {
    const params = {...this.params};
    this.params = {...params, ...queryParams};
    console.log('montior page this.params === ', this.params);
  };

  backToTop = () => {

  }

  handleChangeScroll = (isScroll) => {

  }

  render () {
    const { current, assetsConfig, riskConfig, isScroll} = this.state;
    console.log('parmas === ', this.params);
    return (
      <View className='monitor'>
        <NavigationBar title={'源诚资产监控'} type={'blue'}/>

        <Tab config={tabList} onClick={this.handleClick}/>

        <TagSelected
          type={current === 1 ? 'assets' : 'risk' }
          onClick={this.handleChangeTab}
        />

        <QueryDrop
          type={current === 1 ? 'assets' : 'risk' }
          config={current === 1 ? queryAssetsConfig : queryRiskConfig}
          onsetParams={this.handleSetParams}
        />
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
        <List params={this.params} onChangeScroll={this.handleChangeScroll}/>
      </View>
    )
  }
}
