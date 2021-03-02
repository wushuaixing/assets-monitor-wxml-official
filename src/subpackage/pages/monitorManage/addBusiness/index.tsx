import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Button, View, Input, Form, Text} from '@tarojs/components';
import {AtActionSheet, AtActionSheetItem} from 'taro-ui';
import RelationBusiness from './relationBusiness';
import './index.scss'
import {Message} from "../../../../utils/tools/common";

type isState = {
  isBaseOpened: boolean,
  baseObj: object,
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
      isBaseOpened: false,
      baseObj: {
        "bankruptcyStatus": 0,
        "borrowType": "", // 借款人类型
        "businessPushType": 0,
        "caseNumber": '', // 业务编号
        "dishonestStatus": 0,
        "guarantee": 0,
        "guaranteeString": "担保",
        "id": 1,
        "isBorrower": true,
        "obligorId": 1,
        "obligorName": "", // 借款人名称
        "obligorNumber": "", // 证件号
        "obligorPushType": 0,
        "orgName": "",
        "uploadTime": ""
      }
    };
    this.obligorList = [];
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

  onOpenActionSheetClick = () => {
    this.setState({
      isBaseOpened: true
    })
  }

  onCancel = () => {
    this.setState({
      isBaseOpened: false
    })
  }

  onSubmit = () => {
    const {baseObj} = this.state;
    const params = {
      'detail':baseObj,
      'obligorList':this.obligorList
    }
    console.log('params===',params)
    // this.props.dispatch({
    //   type:'monitorManage/getBusinessSave',
    //   payload:{...params}
    // }).then(res=>{
    //   console.log('onSubmitonSubmitonSubmit',res)
    // })
  }

  onReset = (event) => {
    console.log('onReset====', event)
  }
  getValue = (value) => {
    console.log(636363, value)
    this.obligorList=value
  }

  onInput = (e, field) => {
    const {baseObj} = this.state;
    const {value} = e.detail;
    if (field === 'caseNumber') {
      const curValue = value.slice(0,32);
      if(curValue.length <= 32){
        baseObj[field] = curValue;
        this.setState({
          baseObj
        })
      }else{
        Message('最长输入32个字符');
      }
    }
    if(field === 'obligorName'){
      const curValue = value.slice(0,40);
      if(curValue.length <= 40){
        baseObj[field] = curValue;
        if(curValue.length > 4){
          baseObj['borrowType'] = 1;
        }
        if(curValue.length <=4){
          baseObj['borrowType'] = 0;
        }
        this.setState({
          baseObj
        })
      }else{
        Message('最长输入40个字符');
      }
    }
    if(field === 'obligorNumber'){
      const curValue = value.slice(0,18);
      if(curValue.length <= 18){
        baseObj[field] = curValue;
        this.setState({
          baseObj
        })
      }else{
        Message('最长输入18个字符');
      }
    }
  }

  render() {
    const {isBaseOpened,baseObj} = this.state;
    console.log('this.state=====',baseObj)
    const handleBorrowType = {
      0:'个人',
      1:'企业'
    }
    const businessBaseInfoConfig = [
      {
        id: '1',
        title: '业务编号',
        value: '',
        field: 'caseNumber',
        placeHolder: '请填写业务编号',
        type: 'input'
      },
      {
        id: '2',
        title: '借款人名称',
        value: '',
        field: 'obligorName',
        placeHolder: '请填写借款人名称（必填）',
        type: 'input'
      },
      {
        id: '3',
        title: '证件号',
        value: '',
        field: 'obligorNumber',
        placeHolder: '个人必填，企业可不填',
        type: 'input'
      },
      {
        id: '4',
        title: '借款人类型',
        value: '',
        field: 'borrowType',
        placeHolder: '请选择（必选）',
        type: 'select'
      },
    ];
    const relationDataSource = [
      {
        "assetTotal": 0,
        "bankruptcy": true,
        "borrowType": "",
        "dishonestStatus": 1,
        "id": 1,
        "isBorrower": true,
        "isTable": 0,
        "limitConsumption": 0,
        "limitHeightStatus": 1,
        "obligorId": 1,
        "obligorName": "",
        "obligorNumber": "",
        "obligorPushType": 0,
        "openBusinessCount": 1,
        "regStatus": "",
        "riskTotal": 0,
        "role": 1,
        "roleText": "担保人"
      },
      {
        "assetTotal": 0,
        "bankruptcy": true,
        "borrowType": "",
        "dishonestStatus": 1,
        "id": 1,
        "isBorrower": true,
        "isTable": 0,
        "limitConsumption": 0,
        "limitHeightStatus": 1,
        "obligorId": 1,
        "obligorName": "",
        "obligorNumber": "",
        "obligorPushType": 0,
        "openBusinessCount": 1,
        "regStatus": "",
        "riskTotal": 0,
        "role": 1,
        "roleText": "担保人"
      }
    ]
    return (
      <View className='yc-addBusiness'>
        <View className='yc-addBusiness-baseInfoText'>基础信息</View>
        <View className='yc-addBusiness-baseInfo'>
          <Form
            onSubmit={this.onSubmit}
            onReset={this.onReset}
          >
            {
              businessBaseInfoConfig.map((i, index) => {
                return (
                  <View className='yc-addBusiness-baseInfo-input'>
                    <View className='yc-addBusiness-baseInfo-input-content'>
                      <View className='yc-addBusiness-baseInfo-input-content-inputText'
                            style={{letterSpacing: i.id === '1' ? '11rpx' : '0'}}>{i.title}</View>
                      {
                        i.type === 'input' ?
                          <Input
                            className='yc-addBusiness-baseInfo-input-content-inputTemp'
                            name={i.field}
                            type='text'
                            placeholder={i.placeHolder}
                            onInput={(e) => {
                              this.onInput(e, i.field)
                            }}
                            value={baseObj[i.field]}
                          /> :
                          <View className='yc-addBusiness-baseInfo-input-content-selectTemp'
                                onClick={this.onOpenActionSheetClick}>
                            <View
                              className='yc-addBusiness-baseInfo-input-content-selectTemp-selectText'>{handleBorrowType[baseObj.borrowType] || i.placeHolder}</View>
                            <View className='yc-addBusiness-baseInfo-input-content-selectTemp-arrow'>
                              <Text
                                className="iconfont icon-right-arrow yc-addBusiness-baseInfo-input-content-selectTemp-arrow-text"/>
                            </View>
                          </View>
                      }
                    </View>
                    <View className='yc-addBusiness-baseInfo-input-content-line'/>
                  </View>

                )
              })
            }
            <RelationBusiness data={relationDataSource} value={(value) => this.getValue(value)}/>
            <Button form-type='submit'>提交</Button>
            <Button form-type='reset'>重置</Button>
          </Form>
          <AtActionSheet isOpened={isBaseOpened} cancelText='取消' onCancel={this.onCancel}>
            <AtActionSheetItem>
              个人
            </AtActionSheetItem>
            <AtActionSheetItem>
              企业
            </AtActionSheetItem>
          </AtActionSheet>
        </View>
      </View>
    )
  }
}
