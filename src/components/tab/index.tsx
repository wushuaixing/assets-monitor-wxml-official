import React, { Component } from "react";
import { eventCenter, getCurrentInstance }from '@tarojs/taro';
import { View} from '@tarojs/components';
import './index.scss';

interface configType{
  id: number,
  title: string,
}

type IProps = {
  initId?: number
  onClick: (item: configType) => void
  config: configType[]
  type?: string
}

type IState = {
  selected: number
};

class Tab extends Component<IProps, IState>{
  $instance = getCurrentInstance();
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
    };
  }



  componentWillMount(): void {
    const onShowEventId = this.$instance.router.onShow;
    eventCenter.on(onShowEventId, this.onShow);
  }

  componentWillUnmount(): void {
    const onShowEventId = this.$instance.router.onShow;
    // 卸载
    eventCenter.off(onShowEventId, this.onShow);
  }

  onShow = () => {
    const { initId } = this.props;
    if(initId > 0){
      this.setState({
        selected: initId,
      })
    }
  };

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
    const { config, type } = this.props;
    const typeName = type || 'tab';
    // console.log('selected state === ', this.state);
    return (
      <View className={`${typeName}`} >
        <View className={`${typeName}-bg-${selected === 1 ? 'leftActive' : 'rightActive'}`}/>
        {
          config.map((item, index) => {
            const active = selected === item.id;
            return (
              <View
                onClick={() => this.onClickTab(item)}
                className={`${typeName}-item-${active ? `active` : `normal`} ${typeName}-item-${index === 0 ? 'left' : 'right'}`}
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
