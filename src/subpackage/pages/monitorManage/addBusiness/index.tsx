import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Button, View, Input, Form, Text, ScrollView} from '@tarojs/components';
import {AtActionSheet, AtActionSheetItem, AtButton, AtModal, AtModalAction, AtModalContent} from 'taro-ui';
import RelationBusiness from './relationBusiness';
import './index.scss'
import {Message, throttle} from "../../../../utils/tools/common";
import Taro, {eventCenter, getCurrentInstance} from "@tarojs/taro";
import NavigationBar from "../../../../components/navigation-bar";
import {getGlobalData} from "../../../../utils/const/global";


const handleRole = {
  1: '借款人',
  2: '担保人',
  3: '抵质押人',
  4: '共同借款人',
  5: '未知'
}

type isState = {
  isBaseOpened: boolean,
  baseObj: object,
  relationList: any,
  showLoading: boolean,
  isClickActionSheet: boolean,
  scrollHeight: number,
  navBarHeight: number,
  isOpened: boolean,
  isRoleOpened: boolean,
  dataSource: any,
  curItem: number,
  curActionSheetType: number,
  isDeleteOpendModal: boolean,
  deleteIndex: number,
  saveClickRole: any,
  addBusBtnHeight:number
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
      isClickActionSheet: false,
      scrollHeight: 0,
      navBarHeight: 0,
      isOpened: false,
      isRoleOpened: false,
      dataSource: [],
      curItem: 0,
      curActionSheetType: 0,
      isDeleteOpendModal: false,
      deleteIndex: 0,
      saveClickRole: [],
      addBusBtnHeight:0
    };
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
            showLoading: true,
            dataSource: buildData
          })
        }
      })
    } else {
      this.setState({
        showLoading: true
      })
    }
    const onReadyEventId = this.$instance.router.onReady;
    eventCenter.once(onReadyEventId, () => {
      let height = 0;
      let statusBarHeight = 0;
      Taro.getSystemInfo({
        success: (info) => {
          console.log('info === ', info);
          height = info.windowHeight;
          statusBarHeight = info.statusBarHeight;
          Taro.createSelectorQuery().select('#navBar')
            .boundingClientRect()
            .exec(res => {
              console.log('res === ', res, height);
              this.setState({
                navBarHeight: res[0].height,
                scrollHeight: height
              })
            })
          // onReady 触发后才能获取小程序渲染层的节点
          Taro.createSelectorQuery().select('#addBusBtn')
            .boundingClientRect()
            .exec(res => {
              console.log('res === ', res, height);
              this.setState({
                addBusBtnHeight: res[0].height,
                scrollHeight: height
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
    const regNumber = /^[0-9a-zA-Z\uff08\uff09\(\)\*]+$/; // 证件号
    const regName = /^[\u4e00-\u9fa5\uff08\uff090-9a-zA-Z·\(\)]+$/; // 借款人名称
    const {baseObj, dataSource} = this.state;
    const relationList = dataSource;
    const relationObligorName = relationList.filter(i => i.obligorName === "") // 过滤关联债务人为空
    const relationObligorNumber = relationList.filter(i => i.obligorNumber === "" && i.borrowType === 0) // 过滤关联债务人证件号为空
    const relationCheckObligorNumber = relationList.filter(i => i.obligorNumber !== "" && !regNumber.test(i.obligorNumber));
    const relationCheckObligorName = relationList.filter(i => i.obligorName !== "" && !regName.test(i.obligorName));
    // const relationCheckObligorNumber = checkObligorNumber.filter(i=>i.field==='obligorNumber' && i.value === false) // 过滤关联债务人证件号为false
    // const relationCheckObligorName = checkObligorNumber.filter(i=>i.field==='obligorName' && i.value === false) // 过滤关联债务人名称为false
    if (baseObj.obligorName === "") {
      Message('请填写借款人名称');
      return;
    }
    if (baseObj.borrowType === 0 && baseObj.obligorNumber === "") {
      Message('请填写借款人证件号');
      return;
    }
    if (baseObj.obligorName !== "") {
      if (!regName.test(baseObj.obligorName)) {
        Message('请核对借款人名称');
        return;
      }
    }
    if (baseObj.borrowType === 0 && baseObj.obligorNumber !== "") {
      if (!regNumber.test(baseObj.obligorNumber)) {
        Message('请核对借款人证件号');
        return;
      }
    }
    if (relationObligorName.length > 0) {
      for (var i = 0; i < relationList.length; i++) {
        if (relationList[i].obligorName === "") {
          Message(`请填写关联债务人${i + 1}的债务人名称`);
          break;
        }
      }
      return;
    }
    if (relationObligorNumber.length > 0) {
      for (var i = 0; i < relationList.length; i++) {
        if (relationList[i].borrowType === 0 && relationList[i].obligorNumber === "") {
          Message(`请填写关联债务人${i + 1}的证件号`);
          break;
        }
      }
      return;
    }
    if (relationCheckObligorName.length > 0) {
      for (var i = 0; i < relationList.length; i++) {
        if (relationList[i].obligorName !== "") {
          const reg = /^[\u4e00-\u9fa5\uff08\uff090-9a-zA-Z·\(\)]+$/;
          if (!reg.test(relationList[i].obligorName)) {
            Message(`请核对关联债务人${i + 1}的债务人名称`);
            break;
          }
        }
      }
      return;
    }
    if (relationCheckObligorNumber.length > 0) {
      for (var i = 0; i < relationList.length; i++) {
        if (relationList[i].borrowType === 0 && relationList[i].obligorNumber !== "") {
          const reg = /^[0-9a-zA-Z\uff08\uff09\(\)\*]+$/;
          if (!reg.test(relationList[i].obligorNumber)) {
            Message(`请核对关联债务人${i + 1}的证件号`)
            break;
          }
        }
      }
      return;
    }

    const params = {
      'detail': baseObj,
      'obligorList': this.state.dataSource
    }
    console.log('params===', params)
    if (id) {
      // 编辑业务
      console.log('编辑')
      throttle(this.editBusiness(params, type, id, searchValue), 3000)
    } else {
      console.log('添加')
      throttle(this.addBusiness(params, type, searchValue), 3000)
    }
  }

  // 编辑业务
  editBusiness = (params, type, id, searchValue) => {
    if (id) {
      // 编辑业务
      console.log('编辑')
      params['id'] = id;
      this.props.dispatch({
        type: 'monitorManage/getBusinessEdit',
        payload: {...params}
      }).then(res => {
        console.log('编辑res', res)
        if (res.code === 200) {
          Message('编辑成功');
          setTimeout(() => {
            if (type === 'editBus') {
              Taro.navigateTo({url: `/subpackage/pages/monitorManage/index?type=business&searchValue=${searchValue}`})
            }
          }, 500)
        } else {
          Message(res.message);
        }
      }).catch(() => {
        Message('网络异常请稍后再试！')
      })
    }
  }

// 添加业务
  addBusiness = (params, type, searchValue) => {
    this.props.dispatch({
      type: 'monitorManage/getBusinessSave',
      payload: {...params}
    }).then(res => {
      console.log('onSubmitonSubmitonSubmit', res)
      if (res.code === 200) {
        Message('添加成功');
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
      } else {
        Message(res.message);
      }
    }).catch(() => {
      Message('网络异常请稍后再试！')
    })
  }

  // getValue = (value) => {
  //   console.log(636363, value)
  //   this.obligorList = value;
  // }

  onInput = (e, field) => {
    const {baseObj} = this.state;
    const {value} = e.detail;
    if (field === 'caseNumber') {
      const curValue = value.slice(0, 32);
      if (value.length <= 32) {
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
      if (value.length <= 40) {
        baseObj[field] = curValue;
        this.setState({
          baseObj
        })
      } else {
        Message('最长输入40个字符');
      }
    }
    if (field === 'obligorNumber') {
      const curValue = value.slice(0, 18);
      if (value.length <= 18) {
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
    if (field === 'obligorNumber') {
      const {baseObj} = this.state;
      const reg1 = /[\(]/g;
      const reg2 = /[\)]/g;
      const curValue = e.detail.value;
      baseObj['obligorNumber'] = curValue.replace(reg1, "（").replace(reg2, "）");
      this.setState({
        baseObj
      })
    }
    // const reg = /^[\u4e00-\u9fa5\uff08\uff090-9a-zA-Z·\(\)]+$/;
    // if(!reg.test(curValue)){
    //   Message('请填写正确的借款人名称');
    // }
    // if(field === 'obligorNumber'){
    //   const reg = /^[0-9a-zA-Z\uff08\uff09\(\)\*]+$/;
    //   const curValue = e.detail.value;
    //   if(!reg.test(curValue)){
    //     Message('请填写正确的借款人证件号');
    //   }
    // }
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

  relDelete = (index) => {
    this.setState({
      deleteIndex: index,
      isDeleteOpendModal: true
    })
  }

  onRelInput = (e, type, index) => {
    const {dataSource} = this.state;
    const {value} = e.detail;
    if (type === 'obligorName') {
      const curValue = value.slice(0, 40)
      if (value.length <= 40) {
        dataSource[index][type] = curValue;
      } else {
        Message('最长输入40个字符');
      }
    }
    if (type === 'obligorNumber') {
      const curValue = value.slice(0, 18)
      if (value.length <= 18) {
        dataSource[index][type] = curValue;
      } else {
        Message('最长输入18个字符');
      }
    }
    this.setState({
      dataSource
    })
  }

  onRelBlur = (e, type, index) => {
    // const {value} = e.detail;
    if (type === 'obligorName') {
      const {dataSource, saveClickRole} = this.state;
      console.log('saveClickRole===', saveClickRole, index)
      const curValue = e.detail.value;
      const isClick = saveClickRole.filter(i => i.key === index && i.value === true);
      console.log('isClick===', isClick)
      if (curValue.length > 4 && isClick.length === 0) {
        dataSource[index]['borrowType'] = 1
      }
      if (curValue.length <= 4 && isClick.length === 0) {
        dataSource[index]['borrowType'] = 0
      }
      // const {checkObligorNumber} = this.state;
      // const reg = /^[\u4e00-\u9fa5\uff08\uff090-9a-zA-Z·\(\)]+$/;
      // if (reg.test(value)) {
      //   checkObligorNumber.push({key: index, value: true, field: 'obligorName'})
      // } else {
      //   checkObligorNumber.push({key: index, value: false, field: 'obligorName'});
      //   Message('请填写正确的债务人名称');
      // }
      this.setState({
        dataSource,
        // checkObligorNumber
      })
    }
    if (type === 'obligorNumber') {
      const {dataSource} = this.state;
      const curValue = e.detail.value;
      const reg1 = /[\(]/g;
      const reg2 = /[\)]/g;
      dataSource[index]['obligorNumber'] = curValue.replace(reg1, "（").replace(reg2, "）");
      this.setState({
        dataSource
      })
    }
    // if (type === 'obligorNumber') {
    //   const {checkObligorNumber} = this.state;
    //   const reg = /^[0-9a-zA-Z\uff08\uff09\(\)\*]+$/;
    //   if (reg.test(value)) {
    //     checkObligorNumber.push({key: index, value: true, field: 'obligorNumber'})
    //   } else {
    //     checkObligorNumber.push({key: index, value: false, field: 'obligorNumber'})
    //     Message('请填写正确的证件号');
    //   }
    //   this.setState({
    //     checkObligorNumber
    //   })
    // }
  }

  onRelOpenActionSheetClick = (e, index) => {
    console.log('eeeee', e)
    this.setState({
      isOpened: e === 3,
      isRoleOpened: !e,
      curItem: index,
      curActionSheetType: e,
    })
  }

  addClick = () => {
    const {dataSource} = this.state;
    const obj = {
      "assetTotal": null,
      "bankruptcy": null,
      "borrowType": "", // 债务人类型
      "dishonestStatus": null,
      "id": null,
      "isBorrower": null,
      "isTable": null,
      "limitConsumption": null,
      "limitHeightStatus": null,
      "obligorId": null,
      "obligorName": "", // 债务人名称
      "obligorNumber": "", // 债务人证件号
      "obligorPushType": null,
      "openBusinessCount": null,
      "regStatus": null,
      "riskTotal": null,
      "role": "2", // 债务人角色
      "roleText": "担保人" // 债务人角色名称
    }
    dataSource.push(obj);
    this.setState({
      dataSource
    })
  }

  onRelDeleteCancel = () => {
    this.setState({
      isDeleteOpendModal: false
    })
  }

  onRelDeleteConform = () => {
    const {deleteIndex} = this.state;
    let {dataSource} = this.state;
    dataSource = dataSource.filter((_, i) => i !== deleteIndex);
    this.setState({
      dataSource,
      isDeleteOpendModal: false
    })
    console.log(82, deleteIndex, this.state, dataSource)
  }

  onDeleteCloseModal = () => {
    this.setState({
      isDeleteOpendModal: false
    })
  }

  onRelCancel = (value) => {
    this.setState({
      [value]: false
    })
  }

  onRelSheetItemClick = (type, value) => {
    const {curItem, dataSource, curActionSheetType, saveClickRole} = this.state;
    console.log('curItem', curItem)
    this.setState({
      saveClickRole: []
    })
    dataSource[curItem][type] = value;
    if (type === 'role') {
      dataSource[curItem].roleText = handleRole[value];
    }
    if (type === 'borrowType') {
      saveClickRole.push({key: curItem, value: true});
    }
    this.setState({
      dataSource,
      saveClickRole
    })
    this.onRelCancel(curActionSheetType ? 'isOpened' : 'isRoleOpened')
  }

  render() {
    const {
      isBaseOpened,
      baseObj,
      relationList,
      showLoading,
      scrollHeight,
      navBarHeight,
      isOpened,
      isRoleOpened,
      isDeleteOpendModal,
      dataSource,
      addBusBtnHeight
    } = this.state;
    const {router: {params: {id}}} = getCurrentInstance();
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
    console.log(421, scrollHeight, navBarHeight)
    const relationBusinessConfig = [
      {
        id: '1',
        title: '债务人角色',
        placeHolder: '请选择',
        value: '',
        field: 'roleText',
        type: 'select',
      },
      {
        id: '2',
        title: '债务人名称',
        placeHolder: '请填写债务人名称（必填）',
        value: '',
        field: 'obligorName',
        type: 'input',
      },
      {
        id: '3',
        title: '证件号',
        placeHolder: '个人必填，企业可不填',
        value: '',
        field: 'obligorNumber',
        type: 'input',
      },
      {
        id: '4',
        title: '债务人类型',
        placeHolder: '请选择（必选）',
        value: '',
        field: 'borrowType',
        type: 'select',
      }
    ]
    const handleBorrowType = {
      0: '个人',
      1: '企业'
    }
    return (
      <View className='yc-addBusiness'>
        <NavigationBar title={id ? '编辑业务' : '添加业务'}/>
        <ScrollView scrollY style={{height: scrollHeight - addBusBtnHeight - navBarHeight}}>
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
                              maxlength={i.field === 'caseNumber' ? 32 : i.field === 'obligorName' ? 40 : i.field === 'obligorNumber' ? 18 : -1}
                            /> :
                            <View className='yc-addBusiness-baseInfo-input-content-selectTemp'
                                  onClick={this.onOpenActionSheetClick}>
                              <View
                                className='yc-addBusiness-baseInfo-input-content-selectTemp-selectText'
                                style={{color: handleBorrowType[baseObj.borrowType] ? '#666666' : '#CCCCCC'}}>{handleBorrowType[baseObj.borrowType] || i.placeHolder}</View>
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
              {/*{*/}
              {/*  showLoading && <RelationBusiness data={relationList} value={(value) => this.getValue(value)}/>*/}
              {/*}*/}

              {
                showLoading &&
                <View>
                  {
                    <View>
                      {
                        dataSource.map((res, relIndex) => {
                          return (
                            <View>
                              <View className='yc-addBusiness-relationTextContent'>
                                <View
                                  className='yc-addBusiness-relationBaseInfoText'>关联债务人{relIndex + 1}</View>
                                <View className='yc-addBusiness-deleteText'
                                      onClick={() => this.relDelete(relIndex)}>删除</View>
                              </View>

                              <View className='yc-addBusiness-baseInfo'>
                                <View className='yc-addBusiness-baseInfo-topLine'/>
                                {
                                  relationBusinessConfig.map((i, indexTemp) => {
                                    return (
                                      <View className='yc-addBusiness-baseInfo-input'>
                                        <View className='yc-addBusiness-baseInfo-input-content'>
                                          <View
                                            className='yc-addBusiness-baseInfo-input-content-inputText'>{i.title}</View>
                                          {
                                            i.type === 'input' ?
                                              <Input
                                                className='yc-addBusiness-baseInfo-input-content-inputTemp'
                                                name={i.field + relIndex}
                                                type='text'
                                                placeholder={i.placeHolder}
                                                value={res[i.field]}
                                                onInput={(e) => this.onRelInput(e, i.field, relIndex)}
                                                onBlur={(e) => {
                                                  this.onRelBlur(e, i.field, relIndex)
                                                }}
                                                maxlength={i.field === 'obligorName' ? 40 : i.field === 'obligorNumber' ? 18 : -1}
                                              /> :
                                              <View className='yc-addBusiness-baseInfo-input-content-selectTemp'
                                                    onClick={() => {
                                                      this.onRelOpenActionSheetClick(indexTemp, relIndex)
                                                    }}>
                                                <View
                                                  className='yc-addBusiness-baseInfo-input-content-selectTemp-selectText'
                                                  style={{color: indexTemp ? handleBorrowType[res.borrowType] ? '#666666' : '#CCCCCC' : handleRole[res.role] ? '#666666' : '#CCCCCC'}}>{indexTemp ? handleBorrowType[res.borrowType] ? handleBorrowType[res.borrowType] : i.placeHolder : handleRole[res.role] || i.placeHolder}</View>
                                                <View
                                                  className='yc-addBusiness-baseInfo-input-content-selectTemp-arrow'>
                                                  <Text
                                                    className="iconfont icon-right-arrow yc-addBusiness-baseInfo-input-content-selectTemp-arrow-text"/>
                                                </View>
                                              </View>
                                          }
                                        </View>
                                        {
                                          indexTemp !== relationBusinessConfig.length - 1 &&
                                          <View className='yc-addBusiness-baseInfo-input-content-line'/>
                                        }
                                      </View>

                                    )
                                  })
                                }
                                <View className='yc-addBusiness-baseInfo-topLine'/>
                              </View>
                            </View>
                          )
                        })
                      }
                      <View onClick={this.addClick} className='yc-addBusiness-relationText'>添加关联债务人</View>
                      {/*<View className='yc-addBusiness-empty'/>*/}

                    </View>
                  }
                </View>
              }

              {/*<View className='yc-addBusiness-addBtn'>*/}
              {/*  <AtButton type='primary' onClick={throttle(this.onSubmit, 5000)}>确认添加</AtButton>*/}
              {/*</View>*/}

            </Form>
          </View>
        </ScrollView>
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

        <AtActionSheet isOpened={isOpened} cancelText='取消' onCancel={() => {
          this.onRelCancel('isOpened')
        }}
                       onClose={() => {
                         this.onRelCancel('isOpened')
                       }}
        >
          <AtActionSheetItem onClick={() => {
            this.onRelSheetItemClick('borrowType', 0)
          }}>
            个人
          </AtActionSheetItem>
          <AtActionSheetItem onClick={() => {
            this.onRelSheetItemClick('borrowType', 1)
          }}>
            企业
          </AtActionSheetItem>
        </AtActionSheet>
        <AtActionSheet
          isOpened={isRoleOpened}
          cancelText='取消'
          onCancel={() => {
            this.onRelCancel('isRoleOpened')
          }}
          onClose={() => {
            this.onRelCancel('isRoleOpened')
          }}
        >
          <AtActionSheetItem onClick={() => {
            this.onRelSheetItemClick('role', 2)
          }}>
            担保人
          </AtActionSheetItem>
          <AtActionSheetItem onClick={() => {
            this.onRelSheetItemClick('role', 4)
          }}>
            共同借款人
          </AtActionSheetItem>
        </AtActionSheet>

        <View className='yc-addBusiness-deleteModal'>
          <AtModal isOpened={isDeleteOpendModal} onClose={this.onDeleteCloseModal}>
            <AtModalContent>
              <View>确定删除该债务人的信息？</View>
            </AtModalContent>
            <AtModalAction>
              <Button onClick={this.onRelDeleteCancel}>取消</Button>
              <Button onClick={this.onRelDeleteConform}>确定</Button>
            </AtModalAction>
          </AtModal>
        </View>


        <View className='yc-addBusiness-addBtn' id='addBusBtn'>
          {/*<AtButton type='primary' onClick={throttle(this.onSubmit, 3000)}>确认</AtButton>*/}
          <View className='yc-addBusiness-addBtn-text' onClick={throttle(this.onSubmit, 3000)}>确认</View>
        </View>
      </View>
    )
  }
}
