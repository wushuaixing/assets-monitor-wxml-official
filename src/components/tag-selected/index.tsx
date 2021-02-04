import React, { Component } from "react";
import { View} from '@tarojs/components';
import './index.scss';

interface configType{
  id: number,
  title: string,
}

type IProps = {
}

type IState = {
  config: configType[]
  selected: number
};

class TagSelected extends Component<IProps, IState>{

  constructor(props) {
    super(props);
    this.state = {
      config: [
        { title: '全部', id: 1},
        { title: '三星', id: 2},
        { title: '二星', id: 3},
        { title: '一星', id: 4}
      ],
      selected: 1,
    };
  }

  onClickTag = (item) => {
    console.log('item === ', item);
    this.setState({
      selected: item.id
    })

  };

  render(){
    const { config, selected } = this.state;
    return (
      <View className='tag'>
        {
          config.map((item) => {
            const active = selected === item.id;
            return (
              <View
                onClick={() => this.onClickTag(item)}
                className={`tag-item-${active ? `active` : `normal`}`}
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
export default TagSelected;
