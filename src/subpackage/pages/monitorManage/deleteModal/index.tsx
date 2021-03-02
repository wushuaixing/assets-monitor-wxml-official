import React, {Component} from 'react'
import {Button, View} from '@tarojs/components'
import {AtModal, AtModalContent, AtModalAction} from "taro-ui"
import {connect} from 'react-redux';
import {Message} from '../../../../utils/tools/common';
import './index.scss'
import Taro from "@tarojs/taro";

type isState = {}
@connect(({monitorManage}) => ({monitorManage}))
export default class DeleteModal extends Component<any, isState> {
  constructor(props: any) {
    super(props);
    this.state = {}
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

  onCancel = () => {
    this.props.dispatch({
      type: 'monitorManage/getIsDeleteOpendModal',
      payload: {deleteId: '', isDeleteOpendModal: false}
    })
  }

  onConform = () => {
    const {deleteId} = this.props.monitorManage;
    this.props.dispatch({
      type: 'monitorManage/getBusinessDelete',
      payload: {id: deleteId}
    }).then(res => {
      Message(res.message);
      if (res.code === 200) {
        this.props.dispatch({
          type: 'monitorManage/getIsDeleteOpendModal',
          payload: {deleteId: '', isDeleteOpendModal: false}
        })
        if (this.props.busDetail) {
          const {searchValue} = this.props;
          Taro.navigateTo({url:`/subpackage/pages/monitorManage/index?type=business&searchValue=${searchValue}`})
        } else {
          const {handleBusinessList} = this.props;
          if (handleBusinessList) handleBusinessList();
        }
      }
    })
  }


  render() {
    console.log('this.pprops', this.props)
    const {isDeleteOpendModal} = this.props.monitorManage;
    return (
      <View className='yc-deleteModal'>
        <AtModal isOpened={isDeleteOpendModal}>
          <AtModalContent>
            <View>确定删除该条业务？</View>
          </AtModalContent>
          <AtModalAction>
            <Button onClick={this.onCancel}>取消</Button>
            <Button onClick={this.onConform}>确定</Button>
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
