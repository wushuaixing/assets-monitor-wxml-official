import React, { Component } from "react";
import {Image, Input, ScrollView, Text, View} from '@tarojs/components';
import { AtButton, AtFloatLayout, AtCalendar} from 'taro-ui';
import clear from '../../assets/img/components/clear.png';
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
  conditions: conditionType
  onCancel: () => void
  onsetParams: ({}) => void
}

type IState = {
  conditions: conditionType
  leftArray: leftArrayType[]
  rightArray: rightArrayType[]
  chooseArray: rightArrayType[]
  lineChooseValue: string[]
  isStartTime: boolean
  isEndTime: boolean
  startTime: string
  endTime: string
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
function getRightArray(conditions, id) {
  let rightArray: rightArrayType[] = [];
  if(conditions.type === 'line-choose'){
    rightArray = conditions.field.filter(it => it.id === id)[0].childrenName;
  }
  return rightArray;
}

// 聚合单项选择选择项数组
function getChooseArray(conditions) {
  let chooseArray: any = [];
  if(conditions.type === 'selected' && conditions.field.length > 0){
    chooseArray = conditions.field
  }
  return chooseArray;
}


class Conditions extends Component<IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      conditions: props.conditions,
      leftArray: [],
      rightArray: [],
      lineChooseValue: [],
      chooseArray: [],
      isStartTime: false,
      isEndTime: false,
      startTime: '',
      endTime: ''
    };
    this.params = {};
  }

  componentDidMount (){
    const { conditions } = this.props;
    // console.log('conditions === ', conditions);
    if(conditions.type === 'line-choose'){
      this.setState({
        leftArray: getLeftArray(conditions),
      });
      this.setState({
        rightArray: getRightArray(conditions, 1),
      })
    } else if(conditions.type === 'selected'){
      this.setState({
        chooseArray: getChooseArray(conditions),
      });
    }
  }

  componentWillUpdate(nextProps: Readonly<IProps>): void {
    const { conditions } = this.props;
    // console.log('nextProps conditions === ', nextProps.conditions, JSON.stringify(nextProps.conditions));
    if(JSON.stringify(conditions) !== JSON.stringify(nextProps.conditions)){
      if(nextProps.conditions.type === 'line-choose'){
        this.setState({
          leftArray: getLeftArray(nextProps.conditions),
          rightArray: getRightArray(nextProps.conditions, 1)
        });
      }
      else if(nextProps.conditions.type === 'selected'){
        this.setState({
          chooseArray: getChooseArray(nextProps.conditions),
        });
      }
    }
  }

  // 选择单项之后关闭窗口
  onSelected = (item) => {
    const { chooseArray } = this.state;
    const { onsetParams } = this.props;
    const params = {...this.params};
    this.params = {...params, isRead: item.value};
    // 将参数传到父组件去
    onsetParams(this.params);
    const newChooseArray: rightArrayType[] = [];
    chooseArray.forEach((i => {
      if(i.id === item.id){
        newChooseArray.push({...i, isSelected: true})
      }
      else {
        newChooseArray.push({...i, isSelected: false})
      }
    }));
    this.setState({
      chooseArray: newChooseArray
    })
  };

  // 线性选择的第一列
  chooseType = (it: leftArrayType) => {
    const { leftArray } = this.state;
    const { conditions } = this.props;
    let newLeftArray: leftArrayType[] = [];
    leftArray.forEach((i => {
      if(i.id === it.id){
        newLeftArray.push({...i, isSelected: true})
      }
      else {
        newLeftArray.push({...i, isSelected: false})
      }
    }));
    this.setState({
      leftArray: newLeftArray,
      rightArray: getRightArray(conditions, it.id),
    })
  };

  // 线性选择的子节点
  chooseChildrenType = (it: rightArrayType) => {
    const { rightArray } = this.state;
    const params = {...this.params};
    this.params = {...params, assetAndRiskType: it.value};
    let newRightArray: rightArrayType[] = [];
    rightArray.forEach((i => {
      if(i.id === it.id){
        newRightArray.push({...i, isSelected: true})
      }
      else {
        newRightArray.push({...i, isSelected: false})
      }
    }));
    this.setState({
      rightArray: newRightArray
    })
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
    const { conditions } = this.props;
    this.setState({
      isStartTime: false,
      isEndTime: false,
      chooseArray: getChooseArray(conditions),
      leftArray: getLeftArray(conditions),
      rightArray: getRightArray(conditions, 1),
      startTime: '',
      endTime: '',
    });
  };

  // 确认按钮
  onConfirm = () => {
    const { onCancel, onsetParams} = this.props;
    const { startTime, endTime } = this.state;
    const newParams = {...this.params};
    this.params = {...newParams, updateTimeStart: startTime, updateTimeEnd: endTime };
    // 将参数传到父组件去
    onsetParams(this.params);
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
    const { chooseArray, leftArray, rightArray, isStartTime, isEndTime, startTime, endTime } = this.state;
    const { conditions } = this.props;
    const { type } = conditions;
    return (
      <View className='conditions'>
        <View className='conditions-line'/>
        {
          type === 'selected' && <View id='conditions-selected' className='conditions-selected'>
            {
              chooseArray.length > 0 && chooseArray.map(item => {
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
                  const { isSelected } = it;
                  return (
                    <View className={`conditions-line-choose-left-${isSelected ? `active` : `normal`}`} onClick={() => this.chooseType(it)}>{it.name}</View>
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

export default Conditions;
