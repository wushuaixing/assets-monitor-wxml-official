import React, { Component } from 'react'
// @ts-ignore
import { View } from '@tarojs/components'
import { connect } from 'react-redux';
import './index.scss'

type IProps = {
  count: number,
  dispatch: ({type: string, payload: object}) => {},
};

@connect(({ home }) => ({ ...home }))
class Index extends Component <IProps>{
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


  render () {
    return (
      <View>
        <View>Hello world!</View>
        <View>从home模块里面取出的数据是{this.props.count}</View>
      </View>
    )
  }
}
export default Index;

