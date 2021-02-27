import React, { Component } from "react";
import { Text, View} from '@tarojs/components';
import './index.scss';

interface conditionsType{
  name: string,
  id: number,
  value?: any
  isSelected: boolean
}


type IProps = {
  conditions: conditionsType[]
  onChange: (value: boolean, conditions: conditionsType[]) => void
}

type IState = {
  conditions: conditionsType[]
};

export default class SingleSelected extends Component <IProps, IState>{
  constructor(props) {
    super(props);
    this.state = {
      conditions: []
    };
  }

  componentWillMount(): void {
    const { conditions } = this.props;
    this.setState({
      conditions,
    });
  }

  // 选择单项之后关闭窗口
  onSelected = (info) => {
    const { conditions } = this.state;
    const { onChange } = this.props;
    let newConditions: conditionsType[] = [];
    conditions.forEach(item => {
      if(info.id === item.id){
        newConditions.push({...item, isSelected: true})
      }
      else {
        newConditions.push({...item, isSelected: false})
      }
    });
    newConditions.sort((a, b) => a.id - b.id);
    this.setState({
      conditions: [...newConditions]
    }, () => {
      onChange(info, newConditions);
      // setTimeout(() => {
      //   onChange(info, newConditions);
      // }, 50)
    });
  };

  render(){
    const { conditions } = this.state;
    return (
      <View className='conditions'>
        <View className='conditions-line'/>
        <View className='conditions-selected'>
          {
            conditions.length > 0 && conditions.map(item => {
              const { isSelected } = item;
              return (
                <View className='conditions-selected-item' onClick={() => this.onSelected(item)}>
                  <Text className={`conditions-selected-item-name-${isSelected ? `active` : `normal`}`}>{item.name}</Text>
                  {
                    isSelected && <Text className='iconfont icon-selected conditions-selected-item-icon' />
                  }
                </View>
              )
            })
          }
        </View>
      </View>
    );
  }
}
