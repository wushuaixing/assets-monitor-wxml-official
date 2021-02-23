import React, {Component} from 'react'
import {View, Input, Text, Image} from '@tarojs/components'
import Taro, {getCurrentInstance} from '@tarojs/taro';
import '../index.scss'
import loginTopImg from "../../../assets/img/login/logo_black.png";
import loginFooterImg from "../../../assets/img/login/logo_bottom_black.png";
import {connect} from 'react-redux';
import {getGlobalData, setGlobalData} from '../../../utils/const/global';

type isState = {
  captcha: string,
  focus: boolean,
  phone: string,
  second: number,
  againStatus: boolean
}
type IProps = {
  count: number,
  dispatch: ({type: string, payload: object}) => {
    then(param: (res) => void): any;
  },
};
const Message = title => Taro.showToast({title, icon: 'none'});
let timer;
@connect(({login}) => ({login}))
export default class AuthCode extends Component<IProps, isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      captcha: '',
      focus: true,
      phone: '',
      second: 59,
      againStatus: false,
    }
  }


  componentWillMount() {
    const {router: {params: {phone}}} = getCurrentInstance();
    this.setState({phone})
  }

  componentDidMount() {
    this.onTimer();
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onTimer = () => {
    if (timer) {
      clearInterval(timer)
    }
    timer = setInterval(() => {
      if (this.state.second > 0) {
        this.setState({second: this.state.second - 1});
      } else {
        // const { phoneNum:_phoneNum } = this.state;
        this.setState({
          second: 59,
          // codeStatus : _phoneNum ? 'normal' : 'disable'
          againStatus: true,
        });
        clearInterval(timer);
      }
    }, 1000);
  }

  onChangeCaptcha = (e) => {
    const {detail: {value}} = e;
    const inputValue = value.slice(0, 4);
    this.setState({
      captcha: inputValue
    }, () => {
      if (inputValue.length === 4) {
        const {captcha, phone} = this.state;
        const params = {
          mobile: phone,
          code: captcha,
          jsCode: getGlobalData('openId')
        }
        this.props.dispatch({
          type: 'login/getSmsLogin',
          payload: {...params}
        }).then(res => {
          if (res.data.code === 200) {
            const {data: {token, rules}} = res.data;
            Taro.setStorageSync('token', token);
            Taro.setStorageSync('loginNumber', phone);
            let auth_Rule = rules;
            setGlobalData('systemAuthRule', auth_Rule)
            let searchUser = auth_Rule.filter(item => {
              return item.groupName === 'menu_sy';
            });
            setGlobalData('systemRoleType', searchUser.length === 0 ? 'search' : 'normal')
            if (searchUser.length === 0) {
              Taro.reLaunch({url: '/pages/search/index'});
            } else {
              Taro.reLaunch({url: '/pages/index/index'});
            }
          } else {
            this.setState({
              againStatus: true,
              captcha: ''
            })
          }
        }).catch(() => {
        })
      }
    });
  };

  onClick = () => {
    this.setState({focus: true})
  }

  onAgainClick = () => {
    clearInterval(timer)
    this.setState({
      captcha: '',
      againStatus: false,
    })
    const {phone} = this.state;
    this.props.dispatch({
      type: 'login/getSms',
      payload: {mobile: phone},
    }).then(res => {
      this.onTimer();
      const {message, code} = res.data || {}
      if (code === 200) {
        this.setState({
          second: 59,
        })
      } else {
        Message(message)
      }
    }).catch(() => {
    })
  }


  render() {
    const {captcha, focus, phone, second, againStatus} = this.state;
    return (
      <View className='yc-login'>
        <View className='yc-login-header'>
          <View className="yc-login-header-logoTopView">
            <Image className='yc-login-header-logoTop' src={loginTopImg}/>
          </View>
          <View className='yc-login-header-text'>输入验证码</View>
        </View>
        <View className='yc-login-authCode'>
          <View className='yc-login-authCode-phoneText'>
            <View className='yc-login-authCode-phoneText-text'>验证码已发送至：</View>
            <View className='yc-login-authCode-phoneText-phone'>{phone}</View>
          </View>
          <View className='yc-login-authCode-container' onClick={this.onClick}>
            <Input className='yc-login-authCode-container-input' type='number' maxlength={4} focus={focus}
                   onInput={this.onChangeCaptcha}/>
            {
              [0, 1, 2, 3].map((_value, index) => {
                return <View
                  className={index === captcha.length ? 'yc-login-authCode-container-input-box yc-login-authCode-container-input-box-at' : 'yc-login-authCode-container-input-box'}
                  key={index}>
                  {
                    captcha[index]
                  }
                </View>
              })
            }
          </View>
          {
            againStatus && second !== 59 ?
            <View>
              <View className='yc-login-authCode-errorText'>验证码输入错误</View>
            </View> : null
          }
          {
            againStatus && second === 59 ?
              <View className='yc-login-authCode-againContent' onClick={this.onAgainClick}>
                <View className='yc-login-authCode-againContent-againText'>
                  点击重新获取验证码
                </View>
                <Text className="iconfont icon-refresh" style={{fontSize: '32rpx', color: '#0979E6'}}/>
              </View> :
              <View className='yc-login-authCode-secondText'>{`${second}s后重新获取验证码`}</View>
          }
          <View className='yc-login-footer' style={{height:'59vh'}}>
            <Image className='yc-login-footer-footerImg' src={loginFooterImg} style={{opacity: '0.15'}}/>
          </View>
        </View>
      </View>
    )
  }
}
