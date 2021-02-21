import React, { Component } from "react";
import Taro, { eventCenter, getCurrentInstance }from '@tarojs/taro';
import { ScrollView, Text, View} from '@tarojs/components';
import { AtButton } from 'taro-ui'
import './index.scss';

type IProps = {
}

type IState = {
  conditions: []
  leftArray: []
  rightArray: []
};

function getConfig() {
  return [
    {
      type: 'line-choose',
      field: [
        {
          id: 1,
          name: '全部',
          isSelectd: true,
          childrenName: [
            {name: '全部', id: 1, value: '1', isSelectd: false},
            {name: '司法拍卖', id: 2, value: '2', isSelectd: false},
            {name: '代位权-立案信息',  id: 3, value: '2', isSelectd: false},
            {name: '代位权-开庭公告',  id: 4, value: '1', isSelectd: false},
            {name: '代位权-开庭公告',  id: 5, value: '1', isSelectd: false},
          ]
        },
        {
          id: 2,
          name: '涉诉资产',
          isSelectd: false,
          childrenName: [
            {name: '全部2',  id: 1,  value: '1', isSelectd: false},
            {name: '司法拍卖2',  id: 2, value: '2',  isSelectd: false},
            {name: '代位权-立案信息2',  id: 3, value: '2',  isSelectd: false},
            {name: '代位权-开庭公告2',  id: 4, value: '1',  isSelectd: false},
            {name: '代位权-开庭公告2', id: 5,  value: '1',  isSelectd: false},
          ]
        }
      ],
      requird: true,
      value: '',
    },
  ];
}

function getLeftArray() {
  let conditions = getConfig();
  let leftArray = conditions[0].field.map(it => { return {id: it.id, name: it.name, isSelectd: it.isSelectd}});
  console.log('leftArray === ', leftArray);
  return leftArray;
}

function getRightArray(id) {
  let conditions = getConfig();
  let rightArray = conditions[0].field.filter(it => it.id === id)[0].childrenName;
  console.log('rightArray === ', rightArray);
  return rightArray;
}

class Conditions extends Component<IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      conditions: getConfig(),
      leftArray: getLeftArray(),
      rightArray: getRightArray(1),
    };
  }

  chooseType = (it: any, type: string) => {
    const { leftArray } = this.state;
    let newLeftArray = [];
    leftArray.forEach((i => {
      if(i.id === it.id){
        newLeftArray.push({...i, isSelectd: true})
      }
      else {
        newLeftArray.push({...i, isSelectd: false})
      }
    }));
    this.setState({
      leftArray: newLeftArray,
      rightArray: getRightArray(it.id),
    })
  };

  chooseChildrenType = (it, type) => {
    const { rightArray } = this.state;
    let newRightArray = [];
    rightArray.forEach((i => {
      if(i.id === it.id){
        newRightArray.push({...i, isSelectd: true})
      }
      else {
        newRightArray.push({...i, isSelectd: false})
      }
    }));
    this.setState({
      rightArray: newRightArray
    })
  };

  render(){
    const { conditions, leftArray, rightArray} = this.state;
    console.log('conditions === ', conditions, rightArray);
    return (
      <View className='conditions'>
        <View className='conditions-line'/>
        {
          conditions.map((item) => {
            const { type, field} = item;
            console.log('field === ', field);
            if(type === 'line-choose'){
              return (
                <View className='conditions-line-choose'>
                  <View className='conditions-line-choose-left'>
                    {
                      leftArray.map(it => {
                        const { isSelectd } = it;
                        return (
                          <View className={`conditions-line-choose-left-${isSelectd ? `active` : `normal`}`} onClick={() => this.chooseType(it, 'line-choose')}>{it.name}</View>
                        )
                      })
                    }
                  </View>
                  <View className='conditions-line-choose-right'>
                    {
                      rightArray.map((i) => {
                        const { isSelectd } = i;
                        return (
                          <View className={`conditions-line-choose-right-${isSelectd ? `active` : `normal`}`} onClick={() => this.chooseChildrenType(i, 'line-choose')}>
                            {i.name}
                            {
                              isSelectd && <Text className={`iconfont icon-selected conditions-line-choose-right-icon`} />
                            }
                          </View>
                        )
                      })
                    }
                  </View>
                </View>
              )
            }
          })
        }
        <View className='conditions-btn'>
          <AtButton className='conditions-btn-reset' type='secondary'>重置</AtButton>
          <AtButton className='conditions-btn-confirm' type='primary'>确定</AtButton>
        </View>
      </View>
    );
  }
}

export default Conditions;

