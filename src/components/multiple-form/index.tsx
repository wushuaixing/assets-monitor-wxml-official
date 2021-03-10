import React, { Component } from "react";
import {Image, View} from '@tarojs/components';
import { AtButton, AtFloatLayout, AtCalendar} from 'taro-ui';
import clear from '../../assets/img/components/clear.png';
import './index.scss';

export interface conditionsType{
  name: string
  type: string
  value?: any
  field: any
}

type IProps = {
  conditions: conditionsType[]
  onConfirmForm: (conditions: conditionsType[], params: any) => void
}

type IState = {
  isStartTime: boolean
  isEndTime: boolean
  conditions: conditionsType[]
  params: any
  info: any
};

export default class MultipleForm extends Component <IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      conditions: [],
      isStartTime: false,
      isEndTime: false,
      params: {},
      info: {},
    };
  }

  componentWillMount(): void {
    const { conditions } = this.props;
    const { params} = this.state;
    let newParms = {...params };
    conditions.forEach(item => {
      const field = item.field || [];
      const value = item.value || [];
      if(item.type === 'time' && (value || []).length > 0){
        newParms = {...params, [field[0]]: value[0] || '', [field[1]]: value[1] || ''};
      }
    });
    this.setState({
      conditions,
      params: newParms,
      info: conditions[0],
    });
  }

  // 点击输入框触发日期弹窗组件
  onFocusInput = (info, type) => {
    if(type === 'start'){
      this.setState({
        isStartTime: true,
        isEndTime: false,
        info,
      })
    }
    else {
      this.setState({
        isStartTime: false,
        isEndTime: true,
        info,
      })
    }
  };

  // 重置
  onReset = () => {
    const { conditions, params} = this.props;
    const { info } = this.state;
    let newParmas = {...params, [info.field[0]] : '', [info.field[1]]: ''};
    let newConditions: conditionsType[] = [];
    conditions.forEach(item => {
      newConditions.push({...item, value: Array.isArray(item.value) ? [] : ''})
    });
    this.setState({
      conditions: newConditions,
      params: newParmas,
      isStartTime: false,
      isEndTime: false,
    });
  };

  // 确认按钮
  onConfirm = () => {
    const { conditions, params } = this.state;
    const { onConfirmForm } = this.props;
    onConfirmForm(conditions, params);
  };

  // 清空输入框
  onClearInput = (info, type) => {
    const { conditions, params } = this.state;
    let newConditions: conditionsType[] = [];
    conditions.forEach(item => {
      if(info.name === item.name){
        newConditions.push({...item, value: type === 'start' ? ['', item.value[1]] : [item.value[0], '']})
      }
      else {
        newConditions.push({...item })
      }
    });
    let newParmas = {...params, [type === 'start' ? info.field[0] : info.field[1]]: ''};
    this.setState({
      isStartTime: false,
      isEndTime: false,
      conditions: newConditions,
      params: newParmas,
      info,
    });
  };

  // 点击日期事件
  onClickDate = (date: {value: string}, type: string) => {
    const { info, conditions, params} = this.state;
    let newConditions: conditionsType[] = [];
    conditions.forEach(item => {
      if(info.name === item.name){
        newConditions.push({...item, value: type === 'start' ? [date.value, item.value[1]] : [item.value[0], date.value]})
      }
      else {
        newConditions.push({...item })
      }
    });
    let newParms = {...params, [type === 'start' ? info.field[0] : info.field[1]]: date.value };
    this.setState({
      conditions: newConditions,
      params: newParms,
      isStartTime: false,
      isEndTime: false,
    });
  };

  // 关闭浮窗遮罩
  onCloseFloat = (type) => {

  };

  render(){
    const { conditions, info, isStartTime, isEndTime } = this.state;
    return (
      <View className='conditions'>
        <View className='conditions-line'/>
        {
          conditions.length > 0 && conditions.map((item) => {
            const { type } = item;
            const value = item.value || [];
            if(type === 'time'){
              return (
                <View className='conditions-time'>
                  <View className='conditions-time-title'>推送日期</View>
                  <View className='conditions-time-box'>
                    <View className='conditions-time-box-left'>
                      <View className='conditions-time-box-left-input'>
                        {
                          value[0] ? <View
                            className='conditions-time-box-left-input-text'
                            onClick={() => this.onFocusInput(item, 'start')}
                          >{value[0]}
                          </View> : <View
                            className='conditions-time-box-left-input-placeholder'
                            onClick={() => this.onFocusInput(item, 'start')}>
                            开始日期
                          </View>
                        }
                      </View>
                      {
                        value[0] && <View
                          className='conditions-time-box-left-pic'
                          onClick={() => this.onClearInput(item, 'start')}
                        >
	                        <Image
		                        src={clear}
		                        className='conditions-time-box-left-pic-icon'
	                        />
                        </View>
                      }
                    </View>
                    <View className='conditions-time-box-segmentation'>~</View>
                    <View className='conditions-time-box-right'>
                      <View className='conditions-time-box-right-input'>
                        {
                          value[1] ? <View
                            className='conditions-time-box-right-input-text'
                            onClick={() => this.onFocusInput(item, 'end')}>
                            { value[1]}
                          </View> :  <View
                            className='conditions-time-box-right-input-placeholder'
                            onClick={() => this.onFocusInput(item, 'end')}>
                            结束日期
                          </View>
                        }
                      </View>
                      {
                        value[1] && <View
                          className='conditions-time-box-right-pic'
                          onClick={() => this.onClearInput(item, 'end')}
                        >
	                        <Image
		                        src={clear}
		                        className='conditions-time-box-right-pic-icon'
	                        />
                        </View>
                      }
                    </View>
                  </View>
                </View>
              )
            }
          })
        }
        {/*按钮*/}
        <View className='conditions-btn'>
          <AtButton className='conditions-btn-reset' type='secondary' onClick={this.onReset}>重置</AtButton>
          <AtButton className='conditions-btn-confirm' type='primary' onClick={this.onConfirm}>确定</AtButton>
        </View>
        {
          isStartTime && <AtFloatLayout isOpened onClose={() => this.onCloseFloat('start')}>
						<AtCalendar isSwiper={false} maxDate={info.value[1]} onDayClick={(e) => this.onClickDate(e, 'start')}/>
          </AtFloatLayout>
        }
        {
          isEndTime && <AtFloatLayout isOpened onClose={() => this.onCloseFloat('end')}>
						<AtCalendar isSwiper={false} minDate={info.value[0]} onDayClick={(e) => this.onClickDate(e, 'end')}/>
					</AtFloatLayout>
        }
      </View>
    );
  }
}
