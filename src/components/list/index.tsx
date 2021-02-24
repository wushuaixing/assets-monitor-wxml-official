import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import {Text, View} from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'
import { connect } from 'react-redux';
import ListItem from '../list-item/index';
import './index.scss';





interface IProps{
  count?: number
  listLength?: number
  dispatch?: ({type: string, payload: object}) => {}
  children?: React.ElementType
  params?: any
  onChangeScroll?: () => void
}

interface IState{
  readState: number
}

@connect(({ home }) => ({ ...home }))
class List extends Component <IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      readState: 0,
    };
    this.loading = false;
    this.params = {};
  }


  componentWillMount () { }

  componentDidMount () {
    // const { dispatch } = this.props;
    // dispatch({type: 'home/getJsSession', payload: {
    //   jsCode: '001exAFa12PDoA03K2Ga1hUlK72exAFX',
    //   }})
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  listReachBottom = () => {
    Taro.showLoading();
    // 如果 loading 与视图相关，那它就应该放在 `this.state` 里
    // 我们这里使用的是一个同步的 API 调用 loading，所以不需要
    this.loading = true;
    setTimeout(() => {
      const { data } = this.state;
      const arr = data.concat(buildData(data.length));
      console.log('arr ==== ', arr);
      this.setState({
        data: arr,
      }, () => {
        this.loading = false;
        Taro.hideLoading()
      })
    }, 1000)
  };

  backToTop = () => {

  };


  render () {
    const { data, listLength } = this.props;
    console.log('VirtualList data === ', data);
    const dataLen: number = listLength || 1400;
    const height: number = 1211;
    const itemSize: number = 285;
    return (
      <View className='list'>
        {
          data.length > 0 && <VirtualList
						useIsScrolling={true}
						className='List'
						unlimitedSize={true}
						position={'relative'}
						height={height}
						width={'100%'}
						itemData={data}
						itemCount={dataLen}
						itemSize={itemSize}
						onScroll={({scrollDirection, scrollOffset }) => {
              console.log('scrollDirection === ', scrollDirection);
              console.log('scrollOffset === ', scrollOffset);
              if(!this.loading && scrollDirection === 'forward' && scrollOffset > ((dataLen - 9) * itemSize + 100)){
                this.listReachBottom()
              }
            }}
					>
            {
              ListItem
            }
					</VirtualList>
        }
        <View className='list-top' onClick={this.backToTop}>
          up
          {/*<Image className='monitor-top-arrow' />*/}
        </View>
      </View>
    )
  }
}
export default List;

