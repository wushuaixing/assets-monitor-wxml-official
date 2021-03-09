import React, {Component} from 'react'
import {View, ScrollView} from '@tarojs/components'
import ObligorListItem from "./obligorListItem";
import BusinessListItem from "./businessListItem/index";
import {connect} from 'react-redux';
import './index.scss'


type isState = {
  refreshDownStatus: boolean
}
@connect(({monitorManage}) => ({monitorManage}))
export default class ListManage extends Component<any, isState> {

  constructor(props) {
    super(props);
    this.state = {
      refreshDownStatus: false
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onScrollToLower = () => {
    console.log("onScrollToLower===")
    const {onScrollToLower} = this.props;
    if (onScrollToLower) onScrollToLower();
  }

  onRefresherRefresh = () => {
    this.setState({
      refreshDownStatus: true
    })
    console.log('onRefresherRefresh===')
    const {current} = this.props;
    if (current) {
      const {handleObligorList} = this.props;
      if (handleObligorList) {
        handleObligorList();
        setTimeout(() => {
          this.setState({
            refreshDownStatus: false
          })
        })
      }
    } else {
      const {handleBusinessList} = this.props;
      if (handleBusinessList) {
        handleBusinessList();
        setTimeout(() => {
          this.setState({
            refreshDownStatus: false
          })
        })
      }
    }
  }

  onRefresherRestore = () => {
    console.log('onRefresherRestore===')
  }

  onScroll = () => {
    const {curClickItem} = this.props.monitorManage;
    if (curClickItem !== '') {
      this.props.dispatch({
        type: 'monitorManage/getCurClickItem',
        payload: {curClickItem: ''}
      })
    }
  }

  render() {
    const {data, current, searchValue, handleBusinessList, loading, scrollHeight} = this.props;
    const {refreshDownStatus} = this.state;
    console.log('scrollHeight123===', scrollHeight)
    return (
      <View className='yc-monitorManage-bottom' id='scrollViewHeight'>
        <ScrollView
          style={{height: scrollHeight}}
          scrollY
          scrollWithAnimation
          lowerThreshold={60}
          // refresherThreshold={0}
          // upperThreshold={1}
          refresherTriggered={refreshDownStatus}
          onScrollToLower={this.onScrollToLower}
          onRefresherRefresh={this.onRefresherRefresh}
          refresherEnabled
          refresherDefaultStyle='none'
          refresherBackground='transparent none no-repeat no-scroll 0% 0%'
          onRefresherRestore={this.onRefresherRestore}
          onScroll={this.onScroll}
        >
          {
            current ? <ObligorListItem data={data} type='obligor'/> :
              <BusinessListItem data={data} searchValue={searchValue} handleBusinessList={handleBusinessList}/>
          }

        </ScrollView>
      </View>
    )
  }
}
