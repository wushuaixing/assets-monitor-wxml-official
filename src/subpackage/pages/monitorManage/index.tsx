import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Text, View, Image} from '@tarojs/components'
import {AtTabs} from 'taro-ui'
import './index.scss'
import busEmptyImg from '../../../assets/img/page/blank_nodate.png'
import busSearchEmptyImg from '../../../assets/img/components/blank_noresult.png'
import {Message} from '../../../utils/tools/common'
import ListManage from './listManage';
import Taro, {getCurrentInstance} from '@tarojs/taro';
import SearchInput from './SearchInput';

type isState = {
  current: number,
  searchValue: string,
  dataSource: any,
  curPage: number,
  total: number,
  hasNext: boolean,
}

type IProps = {
  dispatch: ({type: string, payload: object}) => {
    then(param: (result) => void): any;
  },
};
@connect(({monitorManage}) => ({monitorManage}))
export default class MonitorManage extends Component<IProps, isState> {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      searchValue: '',
      dataSource: [],
      curPage: 1,
      total: 0,
      hasNext: false,
    };
  }

  componentWillMount() {
    const {curPage} = this.state;
    const {router: {params: {type}}} = getCurrentInstance();
    this.setState({current: type === 'business' ? 0 : 1})
    if (type === 'business') {
      this.handleBusinessList(curPage, '', 0)
    } else {
      this.handleObligorList(curPage, '', 0)
    }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  handleClick = (value) => {
    console.log('value', value)
    this.setState({
      current: value,
      searchValue: ''
    }, () => {
      if (value) {
        this.handleObligorList(1, '', 0)
      } else {
        this.handleBusinessList(1, '', 0)
      }
    })
  }

  handleChange = (value) => {
    console.log('handleChange')
    const {current} = this.state;
    this.setState({
      searchValue: value,
      dataSource: []
    }, () => {
      if (value.length <= 40) {
        if (current) {
          this.handleObligorList(1, value, 0)
        } else {
          this.handleBusinessList(1, value, 0)
        }
      } else {
        Message('最长输入40个字');
      }
    })

  }

  handleScrollDown = () => {
    const {hasNext, current} = this.state;
    if (hasNext) {
      const {curPage, searchValue} = this.state;
      if (current) {
        this.handleObligorList(curPage, searchValue, 1)
      } else {
        this.handleBusinessList(curPage, searchValue, 1)
      }
    }
  }

  onRemoveClick = () => {
    const {current} = this.state
    this.setState({
      searchValue: '',
      dataSource: []
    }, () => {
      if (current) {
        this.handleObligorList(1, '', 0)
      } else {
        this.handleBusinessList(1, '', 0)
      }
    })
  }

  handleObligorList = (pageTemp, searchValue, isScroll) => {
    Taro.showLoading({title: '正在加载...'});
    this.props.dispatch({
      type: 'monitorManage/getObligorList',
      payload: {page: pageTemp, obligorName: searchValue}
    }).then(res => {
      Taro.hideLoading();
      if (res.code === 200) {
        const {data: {list, page, total, hasNext}} = res;
        this.setState({
          dataSource: isScroll ? this.state.dataSource.concat(list) : list,
          curPage: page + 1,
          total,
          hasNext
        })
      } else {
        Message(res.message)
      }
    }).catch(() => {
      Taro.hideLoading();
      Message('网络异常请稍后再试！')
    })
  }

  handleBusinessList = (pageTemp, searchValue, isScroll) => {
    this.props.dispatch({
      type: 'monitorManage/getBusinessList',
      payload: {page: pageTemp, caseNumberOrObligorName: searchValue}
    }).then((res) => {
      const {data: {list, page, total, hasNext}} = res;
      this.setState({
        // dataSource: isScroll ? this.state.dataSource.concat(list) : list,
        dataSource:[],
        curPage: page + 1,
        total,
        hasNext
      })
    })
  }

  onAddBusinessClick = () =>{
    Taro.navigateTo({url:'/subpackage/pages/monitorManage/addBusiness/index'});
  }

  render() {
    const tabList = [
      {title: '业务', id: 1},
      {title: '债务人', id: 2},
    ];
    const {current, searchValue, total,dataSource} = this.state;
    const totalNumerText = current ? '个债务人' : '笔监控业务';
    const emptyText = current ? '暂无监控的债务人' : '您还未添加监控业务';
    return (
      <View className='yc-monitorManage'>
        <View className='yc-monitorManage-header'>
          <View className='yc-monitorManage-top'
                style={{height: dataSource.length > 0 || searchValue !== "" ? '181rpx' : '89rpx'}}>
            <View className='yc-monitorManage-top-tab'>
              <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}
                      className='yc-monitorManage-top-tab-atTab'/>
            </View>
            {
              dataSource.length > 0 || searchValue !== "" ?
                <SearchInput searchValue={searchValue} handleChange={this.handleChange}
                             onRemoveClick={this.onRemoveClick} current={current}/>
                : null
            }

          </View>
          {
            dataSource.length > 0 ?
              <View className='yc-monitorManage-middle'>
                <Text className='yc-monitorManage-middle-text'>共有&nbsp;
                  <Text className='yc-monitorManage-middle-text-number'>{total}</Text>
                  &nbsp;{totalNumerText}</Text>
                {
                  !current && <View className='yc-monitorManage-addBusinessText'>添加业务</View>
                }
              </View> : null
          }
        </View>
        {
          dataSource.length > 0 ?
            <ListManage data={dataSource} onScrollToLower={this.handleScrollDown} current={current}
                        searchValue={searchValue}/>
            :
            <View>
              {
                searchValue === '' ?
                  <View className='yc-monitorManage-businessEmpty'>
                    <View className='yc-monitorManage-businessEmpty-content'>
                      <Image src={busEmptyImg} className='yc-monitorManage-businessEmpty-content-img'/>
                      <View className='yc-monitorManage-businessEmpty-content-text'>{emptyText}</View>
                      {
                        !current ? <View className='yc-monitorManage-businessEmpty-content-addBus' onClick={this.onAddBusinessClick}>添加业务</View> : null
                      }
                    </View>
                  </View> :
                  <View className='yc-monitorManage-businessEmpty' style={{background: "#F5F5F5", height: '100vh'}}>
                    <View className='yc-monitorManage-businessEmpty-content'>
                      <Image src={busSearchEmptyImg} className='yc-monitorManage-businessEmpty-content-img'/>
                      <View className='yc-monitorManage-businessEmpty-content-text'>暂未找到相关数据</View>
                    </View>
                  </View>
              }
            </View>
        }
      </View>
    )
  }

}
