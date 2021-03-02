import React, { Component } from 'react'
import { View } from '@tarojs/components'
import VirtualList from '@tarojs/components/virtual-list'
import ListItem from '../list-item/index';
import './index.scss';

interface IProps{
  data: any
  onChangeScroll?: any
}

interface IState{
}

class List extends Component <IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false
    };
  }


  shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    console.log('List nextProps === ', nextProps, this.props);
    const { data } = this.props;
    return JSON.stringify(data) !== JSON.stringify(nextProps.data);
  }

  listReachBottom = () => {
    // Taro.showLoading();
    // // 如果 loading 与视图相关，那它就应该放在 `this.state` 里
    // // 我们这里使用的是一个同步的 API 调用 loading，所以不需要
    // this.loading = true;
    // setTimeout(() => {
    //   const { data } = this.state;
    //   const arr = data.concat(buildData(data.length));
    //   console.log('arr ==== ', arr);
    //   this.setState({
    //     data: arr,
    //   }, () => {
    //     this.loading = false;
    //     Taro.hideLoading()
    //   })
    // }, 1000)
  };

  backToTop = () => {

  };


  render () {
    const { data } = this.props;
    console.log('VirtualList data === ', data);

    const height: number = 800;
    const itemSize: number = 285;
    return (
      <View className='list-box'>
        <VirtualList
          /** 解开高度列表单项大小限制，默认值使用: itemSize (请注意，初始高度与实际高度差异过大会导致隐患)。 */
          useIsScrolling={true}
          className='List'
          unlimitedSize={true}
          position={'relative'}
          height={height}
          width={'100%'}
          itemData={data}
          itemCount={data.length}
          itemSize={itemSize}
          // onScroll={({scrollDirection, scrollOffset }) => {
          //   // console.log('scrollDirection === ', scrollDirection);
          //   // console.log('scrollOffset === ', scrollOffset);
          //   // if(!this.loading && scrollDirection === 'forward' && scrollOffset > ((count - 9) * itemSize + 100)){
          //   //   this.listReachBottom()
          //   // }
          // }}
        >
          {
            ListItem
          }
        </VirtualList>
        <View className='list-box-top' onClick={this.backToTop}>
          up
          {/*<Image className='monitor-top-arrow' />*/}
        </View>
      </View>
    )
  }
}
export default List;

