import React, { Component } from 'react';
import {View, Button, Text} from '@tarojs/components';
import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import NavigationBar from '../../components/navigation-bar';
import './index.scss'

type IProps = {
  count: number,
  dispatch: ({type: string, payload: object}) => {},
};

type IState = {
  animation: any,
};

@connect(({ home }) => ({ ...home }))
class Index extends Component <IProps, IState>{

  constructor(props) {
    super(props);
    this.state = {
      animation: '',
    };
  }

  componentWillMount () {
  }

  componentDidMount () {
    const { dispatch } = this.props;
    dispatch({type: 'home/getJsSession', payload: {
      jsCode: '001exAFa12PDoA03K2Ga1hUlK72exAFX',
      }})
  }

  componentWillUnmount () { }

  componentDidShow () {
  }

  componentDidHide () { }

  handleNavigateDemo = () => {
    // this.down();
    Taro.navigateTo({
      url: '/pages/demo/index',
    });
  };

  down = () => {
    var animation = Taro.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });
    animation.translateY(200).step();
    this.setState({
      animation: animation.export(),
    });
  };

  comeBack = () => {
    var animation = Taro.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });
    animation.translateY(0).step();
    this.setState({
      animation: animation.export(),
    });
  };


  render () {
    const { animation } = this.state;
    return (
      <View>
        <NavigationBar title='源诚资产监控'/>
        <View>Hello world! this is view</View>
        <Text>Hello world! this is text</Text>
        <View animation={animation}>从home模块里面取出的数据是{this.props.count}</View>
        <View style={{margin : 20}}>
          <Button onClick={this.handleNavigateDemo} className='btn-max-w' plain type='primary'>跳转demo</Button>
        </View>
      </View>
    )
  }
}
export default Index;

