import React, { Component } from 'react';
import { View, Button} from '@tarojs/components';
import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import NavigationBar from '../../components/navigation-bar';
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

  handleNavigate = () => {
    Taro.navigateTo({
      url:'/pages/demo/index',
    });
  };

  render () {
    return (
      <View>
        <NavigationBar title='源诚资产监控'/>
        <View>Hello world!</View>
        <View>从home模块里面取出的数据是{this.props.count}</View>
        <Button onClick={this.handleNavigate} className='btn-max-w' plain type='primary'>跳转demo</Button>
      </View>
    )
  }
}
export default Index;

