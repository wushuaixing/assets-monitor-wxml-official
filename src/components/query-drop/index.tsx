import React, { Component } from "react";
import Taro, { eventCenter, getCurrentInstance }from '@tarojs/taro';
import { ScrollView, Text, View} from '@tarojs/components';
import {AtButton, AtIcon} from "taro-ui";
import FormItem from '../form-item/index';
import Conditions from '../conditions/index';
import './index.scss';

interface conditionsType{
  label?: string,
  type: string,
  field?: any,
  requird?: boolean,
  placeholder?: string,
  value?: string
  options?: any
}

interface configType{
  id: number,
  title: string,
  isOpen?: boolean,
  isSelectd?: boolean,
  conditions: conditionsType
}

type IProps = {
  type: string
  config: configType[]
  onsetParams: (params?: any) => void
}

type IState = {
  config: configType[]
  animation: any
  activeId: number
  searchConfig?: [[]]
  isMask: boolean
  maskHeight: number
  conditions: conditionsType
};


class QueryDrop extends Component<IProps, IState>{
  $instance = getCurrentInstance();
  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
      animation: '',
      activeId: -1,
      isMask: false,
      maskHeight: 0,
      conditions: props.config[0].conditions,
    };
  }

  componentWillMount(): void {
    const onReadyEventId = this.$instance.router.onReady;
    const onShowEventId = this.$instance.router.onShow;

    eventCenter.once(onReadyEventId, () => {
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
            } )
        }
      });

    });
    // 监听
    eventCenter.on(onShowEventId, this.onShow)
  }

  componentWillUpdate(nextProps: Readonly<IProps>): void {
    const { config, type} = this.props;
    if(JSON.stringify(config) !== JSON.stringify(nextProps.config)){
      this.setState({
        config: nextProps.config
      })
    }
    // 每次资产/风险切换的时候，会重新选择条件
    if(type !== nextProps.type){
      this.setState({
        isMask: false,
        activeId: -1
      })
    }
  }

  onShow = () => {
    // console.log('onShow')
  };

  // packUp = () => {
  //   let animation = Taro.createAnimation({
  //     transformOrigin: "50% 50%",
  //     duration: 1000,
  //     timingFunction: "ease",
  //     delay: 0
  //   });
  //   animation.translateY(200).step();
  //   this.setState({
  //     animation: animation.export()
  //   })
  // };

  // 点击切换筛选条件
  handleClick = (info) => {
    // console.log('info === ', info);
    const { config } = this.state;
    let newConfig: configType[] = [];
    if(config.length > 0){
      config.forEach((item) => {
        if(info.id === item.id){
          newConfig.push({
            ...info,
            isOpen: !info.isOpen,
            isSelectd: !info.isSelectd
          });
        }
        else {
          newConfig.push({...item, isOpen: false, isSelectd: false });
        }
      });
    }
    this.setState({
      activeId: info.id,
      config: newConfig,
      isMask: true,
      conditions: info.conditions
    })
  };

  // 点击关闭筛选条件
  handleClosePanel = () => {
    const { config } = this.state;
    let newConfig: configType[] = [];
    if(config.length > 0){
      config.forEach((item) => {
        newConfig.push({...item, isOpen: false, isSelectd: false });
      });
    }
    this.setState({
      activeId: -1,
      config: newConfig,
      isMask: false
    })
  };

  // 收集子组件传来的参数
  handleParmas = (params) => {
    console.log('handleParmas params 111111=== ', params);
    const { onsetParams } = this.props;
    onsetParams(params);
  };


  render(){
    const { config, activeId, animation, isMask, maskHeight, conditions} = this.state;
    // const conditions = activeId >= 0 && config.filter(i => i.isSelectd)[0].conditions;
    return (
      <View className='drop'>
        <View className='drop-box' id='drop-box'>
          {
            config.map((item, index) => {
              const selected = item.isSelectd;
              return (
                <View onClick={() => this.handleClick(item)} className='drop-box-tab'>
                  <View className='drop-box-tab-text'>
                    <Text
                      className={`drop-box-tab-text-${selected ? `active` : `normal`}`}
                    >
                      {item.title}
                    </Text>
                    {
                      index === 0 || index === 1 ? <Text className={`iconfont icon-${selected ? `up` : `down`}-arrow drop-box-tab-icon-${selected ? `active` : `normal`}`} /> : <Text className={`iconfont icon-more drop-box-tab-icon-${selected ? `active` : `normal`}`} />
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
          isMask && activeId >= 0 && <View className='drop-content'>
            {
              <Conditions
                conditions={conditions}
                onCancel={this.handleClosePanel}
                onsetParams={this.handleParmas}
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

