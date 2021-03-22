import React, {Component} from 'react'
import {View, Input, Text} from '@tarojs/components'
import {AtButton} from 'taro-ui'
import Taro from '@tarojs/taro';
import {connect} from 'react-redux';
import AccountInvalid from './account-invalid/index';
import {throttle} from "../../utils/tools/common";
import './index.scss'

type isState = {
  mobile: string,
  inputError: boolean,
  accountInvalidStatus: boolean,
}
type IProps = {
  accountNumber: string,
  dispatch: ({type: string, payload: object}) => {
    then(param: (res) => void): any;
  },
};
const Message = title => Taro.showToast({title, icon: 'none'});
@connect(({login}) => ({login}))
export default class PhoneLogin extends Component<IProps, isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      mobile: '',
      inputError: true,
      accountInvalidStatus: false
    }
  }


  componentWillMount() {
  }

  componentDidMount() {
    const {accountNumber} = this.props.login;
    const reg = /^[0-9]+$/;
    if (accountNumber && accountNumber.length <= 11 && reg.test(accountNumber)) {
      const curMobile = this.handleMobile(accountNumber)
      this.setState({
        mobile: curMobile
      })
    } else {
      this.setState({
        mobile: accountNumber.slice(0, 13)
      })
    }
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  onBtnClick = () => {
    const {mobile} = this.state;
    const curMobile = mobile.replace(/[^0-9]/ig, "")
    const Rule = new RegExp(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/);
    const inputError = Rule.test(curMobile);
    this.setState({inputError})
    if (inputError) {
      this.props.dispatch({
        type: 'login/getSms',
        payload: {mobile: curMobile},
      }).then(res => {
        const {code} = res || {};
        if (code === 200) {
          Taro.navigateTo({
            url: `/pages/loginAgency/auth-code/index?phone=${curMobile}`,
          });
        } else if (code === 15002) {
          this.setState({
            accountInvalidStatus: true
          });
        } else {
          Message(res.message)
        }
      }).catch(() => {
      })
    }
  }

  handleMobile = (value) => {
    let curValue = value.replace(/[^0-9]/ig, "");
    const arr = curValue.split('');
    if (arr && arr.length >= 8) {
      arr.splice(3, 0, ' ');
      arr.splice(8, 0, ' ');
      curValue = arr.join('');
      return curValue
    }
    if (arr && arr.length >= 4) {
      arr.splice(3, 0, ' ');
      curValue = arr.join('');
      return curValue
    }
    return curValue
  }

  onInput = (e) => {
    const {detail: {value}} = e;
    const curValue = this.handleMobile(value)
    if (curValue) {
      this.setState({mobile: curValue})
      this.onShareAccount();
    }
  }

  onFocus = () => {
    this.setState({inputError: true})
  }

  onAccountInvalidClick = () => {
    this.setState({
      accountInvalidStatus: false
    })
  }

  onRemoveClick = () => {
    this.setState({
      mobile: ''
    })
    this.onShareAccount();
  }

  onShareAccount = () => {
    setTimeout(() => {
      const {mobile} = this.state;
      let curValue = mobile.replace(/[^0-9]/ig, "");
      this.props.dispatch({
        type: 'login/getAccountNumber',
        payload: {accountNumber: curValue}
      })
    })
  }

  render() {
    const {mobile, inputError, accountInvalidStatus} = this.state;
    return (
      <View className="yc-login-phoneContent">
        <View className="yc-login-phoneContent-box">
          <View className="yc-login-phoneContent-title">源诚资产监控平台</View>
          <View className="yc-login-phoneContent-phone">
            <View className="yc-login-phoneContent-phone-content">
              <Text className="iconfont icon-phone yc-login-phoneContent-phone-content-iconPhone"/>
              <View className="yc-login-phoneContent-phone-content-input">
                <Input
                  name='phoneNum'
                  maxlength={13}
                  onInput={this.onInput}
                  onFocus={this.onFocus}
                  placeholder='请输入手机号'
                  type='number'
                  value={mobile}
                />
              </View>
              {
                mobile !== "" && <Text className="iconfont icon-remove yc-login-phoneContent-phone-content-iconRemove"
                                       onClick={this.onRemoveClick}/>
              }
            </View>
            <View className="yc-login-phoneContent-line"/>
            {
              !inputError ?
                <View className="yc-login-phoneContent-errorText">手机号输入错误，请重新输入</View>
                :
                <View className="yc-login-phoneContent-text">未注册的账号暂不支持登录</View>
            }

            <View className="yc-login-phoneContent-btn">
              <AtButton
                customStyle={{
                  width: '574rpx',
                  height: '98rpx',
                  lineHeight: '98rpx',
                  backgroundColor: '#fff',
                  border: 'none',
                  textAlign: 'center',
                  opacity: '1'
                }}
                disabled={mobile.length !== 13}
                onClick={throttle(this.onBtnClick, 3000)}
              >
                <Text style={{opacity: mobile.length !== 13 ? '0.45' : '1'}}>获取短信验证码</Text>
              </AtButton>
            </View>
          </View>
        </View>
        {
          accountInvalidStatus && <AccountInvalid onConfirm={this.onAccountInvalidClick}/>
        }
      </View>
    )
  }
}
