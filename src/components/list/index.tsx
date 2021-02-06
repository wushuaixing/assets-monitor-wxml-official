import React, { Component } from 'react'
import Taro from '@tarojs/taro';
import {Text, View} from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'
import { connect } from 'react-redux';
import ListItem from '../list-item/index';

function buildData () {
  return Array(10).fill(0).map((_, i) => { return {id: i, title: `这是第${i}个title`, time: '2021-11-11'}});
}

interface dataItem{
  id: number,
  title: string
  time: string
}

interface IProps{
  count?: number,
  dispatch?: ({type: string, payload: object}) => {}
  children?: React.ElementType
}

interface IState{
  data: dataItem[],
  readState: number
}

@connect(({ home }) => ({ ...home }))
class List extends Component <IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      data: buildData(),
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
    Taro.showLoading()
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


  render () {
    const { data } = this.state;
    const dataLen: number = data.length;
    const height: number = 1211;
    const itemSize: number = 30;
    console.log('VirtualList props === ', this.props);
    return (
      <View>
        <VirtualList
          useIsScrolling={true}
          className='List'
          unlimitedSize={true}
          position={'relative'}
          height={height}
          width={'100%'}
          itemData={data}
          itemCount={dataLen}
          itemSize={itemSize}
        >
          {
            ListItem
          }
        </VirtualList>
      </View>
    )
  }
}
export default List;

