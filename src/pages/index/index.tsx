import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux';
import './index.scss'

type PageStateProps = {
  count:number
}

type IProps = PageStateProps;

@connect(({ home }) => ({ ...home }))
class Index extends Component <IProps>{
  componentWillMount () { }

  componentDidMount () { }

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

