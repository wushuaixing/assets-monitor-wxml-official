import React,{Component} from 'react'
import {View,Input,Text} from '@tarojs/components'
import {AtButton } from 'taro-ui'
import Taro from '@tarojs/taro';
import { connect } from 'react-redux';
import AccountInvalid from './account-invalid/index';
import './index.scss'

type isState ={
  mobile:string,
  inputError:boolean,
  accountInvalidStatus:boolean,
}
type IProps = {
  count: number,
  dispatch: ({type: string, payload: object}) => {
    then(param: (res) => void): any;
  },
};
const Message = title => Taro.showToast({ title, icon : 'none' });
@connect(({ login }) => ({ login }))
export default class PhoneLogin extends Component<IProps,isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      mobile:'',
      inputError: true,
      accountInvalidStatus:false
    }
  }


  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  onBtnClick = () =>{
    const {mobile} = this.state;
    const Rule = new RegExp(/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/);
    const inputError = Rule.test(mobile);
    this.setState({inputError})
    if(inputError){
      this.props.dispatch({
        type:'login/getSms',
        payload:{mobile},
      }).then(res=>{
        console.log('res',res)
        const {code} = res.data || {};
        if(code === 200){
          Taro.navigateTo({
            url:`/pages/loginAgency/auth-code/index?phone=${mobile}`,
          });
        }else if (code === 15002){
          this.setState({
            accountInvalidStatus:true
          });
        }else{
          Message(res.message)
        }
      }).catch(()=>{})
    }
  }

  onInput = (e) =>{
    const {detail:{value}} = e;
    this.setState({mobile:value})
  }

  onFocus = () =>{
    this.setState({inputError:true})
  }

  onAccountInvalidClick = () =>{
    this.setState({
      accountInvalidStatus:false
    })
  }

  onRemoveClick = () =>{
    this.setState({
      mobile:''
    })
  }

  render() {
    const { mobile, inputError,accountInvalidStatus } = this.state;
    return (
      <View className="yc-login-phoneContent">
        <View className="yc-login-phoneContent-box">
        <View className="yc-login-phoneContent-title">源诚资产监控平台</View>
        <View className="yc-login-phoneContent-phone">
          <View className="yc-login-phoneContent-phone-content">
          <Text className="iconfont icon-phone yc-login-phoneContent-phone-content-iconPhone" />
            <View className="yc-login-phoneContent-phone-content-input">
              <Input
                name='phoneNum'
                maxlength={11}
                onInput={this.onInput}
                onFocus={this.onFocus}
                placeholder='请输入手机号'
                type='number'
                value={mobile}
              />
            </View>
            <Text className="iconfont icon-remove yc-login-phoneContent-phone-content-iconRemove" onClick={this.onRemoveClick}/>
          </View>
          <View className="yc-login-phoneContent-line" />
          {
            !inputError ?
              <View className="yc-login-phoneContent-errorText">手机号输入错误，请重新输入</View>
              :
              <View className="yc-login-phoneContent-text">未注册的账号暂不支持登录</View>
          }

          <View className="yc-login-phoneContent-btn">
            <AtButton
              customStyle={{
                width:'574rpx',
                height : '98rpx',
                lineHeight:'98rpx',
                backgroundColor : '#fff',
                border:'none',
                textAlign:'center',
                opacity:'1'
              }}
              disabled={!mobile}
              onClick={this.onBtnClick}
            >
              <Text style={{opacity:!mobile ? '0.45' : '1'}}>获取短信验证码</Text>
            </AtButton>
          </View>
        </View>
        </View>
        {
          accountInvalidStatus && <AccountInvalid onConfirm={this.onAccountInvalidClick} />
        }
    </View>
    )
  }
}
