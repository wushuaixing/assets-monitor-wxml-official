import React, {Component} from 'react'
import Taro, {eventCenter, getCurrentInstance} from '@tarojs/taro';
import {connect} from 'react-redux';
import {Text, View, Image, ScrollView} from '@tarojs/components'
import ObligorListItem from "../obligorListItem";
import DeleteModal from "../deleteModal";
import './index.scss'
import {dateToFormat} from '../../../../utils/tools/common';
import NavigationBar from "../../../../components/navigation-bar";
import {AtActivityIndicator} from "taro-ui";

type isState = {
  busBaseInfo: object,
  relationObligorList: any,
  saveSearchValue: string,
  scrollHeight: number,
}

type IProps = {
  dispatch: ({type: string, payload: object}) => {
    then(param: (result) => void): any;
  },
};
@connect(({monitorManage}) => ({monitorManage}))
export default class BusinessDetail extends Component<IProps, isState> {
  $instance = getCurrentInstance();

  constructor(props) {
    super(props);
    this.state = {
      busBaseInfo: {},
      relationObligorList: [],
      saveSearchValue: '',
      scrollHeight: 0
    };
  }

  componentWillMount() {
    console.log("getCurrentInstance()", getCurrentInstance())
    const {router: {params: {id, searchValue}}} = getCurrentInstance();
    this.setState({
      saveSearchValue: searchValue || ''
    })
    this.props.dispatch({
      type: 'monitorManage/getBusinessDetail',
      payload: {id}
    }).then((res) => {
      console.log('res', res)
      if (res.code === 200) {
        const {detail, obligorList} = res.data;
        this.setState({
          busBaseInfo: detail,
          relationObligorList: obligorList
        })
      }
    })
    const onReadyEventId = this.$instance.router.onReady;
    eventCenter.once(onReadyEventId, () => {
      let height = 0;
      Taro.getSystemInfo({
        success: (info) => {
          console.log('info === ', info);
          height = info.windowHeight;
          Taro.createSelectorQuery().select('#navBar')
            .boundingClientRect()
            .exec(res => {
              console.log('res === ', res, height);
              this.setState({
                scrollHeight: height - res[0].height
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

  /** ??????Array???Object???String???????????? */
  isEmpty = (obj) => {
    if (obj) {
      if (typeof obj === 'object' && Object.keys(obj).length === 0) {
        return true;
      }
      if (typeof obj === 'string' && obj.trim().length === 0) {
        return true;
      }
      return false;
    }
    return true;
  }

  onClick = () => {
    const {router: {params: {id}}} = getCurrentInstance();
    this.props.dispatch({
      type: 'monitorManage/getIsDeleteOpendModal',
      payload: {deleteId: id, isDeleteOpendModal: true}
    })
  }

  render() {
    const {busBaseInfo, relationObligorList, saveSearchValue, scrollHeight} = this.state;
    return (
      <View className='yc-businessDetail'>
        <NavigationBar title='????????????'/>
        <ScrollView scrollY style={{height: scrollHeight}}>
          <View className='yc-businessDetail-line'/>
          <View className='yc-businessDetail-top'>
            <View className='yc-businessDetail-top-topInfo'>
              <Text className='yc-businessDetail-top-topInfo-busText'>????????????</Text>
              <Text className='yc-businessDetail-top-topInfo-removeBusText' onClick={this.onClick}>????????????</Text>
            </View>
            <View className='yc-businessDetail-top-line'/>
            <View className='yc-businessDetail-top-topContent'>
              <View>
                <Text className='yc-businessDetail-top-topContent-text'>???????????????</Text>
                <Text
                  className='yc-businessDetail-top-topContent-number'>{!this.isEmpty(busBaseInfo) && busBaseInfo.caseNumber ? busBaseInfo.caseNumber : '-'}</Text>
              </View>
              <View style={{marginTop: '20rpx'}}>
                <Text className='yc-businessDetail-top-topContent-text'>???????????????</Text>
                <Text
                  className='yc-businessDetail-top-topContent-number'>{!this.isEmpty(busBaseInfo) && busBaseInfo.uploadTime ? dateToFormat(busBaseInfo.uploadTime, 'YYYY-MM-DD') : '-'}</Text>
              </View>
            </View>
          </View>
          <View className='yc-businessDetail-line'/>
          <View className='yc-businessDetail-bottom'>
            <View className='yc-businessDetail-top-topInfo'>
              <Text className='yc-businessDetail-top-topInfo-busText'>???????????????</Text>
            </View>
            <View className='yc-businessDetail-top-line'/>
            <ObligorListItem data={relationObligorList} type='businessRelation'/>
          </View>
        </ScrollView>
        <DeleteModal searchValue={saveSearchValue} busDetail={true}/>
      </View>
    )
  }
}
