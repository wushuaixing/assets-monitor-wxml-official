import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Button, View, Input, Form, Text} from '@tarojs/components';
import {AtActionSheet, AtActionSheetItem, AtModal, AtModalContent, AtModalAction} from 'taro-ui';
import './index.scss'
import {getCurrentInstance} from "@tarojs/taro";
import {Message} from '../../../../utils/tools/common'

type isState = {
  isOpened: boolean,
  isRoleOpened: boolean,
  dataSource: any,
  curItem: number,
  curActionSheetType: number,
  isDeleteOpendModal: boolean,
  deleteIndex: number,
  saveClickRole: any,
  // checkObligorNumber: any
}

type IProps = {
  dispatch: ({type: string, payload: object}) => {
    then(param: (result) => void): any;
  },
};
const handleRole = {
  1: '借款人',
  2: '担保人',
  3: '抵质押人',
  4: '共同借款人',
  5: '未知'
}
@connect(({monitorManage}) => ({monitorManage}))
export default class RelationBusiness extends Component<IProps, isState> {

  constructor(props) {
    super(props);
    console.log('props', props)
    this.state = {
      isOpened: false,
      isRoleOpened: false,
      dataSource: props.data || [],
      curItem: 0,
      curActionSheetType: 0,
      isDeleteOpendModal: false,
      deleteIndex: 0,
      saveClickRole: [],
      // checkObligorNumber: []
    };
  }

  componentWillMount() {
    const {router: {params: {id}}} = getCurrentInstance();
    console.log('111111111111111111111', id)
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<isState>, snapshot?: any) {
    this.props.value(this.state.dataSource)
  }

  onOpenActionSheetClick = (e, index) => {
    console.log('eeeee', e)
    this.setState({
      isOpened: e === 3,
      isRoleOpened: !e,
      curItem: index,
      curActionSheetType: e,
    })
  }

  onCancel = (value) => {
    this.setState({
      [value]: false
    })
  }

  onSheetItemClick = (type, value) => {
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
    this.onCancel(curActionSheetType ? 'isOpened' : 'isRoleOpened')
  }

  onInput = (e, type, index) => {
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

  onBlur = (e, type, index) => {
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
    if(type === 'obligorNumber'){
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

  delete = (index) => {
    this.setState({
      deleteIndex: index,
      isDeleteOpendModal: true
    })
  }

  onDeleteCancel = () => {
    this.setState({
      isDeleteOpendModal: false
    })
  }

  onDeleteConform = () => {
    const {deleteIndex} = this.state;
    let {dataSource} = this.state;
    dataSource = dataSource.filter((_, i) => i !== deleteIndex);
    this.setState({
      dataSource,
      isDeleteOpendModal: false
    })
    console.log(82, deleteIndex, this.state, dataSource)
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

  render() {
    const {isOpened, isRoleOpened, dataSource, isDeleteOpendModal} = this.state;
    console.log(65, this)
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
    console.log("isOpened%%isRoleOpened", isOpened, isRoleOpened)
    const {data} = this.props;
    return (
      <View>
        {
          dataSource.map((res, index) => {
            return (
              <View>
                <View className='yc-addBusiness-relationTextContent'>
                  <View
                    className='yc-addBusiness-baseInfoText yc-addBusiness-relationBaseInfoText'>关联债务人{index + 1}</View>
                  <View className='yc-addBusiness-deleteText' onClick={() => this.delete(index)}>刪除</View>
                </View>

                <View className='yc-addBusiness-baseInfo'>
                  <View className='yc-addBusiness-baseInfo-topLine'/>
                  {
                    relationBusinessConfig.map((i, indexTemp) => {
                      return (
                        <View className='yc-addBusiness-baseInfo-input'>
                          <View className='yc-addBusiness-baseInfo-input-content'>
                            <View className='yc-addBusiness-baseInfo-input-content-inputText'>{i.title}</View>
                            {
                              i.type === 'input' ?
                                <Input
                                  className='yc-addBusiness-baseInfo-input-content-inputTemp'
                                  name={i.field + index}
                                  type='text'
                                  placeholder={i.placeHolder}
                                  value={res[i.field]}
                                  onInput={(e) => this.onInput(e, i.field, index)}
                                  onBlur={(e) => {
                                    this.onBlur(e, i.field, index)
                                  }}
                                /> :
                                <View className='yc-addBusiness-baseInfo-input-content-selectTemp'
                                      onClick={() => {
                                        this.onOpenActionSheetClick(indexTemp, index)
                                      }}>
                                  <View
                                    className='yc-addBusiness-baseInfo-input-content-selectTemp-selectText'>{indexTemp ? handleBorrowType[res.borrowType] ? handleBorrowType[res.borrowType] : i.placeHolder : handleRole[res.role] || i.placeHolder}</View>
                                  <View className='yc-addBusiness-baseInfo-input-content-selectTemp-arrow'>
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
        <View className='yc-addBusiness-empty'/>
        <AtActionSheet isOpened={isOpened} cancelText='取消' onCancel={() => {
          this.onCancel('isOpened')
        }}
                       onClose={() => {
                         this.onCancel('isOpened')
                       }}
        >
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
        <AtActionSheet isOpened={isRoleOpened} cancelText='取消' onCancel={() => {
          this.onCancel('isRoleOpened')
        }}
                       onClose={() => {
                         this.onCancel('isRoleOpened')
                       }}
        >

          {/*<AtActionSheetItem onClick={() => {*/}
          {/*  this.onSheetItemClick('role', 1)*/}
          {/*}}>*/}
          {/*  借款人*/}
          {/*</AtActionSheetItem>*/}
          <AtActionSheetItem onClick={() => {
            this.onSheetItemClick('role', 2)
          }}>
            担保人
          </AtActionSheetItem>
          {/*<AtActionSheetItem onClick={() => {*/}
          {/*  this.onSheetItemClick('role', 3)*/}
          {/*}}>*/}
          {/*  抵质押人*/}
          {/*</AtActionSheetItem>*/}
          <AtActionSheetItem onClick={() => {
            this.onSheetItemClick('role', 4)
          }}>
            共同借款人
          </AtActionSheetItem>
          {/*<AtActionSheetItem onClick={() => {*/}
          {/*  this.onSheetItemClick('role', 5)*/}
          {/*}}>*/}
          {/*  未知*/}
          {/*</AtActionSheetItem>*/}
        </AtActionSheet>

        <View className='yc-addBusiness-deleteModal'>
          <AtModal isOpened={isDeleteOpendModal}>
            <AtModalContent>
              <View>确定删除该债务人的信息？</View>
            </AtModalContent>
            <AtModalAction>
              <Button onClick={this.onDeleteCancel}>取消</Button>
              <Button onClick={this.onDeleteConform}>确定</Button>
            </AtModalAction>
          </AtModal>
        </View>

      </View>
    )
  }
}
