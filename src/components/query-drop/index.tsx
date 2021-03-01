import React, { Component } from "react";
import Taro, { eventCenter, getCurrentInstance }from '@tarojs/taro';
import { Text, View} from '@tarojs/components';
import SingelSelected from '../single-selected/index';
import LineChoose from "../line-choose/index";
import MultipleForm from '../multiple-form/index';
import { connect } from 'react-redux';
import './index.scss';

interface childType{
  id: number
  isSelected: boolean
  name: string
  value: any
}

export interface conditionsType{
  name: string,
  id: number,
  value?: any
  isSelected: boolean
  childrenName?: childType[]
}

export interface configType{
  id: number,
  title: string,
  type: string,
  isSelected?: boolean,
  conditions: conditionsType[]
  field: string
}

type IProps = {
  type: string
  config: configType[]
  initConfig: configType[]
  onsetParams: (params?: any) => void
  dispatch: any
  dropParams: {}
}

type IState = {
  animation: any
  searchConfig?: [[]]
  isMask: boolean
  maskHeight: number
  currentType: string
  currentTab: configType
  params: {[propName: string] : any}
  conditions: conditionsType[]
};

@connect(({ queryDrop }) => ({ ...queryDrop }))
class QueryDrop extends Component<IProps, IState>{
  $instance = getCurrentInstance();
  constructor(props) {
    super(props);
    this.state = {
      animation: '',
      isMask: false,
      maskHeight: 0,
      currentType: '',
      conditions: [],
      params: {},
      currentTab: {},
    };
  }

  componentWillMount(): void {
    const { dispatch, initConfig } = this.props;
    dispatch({
      type:'queryDrop/initConfig',
      payload: initConfig
    });
    const onReadyEventId = this.$instance.router.onReady;
    const onShowEventId = this.$instance.router.onShow;
    eventCenter.once(onReadyEventId, this.onRady);
    eventCenter.on(onShowEventId, this.onShow);
  }


  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>): boolean {
    const { isMask } = this.state;
    const { config, type} = this.props;
    return JSON.stringify(config) !== JSON.stringify(nextProps.config) || type !== nextProps.type || isMask !== nextState.isMask
  }

  componentWillUpdate(nextProps: Readonly<IProps>,  nextState: Readonly<IState>): void {
    const { dispatch, type} = this.props;
    // console.log('state === ', this.state, nextState);
    if(type !== nextProps.type){
      dispatch({
        type:'queryDrop/initConfig',
        payload: nextProps.initConfig
      });
      this.setState({
        isMask: false,
      });
    }
  }

  componentWillUnmount(): void {
    const onReadyEventId = this.$instance.router.onReady;
    const onShowEventId = this.$instance.router.onShow;
    // 卸载
    eventCenter.off(onShowEventId, this.onShow);
    eventCenter.off(onReadyEventId, this.onRady);
  }

  onRady = () => {
    let height = 0;
    Taro.getSystemInfo({
      success: (info) => {
        // console.log('info === ', info);
        height = info.windowHeight;
        // onReady 触发后才能获取小程序渲染层的节点
        Taro.createSelectorQuery().select('#drop-box')
          .boundingClientRect()
          .exec(res => {
            // console.log('res === ', res, height);
            this.setState({
              maskHeight: height - res[0].top
            })
          })
      }
    });
  };

  onShow = () => {
  };

  // 点击切换筛选条件Tab
  handleClick = (info) => {
    this.setState({
      currentTab: info,
      isMask: true,
    });
    const { dispatch } = this.props;
    dispatch({
      type:'queryDrop/updateShowSelected',
      payload: info
    });
  };

  // 处理单线的参数
  handleDealParams = (info, conditions) => {
    const { currentTab, params} = this.state;
    const { dispatch } = this.props;
    dispatch({
      type:'queryDrop/updateConfig',
      payload: {
        tab: currentTab,
        conditions,
        info,
      }
    });
    let newParams = { ...params, [currentTab.field] : info.value };
    this.handleRequestParmas(newParams);
    this.setState({
      params: newParams,
      isMask: false
    });
  };

  // 处理线性选择的参数
  handleDealLineChoose = (info, conditions) => {
    const { currentTab, params } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type:'queryDrop/updateLineConfig',
      payload: {
        tab: currentTab,
        conditions,
        info,
      }
    });
    let newParams = {...params, [currentTab.field] : info.value, };
    this.handleRequestParmas(newParams);
    this.setState({
      params: newParams,
      isMask: false
    });
  };

  // 处理多样化表单的参数
  handleSubmitForm = (conditions, formParams) => {
    const { currentTab, params } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type:'queryDrop/updateFormConfig',
      payload: {
        tab: currentTab,
        conditions,
      }
    });
    let newParams = {...params, ...formParams};
    this.handleRequestParmas(newParams);
    this.setState({
      params: newParams,
      isMask: false
    });
  };

  // 点击关闭筛选条件
  handleClosePanel = () => {
    this.setState({
      isMask: false
    })
  };

  // 收集子组件传来的参数
  handleRequestParmas = (params) => {
    const { onsetParams } = this.props;
    onsetParams(params);
  };

  render(){
    const { currentTab, isMask, maskHeight } = this.state;
    const { config } = this.props;
    return (
      <View className='drop'>
        <View className='drop-box' id='drop-box'>
          {
            config.length > 0 && config.map((item, index) => {
              const { isSelected } = item;
              return (
                <View onClick={() => this.handleClick(item)} className='drop-box-tab'>
                  <View className='drop-box-tab-text'>
                    <Text className={`drop-box-tab-text-${isSelected ? `active` : `normal`}`} >{item.title}</Text>
                    {
                      index === 0 || index === 1 ? <Text className={`iconfont icon-${isSelected ? `up` : `down`}-arrow drop-box-tab-icon-${isSelected ? `active` : `normal`}`} /> : <Text className={`iconfont icon-more drop-box-tab-icon-${isSelected ? `active` : `normal`}`} />
                    }
                  </View>
                  {
                    index < config.length - 1 && <View className='drop-box-tab-divider'/>
                  }
                </View>
              )
            })
          }
        </View>
        {
          isMask && <View className='drop-content'>
            {/*单选*/}
            {
              currentTab.type === 'singelSelected' && <SingelSelected
                conditions={currentTab.conditions}
                onChange={this.handleDealParams}
              />
            }
            {/*线性选择*/}
            {
              currentTab.type === 'lineChoose' && <LineChoose
                conditions={currentTab.conditions}
                onConfirmLineChoose={this.handleDealLineChoose}
              />
            }
            {/*表单多选*/}
            {
              currentTab.type === 'multipleForm' && <MultipleForm
			          conditions={currentTab.conditions}
			          onConfirmForm={this.handleSubmitForm}
		          />
            }
					</View>
        }
        {
          isMask && <View className='drop-query-mask' style={{ height: maskHeight }} onClick={this.handleClosePanel} />
        }
      </View>
    );
  }
}

export default QueryDrop;

