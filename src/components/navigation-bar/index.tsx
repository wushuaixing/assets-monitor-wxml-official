import React, {FC} from 'react';
import Taro from '@tarojs/taro';
import { View} from "@tarojs/components";
import { getGlobalData } from "../../utils/const/global";
import './index.scss';

type IProps = {
  border?: boolean,
  title?: string,
}

const NavigationBar: FC<IProps> = ({border, title }) => {
  const statusBarHeight = getGlobalData('statusBarHeight') || 20;
  const style = { paddingTop : `${statusBarHeight}px` };
  const backStates = Taro.getCurrentPages().length > 1;

  return(
    <View className={`navigation-wrapper${border ? ' navigation-wrapper-border' : ''} `} style={style}>
      {
        backStates ? (
          <View className='navigator-chevron' onClick={this.onClick}>
            <View className='at-icon at-icon-chevron-left' />
          </View>
        ) : null
      }
      <View className='navigator-content'>{title}</View>
    </View>
  )
};

export default NavigationBar;
