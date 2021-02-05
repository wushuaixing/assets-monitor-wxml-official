import React, { Component } from "react";
import Taro from '@tarojs/taro';
import { ScrollView, Text, View} from '@tarojs/components';
import {AtButton, AtIcon} from "taro-ui";
import FormItem from '../form-item/index';
import './index.scss';

interface configType{
  id: number,
  title: string,
  isOpen?: boolean,
  isSelectd?: boolean,
  conditions: {
    label?: string,
    type?: string,
    field?: Array<string> | string,
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
};

class QueryDrop extends Component<IProps, IState>{

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
              type: 'time',
              field: ["startGmtRegister", "endGmtRegister"],
              requird: true,
              value: '',
            },
            {
              label: '当事人',
              placeholder: '请输入当事人名称',
              requird: true,
              type: 'input',
              field: 'partiesName',
              value: '',
            },
            {
              label: '当事人',
              placeholder: '请输入当事人名称',
              requird: true,
              type: 'choose',
              field: 'partiesName',
              value: '',
              options: [
                {id: 1, label: '不限', value: '1'},
                {id: 2, label: '即将开始', value: '2'},
                {id: 3, label: '正在进行', value: '3'},
                {id: 4, label: '中止', value: '4'},
              ],
            }
          ]
        },
        {
          id: 2,
          title: '更新日期',
          isOpen: false,
          isSelectd: false,
          conditions: [
          ]
        },
        {
          id: 3,
          title: '更多筛选',
          isOpen: false,
          isSelectd: false,
          conditions: [
          ]
        },
      ],
      animation: '',
      activeId: -1,
    };
  }

  packUp = () => {
    let animation = Taro.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });
    animation.translateY(200).step();
    this.setState({
      animation: animation.export()
    })
  };

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
          });
        }
        else {
          newConfig.push({...item, isOpen: false});
        }
      });
    }
    this.setState({
      activeId: info.id,
      config: newConfig,
    })
  };


  render(){
    const { config, activeId, animation } = this.state;
    return (
      <View className='drop'>
        <View className='drop-box'>
          {
            config.map((item, index) => {
              const color = item.isOpen ? "#1C80E1" : "#7D8699";
              const selected = item.isSelectd;
              return (
                <View onClick={() => this.handleClick(item)} className='drop-box-tab'>
                  <View className='drop-box-tab-text'>
                    <Text
                      className={`drop-box-tab-text-${selected ? `active` : `normal`}`}
                    >
                      {item.title}
                    </Text>
                    <AtIcon
                      value={item.isOpen ? "chevron-up" : 'chevron-down'}
                      size='7'
                      color={color}
                      prefixClass='icon'
                      className='drop-box-tab-text-icon'
                    />
                  </View>
                  {
                    index < config.length - 1 && <View className='drop-box-tab-divider'/>
                  }
                </View>
              )
            })
          }
        </View>
        {/*{*/}
        {/*  activeId >= 0 && <View className='drop-query' animation={animation}>*/}
				{/*		<View className='drop-query-modal'>*/}
        {/*      {*/}
        {/*        conditions.length > 0 && conditions.map(it => {*/}
        {/*          return (*/}
        {/*            <FormItem {...it} requird={it.requird} onChange={handleChangeValue}>{it.type}</FormItem>*/}
        {/*          )*/}
        {/*        })*/}
        {/*      }*/}
				{/*		</View>*/}
				{/*		<View>*/}
				{/*			<AtButton type='primary' size='normal' onClick={confirm}>确认</AtButton>*/}
				{/*			<AtButton type='primary' size='normal' onClick={handleCancel}>取消</AtButton>*/}
				{/*		</View>*/}
				{/*		<View className='drop-query-mask' onClick={handleClosePanel}/>*/}
				{/*	</View>*/}
        {/*}*/}
      </View>
    );
  }
}

export default QueryDrop;

