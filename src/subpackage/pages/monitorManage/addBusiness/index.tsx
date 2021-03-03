import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Button, View, Input, Form, Text} from '@tarojs/components';
import {AtActionSheet, AtActionSheetItem, AtButton} from 'taro-ui';
import RelationBusiness from './relationBusiness';
import './index.scss'
import {Message} from "../../../../utils/tools/common";
import Taro, {getCurrentInstance} from "@tarojs/taro";

type isState = {
  isBaseOpened: boolean,
  baseObj: object,
  relationList: any,
  showLoading: boolean,
  isClickActionSheet: boolean
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
        "bankruptcyStatus": null,
        "borrowType": "", // 借款人类型
        "businessPushType": null,
        "caseNumber": '', // 业务编号
        "dishonestStatus": null,
        "guarantee": null,
        "guaranteeString": null,
        "id": null,
        "isBorrower": null,
        "obligorId": null,
        "obligorName": "", // 借款人名称
        "obligorNumber": "", // 证件号
        "obligorPushType": null,
        "orgName": null,
        "uploadTime": null
      },
      relationList: [],
      showLoading: false,
      isClickActionSheet: false
    };
    this.obligorList = [];
  }

  componentWillMount() {
    const {router: {params: {id}}} = getCurrentInstance();
    if (id) {
      this.props.dispatch({
        type: 'monitorManage/getBusinessDetail',
        payload: {id}
      }).then((res) => {
        console.log('res编辑', res)
        if (res.code === 200) {
          const {detail, obligorList} = res.data;
          const buildData = obligorList.filter(i => i.obligorId !== detail.obligorId);
          this.setState({
            baseObj: detail,
            relationList: buildData,
            showLoading: true
          })
        }
      })
    } else {
      this.setState({
        showLoading: true
      })
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
    const {router: {params: {id, type, searchValue}}} = getCurrentInstance();
    console.log('type===', type)
    const {baseObj} = this.state;
    const relationList = this.obligorList;
    const relationObligorName = relationList.filter(i => i.obligorName === "") // 过滤关联债务人为空
    const relationObligorNumber = relationList.filter(i => i.obligorNumber === "") // 过滤关联债务人证件号为空
    if (baseObj.obligorName === "") {
      Message('请填写借款人名称');
      return;
    }
    if (baseObj.borrowType === 0 && baseObj.obligorNumber === "") {
      Message('请填写借款人证件号');
      return;
    }
    if (relationObligorName.length > 0) {
      relationList.forEach((i, index) => {
        if (i.obligorName === "") {
          Message(`请填写关联债务人${index + 1}的债务人名称`);
          return;
        }
      })
    }
    if (relationObligorNumber.length > 0) {
      relationList.forEach((i, index) => {
        if (i.borrowType === 0 && i.obligorNumber === "") {
          Message(`请填写关联债务人${index + 1}的证件号`)
          return;
        }
      })
    }
    const params = {
      'detail': baseObj,
      'obligorList': this.obligorList
    }
    console.log('params===', params)
    if (id) {
      // 编辑业务
      console.log('编辑')
      params['id'] = id;
      this.props.dispatch({
        type: 'monitorManage/getBusinessEdit',
        payload: {...params}
      }).then(res => {
        console.log('编辑res', res)
        Message(res.message);
        if (res.code === 200) {
          setTimeout(() => {
            if (type === 'editBus') {
              Taro.navigateTo({url: `/subpackage/pages/monitorManage/index?type=business&searchValue=${searchValue}`})
            }
          }, 500)
        }
      }).catch(() => {
        Message('网络异常请稍后再试！')
      })
    } else {
      console.log('添加')
      // 添加业务
      this.props.dispatch({
        type: 'monitorManage/getBusinessSave',
        payload: {...params}
      }).then(res => {
        console.log('onSubmitonSubmitonSubmit', res)
        Message(res.message);
        if (res.code === 200) {
          setTimeout(() => {
            if (type === 'addBus') {
              Taro.navigateTo({url: `/subpackage/pages/monitorManage/index?type=business&searchValue=${searchValue}`})
            }
            if (type === 'homeAddBus') {
              Taro.navigateTo({url: '/subpackage/pages/monitorManage/index?type=business'})
            }
            if (type === 'homeEmptyBus') {
              Taro.switchTab({url: '/pages/index/index'});
            }
          }, 500)
        }
      }).catch(() => {
        Message('网络异常请稍后再试！')
      })
    }
  }

  getValue = (value) => {
    console.log(636363, value)
    this.obligorList = value
  }

  onInput = (e, field) => {
    const {baseObj} = this.state;
    const {value} = e.detail;
    if (field === 'caseNumber') {
      const curValue = value.slice(0, 32);
      if (curValue.length <= 32) {
        baseObj[field] = curValue;
        this.setState({
          baseObj
        })
      } else {
        Message('最长输入32个字符');
      }
    }
    if (field === 'obligorName') {
      const curValue = value.slice(0, 40);
      if (curValue.length <= 40) {
        baseObj[field] = curValue;
      } else {
        Message('最长输入40个字符');
      }
    }
    if (field === 'obligorNumber') {
      const curValue = value.slice(0, 18);
      if (curValue.length <= 18) {
        baseObj[field] = curValue;
        this.setState({
          baseObj
        })
      } else {
        Message('最长输入18个字符');
      }
    }
  }

  onBlur = (e, field) => {
    if (field === 'obligorName') {
      const {baseObj, isClickActionSheet} = this.state;
      const curValue = e.detail.value;
      if (curValue.length > 4 && !isClickActionSheet) {
        baseObj['borrowType'] = 1;
      }
      if (curValue.length <= 4 && !isClickActionSheet) {
        baseObj['borrowType'] = 0;
      }
      this.setState({
        baseObj
      })
    }
  }

  onSheetItemClick = (type, value) => {
    const {baseObj} = this.state;
    baseObj[type] = value;
    this.setState({
      baseObj,
      isClickActionSheet: true,
      isBaseOpened: false
    })
  }

  render() {
    const {isBaseOpened, baseObj, relationList, showLoading} = this.state;
    console.log('this.state=====', baseObj)
    const handleBorrowType = {
      0: '个人',
      1: '企业'
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
    // const relationDataSource = [
    //   {
    //     "assetTotal": 0,
    //     "bankruptcy": true,
    //     "borrowType": "",
    //     "dishonestStatus": 1,
    //     "id": 1,
    //     "isBorrower": true,
    //     "isTable": 0,
    //     "limitConsumption": 0,
    //     "limitHeightStatus": 1,
    //     "obligorId": 1,
    //     "obligorName": "",
    //     "obligorNumber": "",
    //     "obligorPushType": 0,
    //     "openBusinessCount": 1,
    //     "regStatus": "",
    //     "riskTotal": 0,
    //     "role": 1,
    //     "roleText": "担保人"
    //   },
    //   {
    //     "assetTotal": 0,
    //     "bankruptcy": true,
    //     "borrowType": "",
    //     "dishonestStatus": 1,
    //     "id": 1,
    //     "isBorrower": true,
    //     "isTable": 0,
    //     "limitConsumption": 0,
    //     "limitHeightStatus": 1,
    //     "obligorId": 1,
    //     "obligorName": "",
    //     "obligorNumber": "",
    //     "obligorPushType": 0,
    //     "openBusinessCount": 1,
    //     "regStatus": "",
    //     "riskTotal": 0,
    //     "role": 1,
    //     "roleText": "担保人"
    //   }
    // ]
    return (
      <View className='yc-addBusiness'>
        <View className='yc-addBusiness-baseInfoText'>基础信息</View>
        <View className='yc-addBusiness-baseInfo'>
          <Form
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
                            onBlur={(e) => {
                              this.onBlur(e, i.field)
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
                    {
                      index !== businessBaseInfoConfig.length - 1 &&
                      <View className='yc-addBusiness-baseInfo-input-content-line'/>
                    }
                  </View>

                )
              })
            }
            {
              showLoading && <RelationBusiness data={relationList} value={(value) => this.getValue(value)}/>
            }

            <View className='yc-addBusiness-addBtn'>
              <AtButton type='primary' onClick={this.onSubmit}>确认添加</AtButton>
            </View>

          </Form>
          <AtActionSheet isOpened={isBaseOpened} cancelText='取消' onCancel={this.onCancel}>
            <AtActionSheetItem onClick={() => {
              this.onSheetItemClick('borrowType', 0)
            }}>
              个人
            </AtActionSheetItem>
            <AtActionSheetItem onClick={() => {
              this.onSheetItemClick('borrowType', 1)
            }}>
              企业
            </AtActionSheetItem>
          </AtActionSheet>
        </View>
      </View>
    )
  }
}
