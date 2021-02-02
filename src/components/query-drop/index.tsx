import React, {FC, useState} from "react";
import Taro from '@tarojs/taro';
import {ITouchEvent, ScrollView, Text, View} from '@tarojs/components';
import {AtButton, AtIcon} from "taro-ui";
import FormItem from '../form-item/index';
import './index.scss';

type IProps = {
}

interface configItem {
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

const QueryDrop: FC<IProps> = (props) => {
  // const { config } = props;
  const initConfig: configItem[] = [
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
  ];
  const btnConfig = [
    {
      text: '确认',
      confirmFun: () => {},
    },
    {
      text: '取消',
      cancelFun: () => {},
    }
  ];
  const [config, setConfig] = useState(initConfig);
  const [activeId, setActive] = useState(-1);
  const [conditions, setConditions] = useState(initConfig[0].conditions);
  const [params, setParams] = useState({});
  let animation = Taro.createAnimation({
    duration: 300,
    timingFunction: 'ease',
    delay: 0
  });
  const [animationData, setAnimationData] = useState(animation);

  const getConfigConditions = (id: number) => {
    let con = [];
    if(id >= 0){
      const configItem = config.filter(i => i.id === id);
      if(Array.isArray(configItem) && configItem.length > 0){
        con = configItem[0].conditions;
      }
    }
    return con;
  };

  // 点击切换筛选条件
  const handleClick = (info) => {
    let newConfig = [];
    setActive(info.id);
    const newConditions = getConfigConditions(info.id);
    if(newConditions.length > 0){
      setConditions([...newConditions]);
    }
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
      setConfig(newConfig);
      console.log('handleClick newConfig === ', newConfig);
    }
  };

  const handleClosePanel = () => {
    let newConfig = [];
    config.forEach((item) => {
      setActive(-1);
      newConfig.push({...item, isOpen: false});
    });
    setConfig(newConfig);
  };

  const handleChangeValue = (item, e) => {
    let currentParams = {
      field: item.field,
      value: e,
    };
    setParams({...currentParams});
  };

  const handleCancel = () => {
    let newConfig = [];
    let newCon = [];
    if(params.value){
      conditions.forEach(it => {
        if(it.field === params.field){
          newCon.push({...it, value: params.value})
        }
        else {
          newCon.push({...it});
        }
      });
      setConditions([...newCon]);
      config.forEach(item => {
        if(activeId === item.id){
          newConfig.push({...item, conditions: [...conditions]});
        }
        else {
          newConfig.push({...item});
        }
      });
      console.log('config === ', config);
      console.log('newConfig === ', newConfig);
    }


    if(activeId > 0){

    }
  };


  return (
    <View className='drop'>
      <View>
        <ScrollView>
          <View className='drop-box'>
            {
              config.map((item) => {
                const color = item.isOpen ? "#1C80E1" : "#7D8699";
                return (
                  <View onClick={() => handleClick(item)} className='drop-box-item'>
                    <Text style={{ color : color }}>{item.title}</Text>
                    <AtIcon value={item.isOpen ? "chevron-up" : 'chevron-down'} size='7' color={color} prefixClass='icon' className='drop-box-item-icon' />
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
      <View className='drop-query-line' />
      {
        activeId >= 0 && <View className='drop-query' animation={animationData}>
					<View className='drop-query-modal'>
            {
              conditions.length > 0 && conditions.map(it => {
                return (
                  <FormItem {...it} requird={it.requird} onChange={handleChangeValue}>{it.type}</FormItem>
                )
              })
            }
					</View>
					<View>
						<AtButton type='primary' size='normal' onClick={confirm}>确认</AtButton>
						<AtButton type='primary' size='normal' onClick={handleCancel}>取消</AtButton>
					</View>
					<View className='drop-query-mask' onClick={handleClosePanel}/>
				</View>
      }
    </View>
  )
};

export default QueryDrop;

