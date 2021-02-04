import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Monitor extends Component {
  $instance = getCurrentInstance();

  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  render () {
    return (
      <View >
        <Text>Hello Monitor!</Text>
      </View>
    )
  }
}
