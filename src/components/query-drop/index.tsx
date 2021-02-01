import React, {FC, useState} from "react";
import {ITouchEvent, ScrollView, Text, View} from '@tarojs/components';
import './index.scss';
import {AtButton, AtIcon} from "taro-ui";

type IProps = {
}

interface configItem {
  id?: number,
  title?: string,
  isOpen?: boolean,
  conditions?: {
    label?: string,
    type?: string,
    field?: [] | string,
    requird?: boolean,
    placeholder?: string,
  }
}

const QueryDrop: FC<IProps> = (props) => {
  // const { config } = props;
  const initConfig: configItem = [
    {
      id: 1,
      title: '立案日期',
      isOpen: false,
      conditions: [
        {
          type: 'time',
          field: ["startGmtRegister", "endGmtRegister"]
        },
        {
          label: '当事人',
          placeholder: '请输入当事人名称',
          requird: false,
          type: 'input',
          field: 'partiesName',
        }
      ]
    },
    {
      id: 2,
      title: '更新日期',
      isOpen: false,
      conditions: [
        {
          type: 'time',
          field: ["startGmtRegister", "endGmtRegister"]
        },
        {
          label: '当事人',
          placeholder: '请输入当事人名称',
          requird: false,
          type: 'input',
          field: 'partiesName',
        },
        {
          label: '案号',
          placeholder: '请输入案号',
          requird: false,
          type: 'input',
          field: 'caseNumber',
        }
      ]
    },
    {
      id: 3,
      title: '更多筛选',
      isOpen: false,
      conditions: [
        {
          type: 'time',
          field: ["startGmtRegister", "endGmtRegister"]
        },
        {
          label: '当事人',
          placeholder: '请输入当事人名称',
          requird: false,
          type: 'input',
          field: 'partiesName',
        }
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

  const handleClick = (e: ITouchEvent, info) => {
    let newConfig = [];
    config.forEach((item) => {
      setActive(info.id);
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
  };

  const handleClosePanel = () => {
    let newConfig = [];
    config.forEach((item) => {
      setActive(-1);
      newConfig.push({...item, isOpen: false});
    });
    setConfig(newConfig);
  };

  const getConfigConditions = (id: number) => {
    let conditions = [];
    if(id >= 0){
      const configItem = config.filter(i => i.id === id);
      if(Array.isArray(configItem) && configItem.length > 0){
        conditions = configItem[0].conditions;
      }
    }
    return conditions;
  };

  const conditions = getConfigConditions(activeId);
  console.log('conditions === ', conditions);
  return (
    <View className='drop'>
      <View>
        <ScrollView>
          <View className='drop-box'>
            {
              config.map((item) => {
                const color = item.isOpen ? "#1C80E1" : "#7D8699";
                return (
                  <View onClick={(e) => handleClick(e, item)} className='drop-box-item'>
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
        activeId >= 0 && <View className='drop-query'>
					<View className='drop-query-modal'>
            {
              conditions.length > 0 && conditions.map(it => {
                return (
                  <View>{it.type}</View>
                )
              })
            }
					</View>
					<View>
            {
              btnConfig.map(item => {
                return (
                  <View>
                    <AtButton type='primary' size='normal'>{item.text}</AtButton>
                  </View>
                )
              })
            }
					</View>
					<View className='drop-query-mask' onClick={handleClosePanel}/>
				</View>
      }
    </View>
  )
};

export default QueryDrop;

