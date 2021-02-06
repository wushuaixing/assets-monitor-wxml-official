import React, { Component } from "react";
import { View} from '@tarojs/components';
import './index.scss';

interface configType{
  id: number,
  title: string,
}

type IProps = {
  config: configType[]
  onClick: (item: configType) => void
}

type IState = {
  selected: number
};

class TagSelected extends Component<IProps, IState>{

  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
    };
  }

  onClickTag = (item) => {
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
