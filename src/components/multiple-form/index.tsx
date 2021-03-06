import React, { Component } from "react";
import Taro, { eventCenter, getCurrentInstance }from '@tarojs/taro';
import {Image, View} from '@tarojs/components';
import { AtButton, AtFloatLayout, AtCalendar} from 'taro-ui';
import clear from '../../assets/img/components/clear.png';
import './index.scss';
import moment from "moment";

interface chooseItem {
  name: string
  value: string
  active: boolean
}

export interface conditionsType{
  name: string
  type: string
  value?: any
  field: any
  chooseType?: string
  chooseTag?: chooseItem[]
}

type IProps = {
  conditions: conditionsType[]
  onConfirmForm: (conditions: conditionsType[], params: any) => void
}

type IState = {
  isStartTime: boolean
  isEndTime: boolean
  conditions: conditionsType[]
  chooseTag: chooseItem[]
  params: any
  info: any
};

export default class MultipleForm extends Component <IProps, IState>{
  $instance = getCurrentInstance();
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
    const onHideEventId = this.$instance.router.onHide;
    eventCenter.on(onHideEventId, this.onHide);
    const { conditions } = this.props;
    const { params} = this.state;
    let newParms = {...params};
    conditions.forEach(item => {
      const field = item.field || [];
      const value = item.value || [];
      if(item.type === 'time'){
        if( (value || []).length > 0){
          newParms = {...params, [field[0]]: value[0] || '', [field[1]]: value[1] || ''};
        }
        else if(item.chooseType === 'quickTimeTag' && (item.chooseTag || []).filter(it => it.active).length > 0){
          let start : string | null = null;
          let end : string | null = null;
          (item.chooseTag || []).forEach(it => {
            if(it.active){
              start = it.value === '1' ? moment().format('YYYY-MM-DD') : (it.value === '2' ? moment().subtract(7,'d').format('YYYY-MM-DD') : null);
              end = it.value === '3' ? null : moment().format('YYYY-MM-DD');
            }
          });
          newParms = {...params, [field[0]]: start, [field[1]]: end};
        }
      }
    });
    // console.log(' WillMount params ===', newParms, JSON.stringify(newParms), conditions, JSON.stringify(conditions));
    this.setState({
      conditions,
      params: newParms,
      info: conditions[0],
    });
  }

  componentWillUnmount(): void {
    const onHideEventId = this.$instance.router.onHide;
    eventCenter.off(onHideEventId, this.onHide)
  }

  onHide = () => {
    const { conditions } = this.props;
    this.setState({
      conditions,
      isStartTime: false,
      isEndTime: false,
      params: {},
      info: {},
    })
  };

  // ???????????????????????????????????????
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

  // ??????
  onReset = () => {
    const { conditions, params} = this.props;
    const { info } = this.state;
    let newParmas = {...params, [info.field[0]] : '', [info.field[1]]: ''};
    let newConditions: conditionsType[] = [];
    let newChooseTag = [];
    conditions.forEach(item => {
      if(item.type === 'time' && item.chooseType === 'quickTimeTag'){
        (item.chooseTag || []).forEach(it => {
          newChooseTag.push({...it, active: false})
        });
        newConditions.push({...item, value: Array.isArray(item.value) ? [] : '', chooseTag: newChooseTag})
      }
      else {
        newConditions.push({...item, value: Array.isArray(item.value) ? [] : ''})
      }
    });
    this.setState({
      conditions: newConditions,
      params: newParmas,
      isStartTime: false,
      isEndTime: false,
    });
  };

  // ????????????
  onConfirm = () => {
    const { conditions, params } = this.state;
    // console.log('onConfirm conditions === ', conditions, JSON.stringify(conditions), params, JSON.stringify(params));
    const { onConfirmForm } = this.props;
    onConfirmForm(conditions, params);
  };

  // ???????????????
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

  // ??????????????????
  onClickDate = (date: {value: string}, type: string) => {
    const { info, conditions, params} = this.state;
    let newConditions: conditionsType[] = [];
    let newChooseTag = [];
    conditions.forEach(item => {
      if(info.name === item.name && info.type === 'time'){
        if(info.chooseType === 'quickTimeTag'){
          info.chooseTag.forEach(it => {
            newChooseTag.push({...it, active: false });
          });
          newConditions.push({...item, chooseTag: newChooseTag, value: type === 'start' ? [date.value, item.value[1]] : [item.value[0], date.value]})
        }
      else {
          newConditions.push({...item, value: type === 'start' ? [date.value, item.value[1]] : [item.value[0], date.value]})
        }
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

  // ??????????????????
  onCloseFloat = (type) => {

  };

  handleSwitchDate = (info) => {
    const { conditions, params } = this.state;
    let start : Date | null | string = null;
    let end : Date | null | string = null;
    let startName : string = '';
    let endName : string = '';
    let newChooseTag: chooseItem[] = [];
    let newConditions: conditionsType[] = [];
    conditions.forEach(item => {
      if(item.type === 'time' && item.chooseType === 'quickTimeTag'){
        startName = item.field[0];
        endName = item.field[1];
        item.chooseTag.forEach(it => {
          newChooseTag.push({...it, active: info.name === it.name })
        });
        newConditions.push({...item, chooseTag: newChooseTag, value: [null, null]})
      }
      else {
        newConditions.push({...item })
      }
    });
    if(info.value === '1'){
      start = moment().format('YYYY-MM-DD');
      end = moment().format('YYYY-MM-DD');
    }
    else if(info.value === '2'){
      start = moment().subtract(7, 'd').format('YYYY-MM-DD');
      end = moment().format('YYYY-MM-DD');
    }
    else {
      start = null;
      end = null;
    }
    let newParams = {...params, [startName]: start, [endName]: end};
    // console.log('newParams === ', newParams, JSON.stringify(newParams));
    this.setState({
      conditions: newConditions,
      params: {...newParams}
    });
  };

  render(){
    const { conditions, info, isStartTime, isEndTime } = this.state;
    // console.log('conditions === ', conditions, JSON.stringify(conditions));
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
                  <View className='conditions-time-title'>????????????</View>
                  {
                    item.chooseType === 'quickTimeTag' && <View className='conditions-time-date'>
                      {
                        item.chooseTag && item.chooseTag.length > 0 && item.chooseTag.map(it => {
                          return <View className={`conditions-time-date-${it.active ? 'activeChoose' : 'choose'}`} onClick={() => this.handleSwitchDate(it)}>{it.name}</View>
                        })
                      }
                    </View>
                  }
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
                            ????????????
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
                            ????????????
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
        {/*??????*/}
        <View className='conditions-bottom'>
          <View className='conditions-bottom-line'/>
          <View className='conditions-bottom-btn'>
            <AtButton className='conditions-bottom-btn-reset' type='secondary' onClick={this.onReset}>??????</AtButton>
            <AtButton className='conditions-bottom-btn-confirm' type='primary' onClick={this.onConfirm}>??????</AtButton>
          </View>
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
