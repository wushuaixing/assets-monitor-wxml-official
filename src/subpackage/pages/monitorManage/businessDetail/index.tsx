import React, {Component} from 'react'
import Taro, {getCurrentInstance} from '@tarojs/taro';
import {connect} from 'react-redux';
import moment from 'moment';
import {Text, View, Image} from '@tarojs/components'
import ObligorListItem from "../obligorListItem";
import DeleteModal from "../deleteModal";
import './index.scss'

type isState = {
  busBaseInfo: object,
  relationObligorList: any,
  saveSearchValue:string,
}

type IProps = {
  dispatch: ({type: string, payload: object}) => {
    then(param: (result) => void): any;
  },
};
@connect(({monitorManage}) => ({monitorManage}))
export default class BusinessDetail extends Component<IProps, isState> {

  constructor(props) {
    super(props);
    this.state = {
      busBaseInfo: {},
      relationObligorList: [],
      saveSearchValue:''
    };
  }

  componentWillMount() {
    console.log("getCurrentInstance()", getCurrentInstance())
    const {router: {params: {id,searchValue}}} = getCurrentInstance();
    this.setState({
      saveSearchValue:searchValue
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
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  /** 判断Array，Object，String是否为空 */
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

  onClick = () =>{
    const {router: {params: {id}}} = getCurrentInstance();
    this.props.dispatch({
      type:'monitorManage/getIsDeleteOpendModal',
      payload:{deleteId:id,isDeleteOpendModal:true}
    })
  }

  render() {
    const {busBaseInfo, relationObligorList,saveSearchValue} = this.state;
    console.log("busBaseInfo===", busBaseInfo,this.isEmpty(busBaseInfo),busBaseInfo.caseNumber,moment(busBaseInfo.uploadTime).format( 'YYYY-MM-DD'))
    return (
      <View className='yc-businessDetail'>
        <View className='yc-businessDetail-line'/>
        <View className='yc-businessDetail-top'>
          <View className='yc-businessDetail-top-topInfo'>
            <Text className='yc-businessDetail-top-topInfo-busText'>业务信息</Text>
            <Text className='yc-businessDetail-top-topInfo-removeBusText' onClick={this.onClick}>删除业务</Text>
          </View>
          <View className='yc-businessDetail-top-line'/>
          <View className='yc-businessDetail-top-topContent'>
            <View>
              <Text className='yc-businessDetail-top-topContent-text'>业务编号：</Text>
              <Text className='yc-businessDetail-top-topContent-number'>{!this.isEmpty(busBaseInfo) && busBaseInfo.caseNumber ? busBaseInfo.caseNumber :'-'}</Text>
            </View>
            <View style={{marginTop: '20rpx'}}>
              <Text className='yc-businessDetail-top-topContent-text'>添加日期：</Text>
              <Text
                className='yc-businessDetail-top-topContent-number'>{!this.isEmpty(busBaseInfo) && busBaseInfo.uploadTime ? moment(busBaseInfo.uploadTime).format( 'YYYY-MM-DD') :'-'}</Text>
            </View>
          </View>
        </View>
        <View className='yc-businessDetail-line'/>
        <View className='yc-businessDetail-bottom'>
          <View className='yc-businessDetail-top-topInfo'>
            <Text className='yc-businessDetail-top-topInfo-busText'>业务相关人</Text>
          </View>
          <View className='yc-businessDetail-top-line'/>
          <ObligorListItem data={relationObligorList} type='businessRelation'/>
        </View>
        <DeleteModal searchValue={saveSearchValue} busDetail={true}/>
      </View>
    )
  }
}
