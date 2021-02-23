import React, { Component } from "react";
import Taro, { eventCenter, getCurrentInstance }from '@tarojs/taro';
import { ScrollView, Text, View} from '@tarojs/components';
import Conditions from '../conditions/index';
import { connect } from 'react-redux';
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
  isSelected?: boolean,
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

@connect(({ common }) => ({ ...common }))
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
    const { config, type, queryAssetsConfig} = this.props;
    console.log('props queryAssetsConfig === ', queryAssetsConfig);
    console.log('nextProps queryAssetsConfig === ', nextProps.queryAssetsConfig);
    if(JSON.stringify(config) !== JSON.stringify(nextProps.config)){
      this.setState({
        config: nextProps.config
      })
    }
    if(JSON.stringify(queryAssetsConfig) !== JSON.stringify(nextProps.queryAssetsConfig)){
      this.setState({
        queryAssetsConfig: nextProps.queryAssetsConfig
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
    let newInfo = {...info};
    newInfo.title = '新的';
    const { config } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type:'common/updateassetsConfig',
      payload: {
        item: newInfo
      }
    }).then((res) => {
      console.log('queryAssetsConfig res === ', res);
      console.log('queryAssetsConfig this.props === ', this.props);
    });
    console.log('props 111=== ', this.props);
    // let newConfig: configType[] = [];
    // if(config.length > 0){
    //   config.forEach((item) => {
    //     if(info.id === item.id){
    //       newConfig.push({
    //         ...info,
    //         isSelected: !info.isSelected
    //       });
    //     }
    //     else {
    //       newConfig.push({...item, });
    //     }
    //   });
    // }
    // this.setState({
    //   activeId: info.id,
    //   config: newConfig,
    //   isMask: true,
    //   conditions: info.conditions
    // })
  };

  // 点击关闭筛选条件
  handleClosePanel = () => {
    this.setState({
      activeId: -1,
      isMask: false
    })
  };

  // 收集子组件传来的参数
  handleParmas = (params) => {
    const { onsetParams } = this.props;
    onsetParams(params);
  };

  // 控制父组件的title展示
  handleEditConfig = (id, title, conditions) => {
    let newConfig: configType[] = [];
    const { config } = this.state;
    config.forEach((item) => {
      if(item.id === id){
        newConfig.push({...item, title: title || item.title, isSelected: true, conditions: conditions})
      }
      else {
        newConfig.push({...item })
      }
    });
    this.setState({
      config: [...newConfig]
    });
  };


  render(){
    const { config, activeId, animation, isMask, maskHeight, conditions} = this.state;
    console.log('props render=== ', this.props);
    // const conditions = activeId >= 0 && config.filter(i => i.isSelectd)[0].conditions;
    return (
      <View className='drop'>
        <View className='drop-box' id='drop-box'>
          {
            config.map((item, index) => {
              const selected = item.isSelected;
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
                currentId={activeId}
                conditions={conditions}
                onCancel={this.handleClosePanel}
                onsetParams={this.handleParmas}
                onEditConfig={this.handleEditConfig}
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

