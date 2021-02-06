import React from "react";
import {View, Text, Image} from '@tarojs/components';
import { getPlot } from './config';
import './index.scss';

type Iprops = {
  id?: number
  title?: string
  time?: '2021-11-11'
}

const ListItem = React.memo((props: Iprops) => {
  const { id, title, time } = props;
  return (
    <View id={id} className='item'>
      <View className='item-segmentation'/>
      <View className='item-header'>
        <Image className='item-header-pic' src={getPlot('assetsAuction')}/>
        <View className='item-header-title'>
          <View className='item-header-title-tag'>
            <View className='item-header-title-tag-star'>
              <Text className='iconfont icon-star item-header-title-tag-star-active' />
              <Text className='iconfont icon-star item-header-title-tag-star-active' />
              <Text className='iconfont icon-star item-header-title-tag-star-normal' />
            </View>
            <View className='item-header-title-tag-type'>资产拍卖</View>
            <View className='item-header-title-tag-status'>拍卖状态变更</View>

          </View>
          <View className='item-header-title-text'>
            {
              title
            }
          </View>
        </View>
        <View className='item-header-time'>{time}</View>
      </View>
      <View className='item-line'/>
    </View>
  );
});

export default ListItem
