import React,{Component} from 'react'
import {View} from '@tarojs/components'
import { connect } from 'react-redux';
import Taro from '@tarojs/taro';
import { setGlobalData } from '../../utils/const/global';

type isState ={}

type IProps = {
  count: number,
  dispatch: ({type: string, payload: object}) => {
    then(param: (result) => void): any;
  },
};
const Message = title => Taro.showToast({ title, icon : 'none' });
@connect(({ login }) => ({ login }))
export default class DefaultPage extends Component<IProps,isState>{


  componentWillMount() {
    Taro.showLoading({ title : '加载中...' });
    const token = Taro.getStorageSync('token');
    if (token){
      console.log('token存在',token);
      this.props.dispatch({
        type:'login/getAuthRule',
        payload:{}
      }).then(res=>{
        const {code,data} = res.data || {};
        if (code === 200){
          let searchUser = data.orgPageGroups.filter(item => item.groupName === 'menu_sy');
          setGlobalData('systemAuthRule',data.orgPageGroups)
          if (searchUser && searchUser.length === 0) {
            setGlobalData('systemRoleType','search')
            // 查询账号
            Taro.switchTab({ url : "/pages/search/index" });

          }else {
            setGlobalData('systemRoleType','normal')
            /* 系统正常跳转 */
            Taro.switchTab({ url : "/pages/index/index" });
          }
        }else {
          Taro.clearStorageSync();
          Taro.login().then(res => {
            const jsCode = res.code;
            setGlobalData('weChatCode',jsCode)
            this.props.dispatch({
              type:'login/getOpenId',
              payload:{jsCode},
            }).then(result=>{
              Taro.hideLoading();
              const { code,data } = result.data || {};
              if(code === 200){
                setGlobalData('openId',data)
                Taro.redirectTo({ url : '/pages/loginAgency/index' });
              }else{
                Message('网络异常请稍后再试！');
              }
            }).catch(()=>{
              Taro.hideLoading();
            })
          });
        }
      })
    }else {
      console.log('token不存在');
      Taro.login().then(res => {
        const jsCode = res.code;
        this.props.dispatch({
          type:'login/getOpenId',
          payload:{jsCode},
        }).then(result=>{
          console.log('openId',result)
          Taro.hideLoading();
          const { code,data } = result.data || {};
          if(code === 200){
            setGlobalData('openId',data)
            Taro.redirectTo({ url : '/pages/loginAgency/index' });
          }else{
            Message('网络异常请稍后再试！');
          }
        }).catch(()=>{
          Taro.hideLoading();
        })
      })
    }
  }

  componentDidMount() {
    Taro.getSystemInfo().then(res => {
      setGlobalData('statusBarHeight',res.statusBarHeight);
      setGlobalData('statusRailHome',res.statusBarHeight > 20 && /iOS/.test(res.system));
    });
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }


  render() {
    return (
      <View />
    )
  }
}
