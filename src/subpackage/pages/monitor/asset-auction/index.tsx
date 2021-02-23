import React, { Component } from 'react'
import {View, Text, Image} from '@tarojs/components'
import './index.scss'


type IProps = {
}

type IState = {
  current: number
  isScroll?: boolean
};


export default class AssetsAuction extends Component <IProps, IState>{

  render () {
    return (
      <View >
        this is subpackage AssetsAuction
      </View>
    )
  }
}
