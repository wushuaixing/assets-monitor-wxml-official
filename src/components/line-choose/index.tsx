import React, { Component } from "react";
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import './index.scss';

interface childType{
  id: number
  isSelected: boolean
  name: string
  value: any
  isRule: boolean
}

export interface conditionsType{
  name: string,
  id: number,
  value?: any
  isSelected: boolean
  childrenName?: childType[]
}

interface leftArrayType{
  id: number
  isSelected: boolean
  name: string
}

interface rightArrayType{
  id: number
  name: string
  value: string
  isSelected: boolean
}


type IProps = {
  conditions: conditionsType[]
  onConfirmLineChoose: (info: childType, condition: conditionsType[]) => void
}

type IState = {
  leftId: number
  childrenName: childType[]
  info: childType | {}
  conditions: conditionsType[]
  leftArray: leftArrayType[]
  rightArray: rightArrayType[]
  chooseArray: rightArrayType[]
};


export default class LineChoose extends Component <IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      conditions: [],
      childrenName: [],
      leftId: 0,
      chooseArray: [],
      info: {}
    };
  }

  componentWillMount(): void {
    const { conditions } = this.props;
    this.setState({
      conditions,
      childrenName: conditions.filter(item => item.isSelected)[0].childrenName,
      leftId: conditions.filter(item => item.isSelected)[0].id,
      info: conditions.filter(item => item.isSelected)[0].childrenName[0],
    });
  }

  // 线性选择的左边列
  chooseLeft = (info: conditionsType) => {
    const { conditions } = this.state;
    let newConditions: conditionsType[] = [];
    conditions.forEach(item => {
      if(info.id === item.id){
        newConditions.push({...item, isSelected: true})
      }
      else {
        newConditions.push({...item, isSelected: false})
      }
    });
    newConditions.sort((a, b) => a.id - b.id);
    this.setState({
      conditions: [...newConditions],
      childrenName: info.childrenName,
      leftId: info.id,
      info: info.childrenName[0]
    });
  };

  // 线性选择的左边列
  chooseRight = (info: childType) => {
    const { leftId, childrenName, conditions } = this.state;
    let newChildrenName: childType[] = [];
    childrenName.forEach(item => {
      if(info.id === item.id){
        newChildrenName.push({...item, isSelected: true})
      }
      else {
        newChildrenName.push({...item, isSelected: false})
      }
    });
    newChildrenName.sort((a, b) => a.id - b.id);
    let newConditions: conditionsType[] = [];
    conditions.forEach(item => {
      if(leftId === item.id){
        newConditions.push({...item, isSelected: true, childrenName: newChildrenName})
      }
      else {
        newConditions.push({...item, isSelected: false})
      }
    });
    newConditions.sort((a, b) => a.id - b.id);
    this.setState({
      info,
      childrenName: [...newChildrenName],
      conditions: [...newConditions],
    })
  };

  // 重置
  onReset = () => {
    const { conditions } = this.props;
    let newChildrenName = [];
    conditions[0].childrenName.forEach(item => {
      newChildrenName.push({...item, isSelected: item.id === 1})
    });
    let newConditions = [];
    conditions.forEach(item => {
      newConditions.push({...item, isSelected: item.id === 1})
    });
    this.setState({
      conditions: JSON.parse(JSON.stringify(newConditions)),
      childrenName: JSON.parse(JSON.stringify(newChildrenName))
    });
  };

  // 确认按钮
  onConfirm = () => {
    const { info, conditions } = this.state;
    const { onConfirmLineChoose } = this.props;
    onConfirmLineChoose(info, conditions);
  };

  render(){
    const { conditions, childrenName } = this.state;
    return (
      <View className='conditions'>
        <View className='conditions-line'/>
        <View id='conditions-line-choose' className='conditions-line-choose'>
          <View className='conditions-line-choose-left'>
            {
              conditions.length > 0 && conditions.map(item => {
                const { isSelected } = item;
                return (
                  <View
                    className={`conditions-line-choose-left-${isSelected ? `active` : `normal`}`}
                    onClick={() => this.chooseLeft(item)}>{item.name}
                  </View>
                )
              })
            }
          </View>
          <View className='conditions-line-choose-right'>
            {
              childrenName.length > 0 && childrenName.map((item) => {
                const { isSelected, isRule } = item;
                return (
                  isRule ? <View
                    className={`conditions-line-choose-right-${isSelected ? `active` : `normal`}`}
                    onClick={() => this.chooseRight(item)}>
                    {item.name}
                    {
                      isSelected && <Text className='iconfont icon-selected conditions-line-choose-right-icon' />
                    }
                  </View> : null
                )
              })
            }
          </View>
        </View>
        <View className='conditions-btn'>
          <AtButton className='conditions-btn-reset' type='secondary' onClick={this.onReset}>重置</AtButton>
          <AtButton className='conditions-btn-confirm' type='primary' onClick={this.onConfirm}>确定</AtButton>
        </View>
      </View>
    );
  }
}
