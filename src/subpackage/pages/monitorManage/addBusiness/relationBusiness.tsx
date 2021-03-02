import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Button, View, Input, Form, Text} from '@tarojs/components';
import {AtActionSheet, AtActionSheetItem} from 'taro-ui';
import './index.scss'

type isState = {
  isOpened: boolean,
  isRoleOpened: boolean,
  dataSource: any,
  curItem: number,
  curActionSheetType: number,
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
    this.state = {
      isOpened: false,
      isRoleOpened: false,
      dataSource: props.data || [],
      curItem: 0,
      curActionSheetType: 0
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

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<isState>, snapshot?: any) {
    this.props.value(this.state.dataSource)
  }

  onOpenActionSheetClick = (e, index) => {
    console.log('eeeee', e)
    this.setState({
      isOpened: !e,
      isRoleOpened: e === 3,
      curItem: index,
      curActionSheetType: e
    })
  }

  onCancel = (value) => {
    this.setState({
      [value]: false
    })
  }

  onSheetItemClick = (type, value) => {
    const {curItem, dataSource, curActionSheetType} = this.state;
    dataSource[curItem][type] = value;
    if(type === 'role'){
      dataSource[curItem].roleText = handleRole[value];
    }
    this.setState({
      dataSource
    })
    this.onCancel(curActionSheetType ? 'isRoleOpened' : 'isOpened')
  }

  onInput = (e, type, index) => {
    const {dataSource} = this.state;
    dataSource[index][type] = e.detail.value;
    this.setState({
      dataSource
    })
  }

  delete = (index) => {
    let {dataSource} = this.state;
    dataSource = dataSource.filter((_, i) => i !== index);
    this.setState({
      dataSource
    })
    console.log(82, index, this.state, dataSource)
  }

  addClick = () => {
    const {dataSource} = this.state;
    const obj = {
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
      "roleText": ""
    }
    dataSource.push(obj);
    this.setState({
      dataSource
    })
  }

  render() {
    const {isOpened, isRoleOpened, dataSource} = this.state;
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
        placeHolder: '请填写借款人名称（必填）',
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
                <View>
                  <View className='yc-addBusiness-baseInfoText'>关联债务人{index + 1}</View>
                  <View className='yc-addBusiness-deleteText' onClick={() => this.delete(index)}>刪除</View>
                </View>

                <View className='yc-addBusiness-baseInfo'>
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
                                /> :
                                <View className='yc-addBusiness-baseInfo-input-content-selectTemp'
                                      onClick={() => {
                                        this.onOpenActionSheetClick(indexTemp, index)
                                      }}>
                                  <View
                                    className='yc-addBusiness-baseInfo-input-content-selectTemp-selectText'>{indexTemp ? handleRole[res.role] ? handleRole[res.role] : i.placeHolder : handleBorrowType[res.borrowType] || i.placeHolder}</View>
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
                </View>
              </View>
            )
          })
        }
        <View onClick={this.addClick} className='yc-addBusiness-relationText'>添加关联债务人</View>
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

          <AtActionSheetItem onClick={() => {
            this.onSheetItemClick('role', 1)
          }}>
            借款人
          </AtActionSheetItem>
          <AtActionSheetItem onClick={() => {
            this.onSheetItemClick('role', 2)
          }}>
            担保人
          </AtActionSheetItem>
          <AtActionSheetItem onClick={() => {
            this.onSheetItemClick('role', 3)
          }}>
            抵质押人
          </AtActionSheetItem>
          <AtActionSheetItem onClick={() => {
            this.onSheetItemClick('role', 4)
          }}>
            共同借款人
          </AtActionSheetItem>
          <AtActionSheetItem onClick={() => {
            this.onSheetItemClick('role', 5)
          }}>
            未知
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}
