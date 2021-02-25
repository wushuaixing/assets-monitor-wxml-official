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

export interface configType{
  id: number,
  title: string,
  isSelected?: boolean,
  conditions: conditionsType
}

type IProps = {
  type: string
  initConfig: configType[]
  onsetParams: (params?: any) => void
  dispatch: (payload: any) => void
  onhandleQueryAssets: (payload?: any) => void
  onhandleQueryRisk: (payload?: any) => void
  dropParams: {}
}

type IState = {
  // config: configType[]
  animation: any
  activeId: number
  searchConfig?: [[]]
  isMask: boolean
  maskHeight: number
  // conditions: conditionsType
};

@connect(({ common }) => ({ ...common }))
class QueryDrop extends Component<IProps, IState>{
  $instance = getCurrentInstance();
  constructor(props) {
    super(props);
    this.state = {
      animation: '',
      activeId: -1,
      isMask: false,
      maskHeight: 0,
      // conditions: {},
    };
  }

  componentWillMount(): void {
    const { dispatch, initConfig} = this.props;
    dispatch({
      type:'common/initConfig',
      payload: initConfig
    });
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
    eventCenter.on(onShowEventId, this.onShow);

  }

  componentWillUpdate(nextProps: Readonly<IProps>): void {
    const { type } = this.props;
    if(type !== nextProps.type){
      const { dispatch, initConfig} = this.props;
      dispatch({
        type:'common/initConfig',
        payload: initConfig
      });
      this.setState({
        activeId: -1,
        isMask: false
      })
    }
  }

  onShow = () => {
    // console.log('onShow')
  };

  // 点击切换筛选条件
  handleClick = (info) => {
    const { dispatch } = this.props;
    dispatch({
      type:'common/updateConfig',
      payload: {
        id: info.id,
        info: info
      }
    });
    this.setState({
      activeId: info.id,
      isMask: true,
    });
  };

  // 点击关闭筛选条件
  handleClosePanel = () => {
    const { type, dropParams, onhandleQueryAssets, onhandleQueryRisk } = this.props;
    console.log('handleClosePanel props === ', this.props);
    const { activeId } = this.state;
    if(type === 'assets'){
      if(activeId === 1){
        onhandleQueryAssets({...dropParams})
      }
      else {
        onhandleQueryRisk({...dropParams})
      }
    }
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

  render(){
    const { activeId, animation, isMask, maskHeight } = this.state;
    const { config, showConfig, onhandleQueryAssets, onhandleQueryRisk } = this.props;
    // const config = queryAssetsConfig : queryRiskConfig
    console.log('props render=== ', this.props);
    // const conditions = activeId >= 0 && config.filter(i => i.isSelectd)[0].conditions;
    return (
      <View className='drop'>
        <View className='drop-box' id='drop-box'>
          {
            showConfig.length > 0 && showConfig.map((item, index) => {
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
                    index < showConfig.length - 1 && <View className='drop-box-tab-divider'/>
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
                onCancel={this.handleClosePanel}
                onsetParams={this.handleParmas}
                onhandleQueryAssets={onhandleQueryAssets}
                onhandleQueryRisk={onhandleQueryRisk}
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

