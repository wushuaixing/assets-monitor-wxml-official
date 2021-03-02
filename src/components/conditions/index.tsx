import React, { Component } from "react";
import {Image, Text, View} from '@tarojs/components';
import { AtButton, AtFloatLayout, AtCalendar} from 'taro-ui';
import clear from '../../assets/img/components/clear.png';
import { connect } from 'react-redux';
// import configType from '../query-drop/index'
import './index.scss';

interface conditionType{
  type: string
  field?: any
  requird?: boolean
  value?: string
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
  config: any
  currentId: number
  conditions: conditionType
  onCancel: () => void
  onsetParams: ({}) => void
  onEditConfig: (id: number, title: string, conditions: conditionType) => void
  onhandleQueryAssets: (payload: any) => void
  onhandleQueryRisk: (payload: any) => void
}

type IState = {
  isStartTime: boolean
  isEndTime: boolean
  startTime: string
  endTime: string
  titleName: string
  lineChooseValue: string[]
  conditions: conditionType
  leftArray: leftArrayType[]
  rightArray: rightArrayType[]
  chooseArray: rightArrayType[]
};

// 聚合获取线性选择的左边框
function getLeftArray(conditions) {
  let leftArray: leftArrayType[] = [];
  if(conditions.type === 'line-choose'){
    leftArray = conditions.field.map(it => { return {id: it.id, name: it.name, isSelected: it.isSelected}});
  }
  return leftArray;
}

// 聚合获取线性选择的右边框
// function getRightArray(conditions, id) {
//   let rightArray: rightArrayType[] = [];
//   if(conditions.type === 'line-choose'){
//     rightArray = conditions.field.filter(it => it.id === id)[0].childrenName;
//   }
//   return rightArray;
// }

// 聚合单项选择选择项数组
// function getChooseArray(conditions) {
//   let chooseArray: any = [];
//   if(conditions.type === 'selected' && conditions.field.length > 0){
//     chooseArray = conditions.field
//   }
//   return chooseArray;
// }

function getConditions(config, id) {
  let conditions: conditionType = {};
  config.filter((item) => item.id === id)[0].conditions;
  return conditions;
}

