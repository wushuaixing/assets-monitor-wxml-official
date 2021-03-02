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
}

type IProps = {
  dispatch: ({type: string, payload: object}) => {
    then(param: (result) => void): any;
  },
};
@connect(({monitorManage}) => ({monitorManage}))
export default class RelationBusiness extends Component<IProps, isState> {

  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      isRoleOpened: false,
      dataSource: props.data || [],
      curItem: 0
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
      curItem: index
    })
  }

  onCancel = (value) => {
    console.log("525252", value)
    this.setState({
      [value]: false
    })
  }

  onSheetItemClick = (type, value) => {
    const {curItem, dataSource} = this.state;
    dataSource[curItem][type] = value;
    this.setState({
      dataSource
    })
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
      "borrowType": "0-个人，1-企业",
      "dishonestStatus": 1,
      "id": 1,
      "isBorrower": true,
      "isTable": 0,
      "limitConsumption": 0,
      "limitHeightStatus": 1,
      "obligorId": 1,
      "obligorName": "sy",
      "obligorNumber": "",
      "obligorPushType": 0,
      "openBusinessCount": 1,
      "regStatus": "",
      "riskTotal": 0,
      "role": 1,
      "roleText": "担保人"
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
    console.log("isOpened%%isRoleOpened", isOpened, isRoleOpened)
    const {data} = this.props;
    return (
      <View>
        {
          dataSource.map((res, index) => {
            return (
              <View>
                <View className='yc-addBusiness-baseInfoText'>关联债务人{index}</View>
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
                                    className='yc-addBusiness-baseInfo-input-content-selectTemp-selectText'>{i.placeHolder}</View>
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
                <View onClick={() => this.delete(index)}>刪除</View>
              </View>
            )
          })
          }
          <View onClick={this.addClick}>添加</View>
          <AtActionSheet isOpened={isOpened} cancelText='取消' onCancel={()=>{this.onCancel('isOpened')}}
          onClose={()=>{this.onCancel('isOpened')}}
          >
          <AtActionSheetItem onClick={()=>{this.onSheetItemClick('borrowType','gr')}}>
          个人
          </AtActionSheetItem>
          <AtActionSheetItem onClick={()=>{this.onSheetItemClick('borrowType','qy')}}>
          企业
          </AtActionSheetItem>
          </AtActionSheet>
          <AtActionSheet isOpened={isRoleOpened} cancelText='取消' onCancel={()=>{this.onCancel('isRoleOpened')}}
          onClose={()=>{this.onCancel('isRoleOpened')}}
          >

          <AtActionSheetItem onClick={()=>{this.onSheetItemClick('roleText','jkr')}}>
          借款人
          </AtActionSheetItem>
          <AtActionSheetItem onClick={()=>{this.onSheetItemClick('roleText','wz')}}>
          未知
          </AtActionSheetItem>
          </AtActionSheet>
          </View>
          )
        }
        }
