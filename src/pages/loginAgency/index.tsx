import React,{Component} from 'react';
import Taro from '@tarojs/taro';
import { Image, View }from '@tarojs/components';
import loginTopImg from '../../assets/img/login/logo_black.png';
import loginLogoImg from  '../../assets/img/login/logo.png';
import loginFooterImg from '../../assets/img/login/logo_bottom_black.png';
import loginAccountImg from '../../assets/img/login/logo_account.png';
import AccountLogin from './account-login';
import PhoneLogin from './phone-login';
import './index.scss';


interface isState {
  loginType:number,
}

export default class Index extends Component<any,isState> {

  constructor(props) {
    super(props);
    this.state = {
      loginType : 1,
    };
  }

  componentWillMount() {
    Taro.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '',
    })
  }


  // 切换登录方式 1.手机号登录 2. 账号密码登录
  changeLoginType = (loginType) => {
    Taro.setNavigationBarColor({
      frontColor: loginType === 1 ? '#ffffff' : '#000000',
      backgroundColor: '',
    })
    this.setState({
      loginType
    });
  };

  render () {
    const { loginType } = this.state;
    return (
      <View className='yc-login' style={{background:loginType=== 1 ? 'linear-gradient(180deg, #0979E6 0%, #1654FF 100%)' : '#fff'}}>
        <View className='yc-login-header'>
            <View className="yc-login-header-logoTopView">
              <Image className='yc-login-header-logoTop' src={loginTopImg} />
            </View>
              <Image className='yc-login-header-logo' src={loginType===1 ? loginLogoImg : loginAccountImg} />
        </View>
        {
          loginType === 1 ?
            <View className='yc-login-content'>
              <PhoneLogin />
              <View className="yc-login-content-loginText" onClick={()=>{this.changeLoginType(2)}}>密码登录</View>
            </View>
            :
            <View className='yc-login-content'>
              <AccountLogin />
              <View className="yc-login-content-accountText" onClick={()=>{this.changeLoginType(1)}}>验证码登录</View>
            </View>
        }
        <View className='yc-login-footer'>
          <Image className='yc-login-footer-footerImg' src={loginFooterImg} style={{opacity:loginType=== 1 ? '1' : '0.15'}} />
        </View>
      </View>
    );
  }
}