@connect(({ common }) => ({ ...common }))
export default class Conditions extends Component <IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      conditions: getConditions(props.config, props.currentId),
      lineChooseValue: [],
      chooseArray: [],
      isStartTime: false,
      isEndTime: false,
      startTime: '',
      endTime: '',
      titleName: '',
    };
    this.params = {};
  }

  // componentWillUpdate(nextProps: Readonly<IProps>): void {
  //   const { config } = this.props;
  //   if(JSON.stringify(config) !== JSON.stringify(nextProps.config)){
  //     this.setState({
  //       config: nextProps.config
  //     })
  //   }
  // }

  // 选择单项之后关闭窗口
  onSelected = (info) => {
    const { currentId, dispatch } = this.props;
    dispatch({
      type:'common/updateSelect',
      payload: {
        currentId: currentId,
        id: info.id,
        info: info
      }
    });
  };

  // 线性选择的第一列
  chooseType = (info: leftArrayType) => {
    const { currentId, dispatch } = this.props;
    dispatch({
      type:'common/updateChooseLeft',
      payload: {
        currentId: currentId,
        info: info
      }
    });
  };

  // 线性选择的子节点
  chooseChildrenType = (info: rightArrayType) => {
    const { currentId, dispatch } = this.props;
    dispatch({
      type:'common/updateChooseRight',
      payload: {
        currentId: currentId,
        info: info
      }
    });
  };

  // 点击输入框触发日期弹窗组件
  onFocusInput = (type) => {
    if(type === 'startTime'){
      this.setState({
        isStartTime: true,
        isEndTime: false
      })
    }
    else {
      this.setState({
        isStartTime: false,
        isEndTime: true
      })
    }
  };

  // 重置
  onReset = () => {
    const { currentId, conditions, onEditConfig } = this.props;
    // console.log('conditions === ', conditions);
    onEditConfig(currentId, '', conditions);
    this.setState({
      isStartTime: false,
      isEndTime: false,
      // chooseArray: getChooseArray(conditions),
      leftArray: getLeftArray(conditions),
      // rightArray: getRightArray(conditions, 1),
      startTime: '',
      endTime: '',
    });
  };

  // 确认按钮
  onConfirm = () => {
    const { onCancel, onsetParams, onEditConfig, currentId, conditions } = this.props;
    const { startTime, endTime, titleName, leftArray, rightArray} = this.state;
    const newParams = {...this.params};
    this.params = {...newParams, updateTimeStart: startTime, updateTimeEnd: endTime };
    // 将参数传到父组件去
    let field = conditions.field;
    let newField = [];
    let leftItem = leftArray.filter(item => item.isSelected)[0];
    field.forEach(item => {
      if(leftItem.id === item.id){
        newField.push({...item, isSelected: true, childrenName: rightArray})
      }
      else {
        newField.push({...item, isSelected: false})
      }
    });

    let newConditions = {...conditions, field: newField};
    onsetParams(this.params);
    if(currentId === 2){
      onEditConfig(currentId, titleName, newConditions);
    }
    else {
      onEditConfig(currentId, titleName, conditions);
    }
    onCancel();
  };

  // 清空输入框
  onClearInput = (type) => {
    if(type === 'startTime'){
      this.setState({
        startTime: '',
        isStartTime: false,
      })
    }
    else {
      this.setState({
        endTime: '',
        isEndTime: false
      })
    }
  };

  // 点击日期事件
  onClickDate = (item, type) => {
    if(type === 'startTime'){
      this.setState({
        startTime: item.value
      })
    }
    else {
      this.setState({
        endTime: item.value
      })
    }
  };

  // 关闭浮窗遮罩
  onCloseFloat = (type) => {

  };

  render(){
    const { chooseArray, isStartTime, isEndTime, startTime, endTime } = this.state;
    const { config, leftArray, rightArray, currentId } = this.props;
    let conditions = config.filter(item => item.id === currentId)[0].conditions;
    const { type, field } = conditions;
    console.log('conditions props === ', this.props);
    return (
      <View className='conditions'>
        <View className='conditions-line'/>
        {
          type === 'selected' && <View id='conditions-selected' className='conditions-selected'>
            {
              field.length > 0 && field.map(item => {
                const { isSelected } = item;
                return (
                  <View className='conditions-selected-item' onClick={() => this.onSelected(item)}>
                    <Text className={`conditions-selected-item-name-${isSelected ? `active` : `normal`}`}>{item.name}</Text>
                    {
                      isSelected && <Text className='iconfont icon-selected conditions-selected-item-icon' />
                    }
                  </View>
                )
              })
            }
          </View>
        }
        {/*线性线索类型*/}
        {
          type === 'line-choose' && <View id='conditions-line-choose' className='conditions-line-choose'>
						<View className='conditions-line-choose-left'>
              {
                leftArray.length > 0 && leftArray.map(it => {
                  const { isSelected, isRule} = it;
                  return (
                    <View style={{display: isRule ? 'none' : 'inline-block'}}  className={`conditions-line-choose-left-${isSelected ? `active` : `normal`}`} onClick={() => this.chooseType(it)}>{isRule ? it.name : ''}</View>
                  )
                })
              }
						</View>
						<View className='conditions-line-choose-right'>
              {
                rightArray.length > 0 && rightArray.map((i) => {
                  const { isSelected } = i;
                  return (
                    <View className={`conditions-line-choose-right-${isSelected ? `active` : `normal`}`} onClick={() => this.chooseChildrenType(i)}>
                      {i.name}
                      {
                        isSelected && <Text className={`iconfont icon-selected conditions-line-choose-right-icon`} />
                      }
                    </View>
                  )
                })
              }
						</View>
					</View>
        }
        {/*时间弹窗*/}
        {
          type === 'time' && <View id='conditions-time' className='conditions-time'>
            <View className='conditions-time-title'>推送日期</View>
						<View className='conditions-time-box'>
              <View className='conditions-time-box-left'>
								<View className='conditions-time-box-left-input'>
                  {
                    startTime ? <View className='conditions-time-box-left-input-text' onClick={() => this.onFocusInput('startTime')}>{startTime}</View> : <View className='conditions-time-box-left-input-placeholder' onClick={() => this.onFocusInput('startTime')}>开始日期</View>
                  }
                </View>
                <Image
                  src={clear}
                  className='conditions-time-box-left-icon'
                  onClick={() => this.onClearInput('startTime')}
                />
              </View>
              <View className='conditions-time-box-segmentation'>~</View>
							<View className='conditions-time-box-right'>
								<View className='conditions-time-box-right-input'>
                  {
                    endTime ? <View className='conditions-time-box-right-input-text' onClick={() => this.onFocusInput('endTime')}>{endTime}</View> : <View className='conditions-time-box-right-input-placeholder' onClick={() => this.onFocusInput('endTime')}>结束日期</View>
                  }
								</View>
								<Image
									src={clear}
									className='conditions-time-box-right-icon'
									onClick={() => this.onClearInput('endTime')}
								/>
							</View>
            </View>
          </View>
        }
        {/*按钮*/}
        {
          type !== 'selected' && <View className='conditions-btn'>
						<AtButton className='conditions-btn-reset' type='secondary' onClick={this.onReset}>重置</AtButton>
						<AtButton className='conditions-btn-confirm' type='primary' onClick={this.onConfirm}>确定</AtButton>
					</View>
        }
        {
          isStartTime && <AtFloatLayout isOpened onClose={() => this.onCloseFloat('startTime')}>
						<AtCalendar isSwiper={false} maxDate={endTime} onDayClick={(e) => this.onClickDate(e, 'startTime')}/>
          </AtFloatLayout>
        }
        {
          isEndTime && <AtFloatLayout isOpened onClose={() => this.onCloseFloat('endTime')}>
						<AtCalendar isSwiper={false} minDate={startTime} onDayClick={(e) => this.onClickDate(e, 'endTime')}/>
					</AtFloatLayout>
        }
      </View>
    );
  }
}
