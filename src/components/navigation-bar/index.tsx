import React, {FC} from 'react';
import Taro from '@tarojs/taro';
import {Text, View} from "@tarojs/components";
import { getGlobalData } from "../../utils/const/global";
import './index.scss';

type IProps = {
  border?: boolean,
  title?: string,
  type?: string,
  color?: string,
  url?:string,
  isTab?:boolean,
  isAuthCode?:boolean,
  obligorCustom?:string,
}

const NavigationBar: FC<IProps> = ({border, title, type = 'white', color = 'black',url,isTab,isAuthCode,obligorCustom}) => {
  const statusBarHeight = getGlobalData('statusBarHeight') || 20;
  const style = {
    paddingTop : `${statusBarHeight}px`,
    position:isAuthCode ? 'absolute' : 'relative'
  };
  const backStates = Taro.getCurrentPages().length > 1;

  const goback = () => {
    if(url){
      if(isTab){
        Taro.switchTab({url})
      }else{
        Taro.navigateTo({url})
      }
    }else{
      Taro.navigateBack();
    }
  };

  const onGoHomeClick = () =>{
    Taro.switchTab({url:'/pages/index/index'});
  }

  return(
    <View className={`navigation-wrapper${border ? ' navigation-wrapper-border' : ''} navigation-${type}`} style={style} id='navBar'>
      {
        backStates ? (
          <View className='navigator-chevron' onClick={() => goback()}>
            <View className='at-icon at-icon-chevron-left navigator-chevron-icon' />
          </View>
        ) : null
      }
      <View className={`navigator-${color} ${obligorCustom ? 'navigation-obligorCustom' : 'navigator-content'}`}>
        {
          obligorCustom ? (
            <View className='navigation-home'>
              <View className='navigation-home-line' />
              <Text className="iconfont icon-goHome navigation-home-icon" onClick={onGoHomeClick}/>
            </View>
          ) : null
        }
        {title}
      </View>
    </View>
  )
};

export default NavigationBar;
