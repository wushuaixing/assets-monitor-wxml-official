import React, { Component } from "react";
import Taro, { eventCenter, getCurrentInstance }from '@tarojs/taro';
import { Text, View} from '@tarojs/components';
import SingelSelected from '../single-selected/index';
import LineChoose from "../line-choose/index";
import MultipleForm from '../multiple-form/index';
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
  dropParams: {}
  loading: boolean
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
  config: configType[]
};

class QueryDrop extends Component<IProps, IState>{
  $instance = getCurrentInstance();
  constructor(props) {
    super(props);
    this.state = {
      animation: '',
      config: [],
      isMask: false,
      maskHeight: 0,
      currentType: '',
      conditions: [],
      params: {},
      currentTab: {},
    };
  }

  componentWillMount(): void {
    const { initConfig } = this.props;
    if(Array.isArray(initConfig) && initConfig.length){
      this.setState({
        config: initConfig
      });
    }
    const onReadyEventId = this.$instance.router.onReady;
    eventCenter.once(onReadyEventId, this.onRady);
  }

  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>): boolean {
    const { isMask } = this.state;
    const { type, initConfig } = this.props;
    return type !== nextProps.type || isMask !== nextState.isMask || JSON.stringify(initConfig) !== JSON.stringify(nextProps.initConfig);
  }

  componentWillReceiveProps(nextProps: Readonly<IProps> ): void {
    const { initConfig, type } = this.props;
    if(type !== nextProps.type){
      this.setState({
        isMask: false,
        config: nextProps.initConfig
      });
    }
    if(JSON.stringify(initConfig) !== JSON.stringify(nextProps.initConfig)){
      this.setState({
        config: nextProps.initConfig
      });
    }
  }

  componentWillUnmount(): void {
    const onReadyEventId = this.$instance.router.onReady;
    eventCenter.off(onReadyEventId, this.onRady);
  }

  onRady = () => {
    let height = 0;
    Taro.getSystemInfo({
      success: (info) => {
        height = info.windowHeight;
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

  // 点击切换筛选条件Tab
  handleClick = (info) => {
    const { config } = this.state;
    let newConfig: configType[] = [];
     config.forEach(item => {
      if(item.id === info.id){
        newConfig.push({...item, isSelected: true })
      }
      else {
        newConfig.push({...item})
      }
    });
    this.setState({
      currentTab: info,
      isMask: true,
      config: newConfig
    });
  };

  // 处理单线的参数
  handleDealParams = (info, conditions) => {
    const { config, currentTab, params} = this.state;
    let newConfig: configType[] = [];
    config.forEach(item => {
      if(item.id === currentTab.id){
        newConfig.push({...item, conditions: [...conditions], title: info.name ? info.name : item.title})
      }
      else {
        newConfig.push({...item})
      }
    });
    let newParams = { ...params, [currentTab.field] : info.value };
    this.handleRequestParmas(newParams);
    this.setState({
      params: newParams,
      isMask: false,
      config: [...newConfig]
    });
  };

  // 处理多线性选择的参数
  handleDealLineChoose = (info, conditions) => {
    const { config, currentTab, params } = this.state;
    let newConfig: configType[] = [];
    config.forEach(item => {
      if(item.id === currentTab.id){
        newConfig.push({...item, conditions: [...conditions], title: info.name ? info.name : item.title})
      }
      else {
        newConfig.push({...item})
      }
    });
    let newParams = {...params, [currentTab.field] : info.value.join()};
    this.handleRequestParmas(newParams);
    this.setState({
      params: newParams,
      isMask: false,
      config: [...newConfig]
    });
  };

  // 处理多样化表单的参数
  handleSubmitForm = (conditions, formParams) => {
    const { config, currentTab, params } = this.state;
    let newConfig: configType[] = [];
    config.forEach(item => {
      if(item.id === currentTab.id){
        newConfig.push({...item, isSelected: true, conditions: [...conditions],})
      }
      else {
        newConfig.push({...item})
      }
    });
    let newParams = {...params, ...formParams};
    this.handleRequestParmas(newParams);
    this.setState({
      params: newParams,
      isMask: false,
      config: [...newConfig]
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
    const { onsetParams, loading} = this.props;
    if(!loading){
      onsetParams(params);
    }
  };

  render(){
    const { config, currentTab, isMask, maskHeight } = this.state;
    return (
      <View className='drop' >
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

