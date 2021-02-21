import React,{Component} from 'react'
import {View, Input, Text} from '@tarojs/components'
import {AtButton } from 'taro-ui'
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import rsaEncrypt from '../../utils/encrypt';
import { setGlobalData,getGlobalData } from '../../utils/const/global';
import ImageCode from './image-code/index';
import AccountInvalid from './account-invalid/index';
import './index.scss'


type isState ={
  captcha: string,
  focus: boolean,
  files: [],
  accountName:string,
  accountPassword:string,
  imgCodeStatus:boolean,
  accountInvalidStatus:boolean,
  nameFocus:boolean,
  pswFocus:boolean
}
type IProps = {
  count: number,
  dispatch: ({type: string, payload: object}) => {
    then(param: (res) => void): any;
  },
};

const Message = title => Taro.showToast({ title, icon : 'none' });
@connect(({ login }) => ({ login }))
export default class AccountLogin extends Component<IProps,isState> {
  constructor(props: any) {
    super(props);
    this.state = {
      captcha: '',
      focus: true,
      files: [],
      accountName:'',
      accountPassword:'',
      imgCodeStatus:false,
      accountInvalidStatus:false,
      nameFocus:false,
      pswFocus:false,
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

  toLoginPreCheck = () =>{
    const {accountName,accountPassword} = this.state;
    if (!accountName || !accountPassword)return Message('用户名或密码不能为空！');
    this.props.dispatch({
      type:'login/getLoginPreCheck',
      payload:{username:accountName},
    }).then(res=>{
      if(res.statusCode === 200){
        // this.preInfo = res.data;
        const { data:{mustVerifyImageCode, blockLogin} } = res.data || {};
        if (blockLogin)return Message('错误次数达到上限，账号被冻结，请一个小时候后尝试登录');
        if (mustVerifyImageCode){
          this.setState({ imgCodeStatus : true });
        }else {
          this.toPasswordLogin('');
        }
      }else{
        Message(res.message || '网络异常请稍后再试！');
      }
    }).catch(()=>{
      Message('网络异常请稍后再试！');
    })
  }

  toPasswordLogin = (imageVerifyCode) =>{
    const {accountName,accountPassword} = this.state;
    const params = {
      username:accountName,
      password:rsaEncrypt(accountPassword),
      jsCode:getGlobalData('openId'),
      imageVerifyCode
    }
    this.props.dispatch({
      type:'login/getPasswordLogin',
      payload:{...params}
    }).then(res=>{
      const { code, message } = res.data;
      const {data} = res.data || {};
      if (code === 200){
        Taro.setStorageSync('token', data.token);
        Taro.setStorageSync('loginNumber', accountName);
        setGlobalData('systemAuthRule',data.rules)
        const userStatus = Boolean(data.rules.filter(item => item.groupName === 'menu_sy').length);
        setGlobalData('systemRoleType',userStatus ? 'normal' : 'search' )
        if (!userStatus) Taro.reLaunch({ url : '/pages/search/index' });
        else Taro.reLaunch({ url : '/pages/index/index' });
      }else if (res.code === 15002){
        this.setState({
          accountInvalidStatus : true,
        });
      }else{
        if (data.errorTime > 4){
          return Message(data.errorTime >= 10 ? message : `账号或密码错误，您还可以尝试${data.errorTimeLeft}次`);
        }
        Message(message);
      }
    }).catch(()=>{

    })

  }

  onInput = (e,type) =>{
    const {detail:{value}} = e;
    this.setState({
      [type]:value
    })
  }

  onAccountInvalidClick = () =>{
    this.setState({
      accountInvalidStatus:false
    })
  }

  onFocus = (value) =>{
    this.setState({
      [value]:true
    })
  }

  onRemoveClick = (value) =>{
    this.setState({
      [value]:''
    })
  }

  render() {
    const {imgCodeStatus,accountInvalidStatus,accountName,accountPassword,pswFocus,nameFocus} = this.state;
    return (
      <View className="yc-login-phoneContent">
        <View className="yc-login-phoneContent-box">
          <View className="yc-login-phoneContent-title" style={{color:'#333333'}}>源诚资产监控平台</View>
          <View className="yc-login-phoneContent-phone">
            <View className="yc-login-phoneContent-phone-content">
              <Text className="iconfont icon-account" style={{fontSize:'40px',color:'#CCCCCC'}} />
              <View className="yc-login-accountContent">
                <Input
                  name='accountName'
                  onInput={(e) => this.onInput(e, 'accountName')}
                  onFocus={()=>{this.onFocus('nameFocus')}}
                  placeholder='请输入账号'
                  value={accountName}
                />
              </View>
              <Text className="iconfont icon-remove"  style={{fontSize:'32px',color:'#CCCCCC',float:'right',margin:'3px 8px 0 0'}} onClick={()=>{this.onRemoveClick('accountName')}}/>
            </View>
            <View className="yc-login-phoneContent-phone-content">
              <View className="yc-login-phoneContent-line" style={{background:'#CCCCCC',marginBottom:'60px'}}/>
              <Text className="iconfont icon-password" style={{fontSize:'40px',color:'#CCCCCC'}} />
              <View className="yc-login-accountContent">
                <Input
                  name='accountPassWord'
                  password
                  onInput={(e) => this.onInput(e, 'accountPassword')}
                  onFocus={()=>{this.onFocus('pswFocus')}}
                  placeholder='请输入密码'
                  value={accountPassword}
                />
              </View>
              <Text className="iconfont icon-remove"  style={{fontSize:'32px',color:'#CCCCCC',float:'right',margin:'3px 8px 0 0'}} onClick={()=>{this.onRemoveClick('accountPassword')}}/>
            </View>
            <View className="yc-login-phoneContent-line" style={{background:'#CCCCCC'}}/>
            <View className="yc-login-accountContent-accountBtn">
              <AtButton
                customStyle={{
                  width:'574rpx',
                  height : '98rpx',
                  lineHeight:'98rpx',
                  backgroundColor : '#0979E6',
                  border:'none',
                  textAlign:'center',
                  opacity:'1'
                }}
                disabled={!pswFocus && !nameFocus}
                onClick={this.toLoginPreCheck}
              >
                <Text style={{opacity:accountName && accountPassword ? '1' : '0.45'}}>登录</Text>
              </AtButton>
            </View>
          </View>
        </View>
        {
          !imgCodeStatus && <ImageCode onConfirm={this.toPasswordLogin} onCancel={() => {
            this.setState({ imgCodeStatus : false });
          }}/>
        }
        {
          accountInvalidStatus && <AccountInvalid onConfirm={this.onAccountInvalidClick} />
        }
      </View>
    )
  }
}
