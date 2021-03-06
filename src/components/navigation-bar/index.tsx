import React, {FC} from 'react';
import Taro from '@tarojs/taro';
import { View} from "@tarojs/components";
import { getGlobalData } from "../../utils/const/global";
import './index.scss';

type IProps = {
  border?: boolean,
  title?: string,
  type?: string,
  color?: string,
  url?:string,
  isTab?:boolean,
}

const NavigationBar: FC<IProps> = ({border, title, type = 'white', color = 'black',url,isTab}) => {
  const statusBarHeight = getGlobalData('statusBarHeight') || 20;
  const style = {
    paddingTop : `${statusBarHeight}px`,
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

  return(
    <View className={`navigation-wrapper${border ? ' navigation-wrapper-border' : ''} navigation-${type}`} style={style}>
      {
        backStates ? (
          <View className='navigator-chevron' onClick={() => goback()}>
            <View className='at-icon at-icon-chevron-left' />
          </View>
        ) : null
      }
      <View className={`navigator-content navigator-${color}`}>{title}</View>
    </View>
  )
};

export default NavigationBar;
