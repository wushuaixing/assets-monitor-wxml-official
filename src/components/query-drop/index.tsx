import React, { Component } from "react";
import Taro, { eventCenter, getCurrentInstance }from '@tarojs/taro';
import { ScrollView, Text, View} from '@tarojs/components';
import {AtButton, AtIcon} from "taro-ui";
import FormItem from '../form-item/index';
import Conditions from '../conditions/index';
import './index.scss';

interface configType{
  id: number,
  title: string,
  isOpen?: boolean,
  isSelectd?: boolean,
  conditions: {
    label?: string,
    type?: string,
    field?: any,
    requird?: boolean,
    placeholder?: string,
    value?: string
    options?: any
  }[]
}

type IProps = {
}

type IState = {
  config: configType[]
  animation: any
  activeId?: number
  searchConfig?: [[]]
  isMask: boolean
  maskHeight: number
};

class QueryDrop extends Component<IProps, IState>{
  $instance = getCurrentInstance();

  constructor(props) {
    super(props);
    this.state = {
      config: [
        {
          id: 1,
          title: '立案日期',
          isOpen: false,
          isSelectd: false,
          conditions: [
            {
              type: 'line-choose',
              field: [
                {
                  id: 1,
                  name: '全部',
                  childrenName: [
                    {name: '全部', value: '1'},
                    {name: '司法拍卖', value: '2'},
                    {name: '代位权-立案信息', value: '2'},
                    {name: '代位权-开庭公告', value: '1'},
                    {name: '代位权-开庭公告', value: '1'},
                  ]
                },
                {
                  id: 2,
                  name: '全部',
                  childrenName: [
                    {name: '全部', value: '1'},
                    {name: '司法拍卖', value: '2'},
                    {name: '代位权-立案信息', value: '2'},
                    {name: '代位权-开庭公告', value: '1'},
                    {name: '代位权-开庭公告', value: '1'},
                  ]
                }
              ],
              requird: true,
              value: '',
            },
          ]
        },
        {
          id: 2,
          title: '更新日期',
          isOpen: false,
          isSelectd: false,
          conditions: [
            {
              type: 'line-choose',
              field: [
                {
                  id: 1,
                  name: '全部',
                  childrenName: [
                    {name: '全部', value: '1'},
                    {name: '司法拍卖', value: '2'},
                    {name: '代位权-立案信息', value: '2'},
                    {name: '代位权-开庭公告', value: '1'},
                    {name: '代位权-开庭公告', value: '1'},
                  ]
                },
                {
                  id: 2,
                  name: '全部',
                  childrenName: [
                    {name: '全部', value: '1'},
                    {name: '司法拍卖', value: '2'},
                    {name: '代位权-立案信息', value: '2'},
                    {name: '代位权-开庭公告', value: '1'},
                    {name: '代位权-开庭公告', value: '1'},
                  ]
                }
              ],
              requird: true,
              value: '',
            },
          ]

        },
        {
          id: 3,
          title: '更多筛选',
          isOpen: false,
          isSelectd: false,
          conditions: [
            {
              type: 'line-choose',
              field: [
                {
                  id: 1,
                  name: '全部',
                  childrenName: [
                    {name: '全部', value: '1'},
                    {name: '司法拍卖', value: '2'},
                    {name: '代位权-立案信息', value: '2'},
                    {name: '代位权-开庭公告', value: '1'},
                    {name: '代位权-开庭公告', value: '1'},
                  ]
                },
                {
                  id: 2,
                  name: '全部',
                  childrenName: [
                    {name: '全部', value: '1'},
                    {name: '司法拍卖', value: '2'},
                    {name: '代位权-立案信息', value: '2'},
                    {name: '代位权-开庭公告', value: '1'},
                    {name: '代位权-开庭公告', value: '1'},
                  ]
                }
              ],
              requird: true,
              value: '',
            },
          ]
        },
      ],
      animation: '',
      activeId: -1,
      isMask: false,
      maskHeight: 0,
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
      isMask: true
    })
  };

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


  render(){
    const { config, activeId, animation, isMask, maskHeight } = this.state;
    // console.log('maskHeight === ', maskHeight);
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
              <Conditions />
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

