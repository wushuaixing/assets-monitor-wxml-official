import React from "react";
import {View, Text, Image} from '@tarojs/components';
import { getPlot } from './config';
import './index.scss';

// dataType的映射
// 1：资产拍卖 2：代位权-立案 3：代位权-开庭 4：代位权-涉诉 5：破产 6：涉诉-立案 7：涉诉-开庭 8：涉诉-涉诉

interface dataType{
  id: number
  title: string
  time?: string
  star: number
  dataType: number
}

type Iprops = {
  id: number
  index?: number
  style: object
  data: dataType[]
}

const ListItem = React.memo((props: Iprops) => {
  const { id, index, style, data } = props;
  return (
    <View id={id} className='item'>
      <View className='item-segmentation'/>
      <View className='item-header'>
        <View className={`${index % 2 === 0 ? `item-header-box` : ``}`}>
          <Image className='item-header-box-pic' src={getPlot(data[index].dataType)}/>
        </View>

        <View className='item-header-title'>
          <View className='item-header-title-tag'>
            <View className='item-header-title-tag-star'>
              <Text className='iconfont icon-star item-header-title-tag-star-active' />
              <Text className={`iconfont icon-star item-header-title-tag-star-${data[index].star === 2 || data[index].star === 3 ? `active` : `normal`}`} />
              <Text className={`iconfont icon-star item-header-title-tag-star-${data[index].star === 3 ? `active` : `normal`}`} />
            </View>
            <View className='item-header-title-tag-type'>资产拍卖</View>
            <View className='item-header-title-tag-status'>拍卖状态变更</View>

          </View>
          <View className='item-header-title-text'>
            {
              data[index].title
            }
          </View>
        </View>
        <View className='item-header-time'>{data[index].time}</View>
      </View>
      <View className='item-line'/>
      <View className='item-content'>
        <View className='item-content-info'>
          <View className='item-content-info-label'>立案日期</View>
          <View className='item-content-info-colon'>：</View>
          <View className='item-content-info-text'>2020-03-25</View>
        </View>
        {
          index % 2 === 0 && <View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className='item-content-info-text'>【一拍】(破)华鑫化纤科技有限公司、余姚新华鑫纤维销售有限公司应收款项</View>
					</View>
        }
        <View className='item-content-info'>
          <View className='item-content-info-label'>案件类型</View>
          <View className='item-content-info-colon'>：</View>
          <View className='item-content-info-text'>执行案件</View>
        </View>
      </View>
    </View>
  );
});

export default ListItem
