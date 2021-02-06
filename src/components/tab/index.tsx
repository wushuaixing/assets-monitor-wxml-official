import React, { Component } from "react";
import { View} from '@tarojs/components';

import './index.scss';

interface configType{
  id: number,
  title: string,
}

type IProps = {
  onClick: (item: configType) => void
  config: configType[]
}

type IState = {
  selected: number
};

class Tab extends Component<IProps, IState>{

  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
    };
  }

  onClickTab = (item) => {
    const { onClick } = this.props;
    this.setState({
      selected: item.id
    }, () => {
      onClick(item);
    })
  };


  render(){
    const { selected } = this.state;
    const { config } = this.props;
    return (
      <View className='tab' >
        <View className={`tab-bg-${selected === 1 ? 'leftActive' : 'rightActive'}`}/>
        {
          config.map((item, index) => {
            const active = selected === item.id;
            return (
              <View
                onClick={() => this.onClickTab(item)}
                className={`tab-item-${active ? `active` : `normal`} tab-item-${index === 0 ? 'left' : 'right'}`}
              >
                {item.title}
              </View>
            )
          })
        }
      </View>

    );
  }
}
export default Tab;
