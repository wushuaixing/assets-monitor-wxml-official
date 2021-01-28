import React, { Component } from 'react'
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { View, Image} from '@tarojs/components'
import './index.scss';

interface IProps{
  tabField?: string,
  currentPage?: string,
  dispatch: ({type: string, payload: object}) => {}
}

interface IState{
  tabList: Array<{field: string, pagePath: string, text: string, selectedIconPath: string, iconPath: string }>,
  selected?: string,
  selectedColor: string,
  color: string
}

@connect(({ common }) => ({ ...common }))
class CustomTabBar extends Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      tabList: [
        {
          field            : 'index',
          iconPath         : "../assets/img/tab-bar/home.png",
          selectedIconPath : "../assets/img/tab-bar/home-active.png",
          pagePath         : "/pages/index/index",
          text             : "首页",
        },
        {
          field            : 'monitor',
          iconPath         : "../assets/img/tab-bar/monitor.png",
          selectedIconPath : "../assets/img/tab-bar/monitor-active.png",
          pagePath         : "/pages/monitor/index",
          text             : "监控",
        },
        {
          field            : 'search',
          iconPath         : "../assets/img/tab-bar/search.png",
          selectedIconPath : "../assets/img/tab-bar/search-active.png",
          pagePath         : "/pages/search/index",
          text             : "搜索",
        },
        {
          field            : 'user',
          iconPath         : "../assets/img/tab-bar/user.png",
          selectedIconPath : "../assets/img/tab-bar/user-active.png",
          pagePath         : "/pages/user/index",
          text             : "我的",
        }
      ],
      selected: 'index',
      selectedColor: '#1C80E1',
      color: '#7D8699',
    }
  }

  componentWillMount () { }

  componentDidMount () {
  }


  componentWillReceiveProps(nextProps: Readonly<IProps>): void {
    const { selected } = this.state;
    if(nextProps.tabField !== selected){
      this.setState({
        selected: nextProps.tabField
      })
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  switchTab = (item) => {
    const { selected } = this.state;
    const { dispatch } = this.props;
    if(selected !== item.field){
      dispatch({type: 'common/updateState', payload: { tabField: item.field}});
      this.setState({
        selected: item.field
      });
      Taro.switchTab({
        url : item.pagePath,
        success: () => {
          dispatch({type: 'common/updateState', payload: { currentPage: item.pagePath}});
        }
      });
    }

  };

  render(): any {
    const { selected, tabList, selectedColor, color } = this.state;
    return (
      <View className='yc-tabBar'>
        <View className='yc-tabBar-border' />
        <View className='yc-tabBar-wrap'>
          {
            tabList.map((item) => {
              const active = selected === item.field;
              const { field } = item;
              return (
                <View
                  className='yc-tabBar-wrap-item'
                  onClick={() => this.switchTab(item)}
                  data-path={item.pagePath}
                  key={field}
                >
                  <Image className='yc-tabBar-wrap-item-icon' src={active ? item.selectedIconPath : item.iconPath} />
                  <View
                    className='yc-tabBar-wrap-item-btn'
                    style={{ color : selected === item.field ? selectedColor : color }}
                  >
                    {item.text}
                  </View>
                </View>
              );
            })
          }
        </View>
      </View>
    )
  }
}

export default CustomTabBar
