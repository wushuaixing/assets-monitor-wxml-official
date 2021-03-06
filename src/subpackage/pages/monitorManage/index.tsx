import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Text, View, Image, Input} from '@tarojs/components'
import {AtTabs} from 'taro-ui'
import './index.scss'
import busEmptyImg from '../../../assets/img/page/blank_nodate.png'
import busSearchEmptyImg from '../../../assets/img/components/blank_noresult.png'
import {Message} from '../../../utils/tools/common'
import ListManage from './listManage';
import Taro, {eventCenter, getCurrentInstance} from '@tarojs/taro';
import SearchInput from './SearchInput';
import DeleteModal from "./deleteModal";
import NavigationBar from '../../../../src/components/navigation-bar';

type isState = {
  current: number,
  searchValue: string,
  dataSource: any,
  curPage: number,
  total: number,
  hasNext: boolean,
  loading: boolean,
  listLoading: boolean,
  scrollHeight: number
}

type IProps = {
  dispatch: ({type: string, payload: object}) => {
    then(param: (result) => void): any;
  },
};
@connect(({monitorManage}) => ({monitorManage}))
export default class MonitorManage extends Component<IProps, isState> {
  $instance = getCurrentInstance();

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      searchValue: '',
      dataSource: [],
      curPage: 1,
      total: 0,
      hasNext: false,
      loading: false,
      listLoading: true,
      scrollHeight: 0
    };
  }

  componentWillMount() {
    const {curPage} = this.state;
    const {router: {params: {type, searchValue}}} = getCurrentInstance();
    this.setState({current: type === 'business' ? 0 : 1, searchValue: searchValue ? searchValue : ''})
    if (type === 'business') {
      this.handleBusinessList(curPage, searchValue ? searchValue : '', 0)
    } else {
      this.handleObligorList(curPage, '', 0)
    }
    const onReadyEventId = this.$instance.router.onReady;
    eventCenter.once(onReadyEventId, () => {
      let height = 0;
      let navBarHeight = 0;
      Taro.getSystemInfo({
        success: (info) => {
          console.log('info === ', info);
          height = info.windowHeight;
          Taro.createSelectorQuery().select('#navBar')
            .boundingClientRect()
            .exec(res => {
              navBarHeight = res[0].height
            })
          Taro.createSelectorQuery().select('#monitorManageHeader')
            .boundingClientRect()
            .exec(res => {
              this.setState({
                scrollHeight: height - navBarHeight - res[0].top - info.statusBarHeight - 50
              })
            })
        }
      });
    });
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
    this.onMiddleClick();
    this.setState({
      current: value,
      searchValue: ''
    })
    if (value) {
      this.handleObligorList(1, '', 0)
    } else {
      this.handleBusinessList(1, '', 0)
    }
  }

  handleChange = (e) => {
    const {current} = this.state;
    if (e.detail.value.length > 40) {
      Message('????????????40??????');
    } else {
      if (e.detail.value === "" && this.state.searchValue === "") {
        console.log('no')
      } else {
        console.log('yes')
        // this.setState({
        //   dataSource: [],
        // })
        if (current) {
          this.handleObligorList(1, e.detail.value, 0)
        } else {
          this.handleBusinessList(1, e.detail.value, 0)
        }
      }
    }
    this.setState({
      searchValue: e.detail.value.slice(0, 40),
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
    })
    if (current) {
      this.handleObligorList(1, '', 0)
    } else {
      this.handleBusinessList(1, '', 0)
    }
  }

  handleObligorList = (pageTemp, searchValue, isScroll) => {
    this.setState({
      loading: true,
      listLoading: !isScroll
    })
    if (!isScroll) {
      Taro.showLoading({title: '????????????...'});
    }
    this.props.dispatch({
      type: 'monitorManage/getObligorList',
      payload: {page: pageTemp, obligorName: searchValue}
    }).then(res => {
      Taro.hideLoading();
      this.setState({
        loading: false,
        listLoading: false
      })
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
      this.setState({
        loading: false,
        listLoading: false
      })
      Taro.hideLoading();
      Message('??????????????????????????????')
    })
  }

  handleBusinessList = (pageTemp, searchValue, isScroll) => {
    this.setState({
      loading: true,
      listLoading: !isScroll
    })
    if (!isScroll) {
      Taro.showLoading({title: '????????????...'});
    }
    this.props.dispatch({
      type: 'monitorManage/getBusinessList',
      payload: {page: pageTemp, caseNumberOrObligorName: searchValue}
    }).then((res) => {
      Taro.hideLoading();
      this.setState({
        loading: false,
        listLoading: false
      })
      if (res.code === 200) {
        const {data: {list, page, total, hasNext}} = res;
        this.setState({
          dataSource: isScroll ? this.state.dataSource.concat(list) : list,
          // dataSource:[],
          curPage: page + 1,
          total,
          hasNext
        })
      } else {
        Message(res.message)
      }
    }).catch(() => {
      this.setState({
        loading: false,
        listLoading: false
      })
      Taro.hideLoading();
      Message('??????????????????????????????')
    })
  }

  onAddBusinessClick = () => {
    const {searchValue} = this.state;
    this.onMiddleClick();
    Taro.navigateTo({url: `/subpackage/pages/monitorManage/addBusiness/index?type=addBus&searchValue=${searchValue}`});
  }

  onMiddleClick = () => {
    this.props.dispatch({
      type: 'monitorManage/getCurClickItem',
      payload: {curClickItem: ''}
    })
  }

  render() {
    const tabList = [
      {title: '??????', id: 1},
      {title: '?????????', id: 2},
    ];
    const {current, searchValue, total, dataSource, loading, listLoading, scrollHeight, hasNext} = this.state;
    console.log('scrollHeight====', scrollHeight)
    const totalNumerText = current ? '????????????' : '???????????????';
    const emptyText = current ? '????????????????????????' : '???????????????????????????';
    const placeholderText = current ? '????????????????????????' : '???????????????????????????????????????????????????';
    const {router: {params: {origin}}} = getCurrentInstance();
    return (
      <View className='yc-monitorManage'>
        <NavigationBar title='????????????' url={origin ? '' : '/pages/index/index'} isTab={!origin}/>
        <View className='yc-monitorManage-header' id='monitorManageHeader'>
          <View className='yc-monitorManage-top'
                style={{height: dataSource.length > 0 || searchValue !== "" ? '181rpx' : '89rpx'}}>
            <View className='yc-monitorManage-top-tab'>
              <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}
                      className='yc-monitorManage-top-tab-atTab'/>
            </View>


            <View onClick={this.onMiddleClick}>
              {
                dataSource.length > 0 || searchValue !== "" ?
                  // <SearchInput searchValue={searchValue} handleChange={this.handleChange}
                  //              onRemoveClick={this.onRemoveClick} current={current}/>
                  <View className='yc-monitorManage-top-search' id='searchHeight'>
                    <Text className="iconfont icon-icon-monitorManage-search yc-monitorManage-top-search-icon"/>
                    <View className='yc-monitorManage-top-search-input'>
                      <Input
                        type='text'
                        placeholder={placeholderText}
                        value={searchValue}
                        onInput={this.handleChange}
                      />
                    </View>
                    {
                      searchValue !== "" ?
                        <Text className="iconfont icon-remove yc-monitorManage-top-search-removeIcon"
                              onClick={this.onRemoveClick}/> :
                        null
                    }

                  </View>
                  : null
              }
            </View>


          </View>


          {
            dataSource.length > 0 && !listLoading ?
              <View className='yc-monitorManage-middle' onClick={this.onMiddleClick}>
                <Text className='yc-monitorManage-middle-text'>??????&nbsp;
                  <Text className='yc-monitorManage-middle-text-number'>{total}</Text>
                  &nbsp;{totalNumerText}</Text>
                {
                  !current &&
                  <View className='yc-monitorManage-addBusinessText' onClick={this.onAddBusinessClick}>????????????</View>
                }
              </View> : null
          }
        </View>

        {
          dataSource.length > 0 && !listLoading ?
            <ListManage
              data={dataSource}
              onScrollToLower={this.handleScrollDown}
              current={current}
              searchValue={searchValue}
              handleBusinessList={() => {
                this.handleBusinessList(1, searchValue, 0)
              }}
              handleObligorList={() => {
                this.handleObligorList(1, searchValue, 0)
              }}
              scrollHeight={scrollHeight}
              hasNext={hasNext}
              loading={loading}
            />
            :
            <View>
              {
                searchValue === '' ?
                  <View>
                    {
                      !listLoading && dataSource.length === 0 ?
                        <View className='yc-monitorManage-businessEmpty'>
                          <View className='yc-monitorManage-businessEmpty-content'>
                            <Image src={busEmptyImg} className='yc-monitorManage-businessEmpty-content-img'/>
                            <View className='yc-monitorManage-businessEmpty-content-text'>{emptyText}</View>
                            {
                              !current ? <View className='yc-monitorManage-businessEmpty-content-addBus'
                                               onClick={this.onAddBusinessClick}>????????????</View> : null
                            }
                          </View>
                        </View>
                        : null
                    }
                  </View>

                  :
                  <View>
                    {
                      !listLoading && dataSource.length === 0 ?
                        <View className='yc-monitorManage-businessEmpty'
                              style={{background: "#F5F5F5", height: '100vh'}}>
                          <View className='yc-monitorManage-businessEmpty-content'>
                            <Image src={busSearchEmptyImg} className='yc-monitorManage-businessEmpty-content-img'/>
                            <View className='yc-monitorManage-businessEmpty-content-text'>????????????????????????</View>
                          </View>
                        </View> : null
                    }
                  </View>

              }
            </View>
        }
        <DeleteModal handleBusinessList={() => {
          this.handleBusinessList(1, searchValue, 0)
        }}/>
      </View>
    )
  }

}
