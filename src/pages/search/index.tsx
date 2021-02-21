import React, { Component } from 'react'
import { View, Button,Input } from '@tarojs/components'
import Taro from '@tarojs/taro';
import './index.scss'


interface isState {
  code: string,
}

export default class Search extends Component<any,isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      code: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onBtnClick = () =>{
    Taro.login().then(res=>{
      const jsCode = res.code;
      this.setState({code:jsCode})
    })
  }

  render () {
    const {code} = this.state;
    return (
      <View >
       <Button onClick={this.onBtnClick}>获取jsCode</Button>
        <Input value={code}/>
      </View>
    )
  }
}
