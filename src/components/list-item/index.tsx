import React, {useState} from "react";
import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getPlot, getTitleTag } from './config';
// import { roleType } from '../../utils/const/monitor';
import './index.scss';

const roleType = ['未知', '资产所有人', '债权人', '资产线索', '起诉人', '竞买人'];

interface itemType{
  dataType: number
  object: {
    isRead: boolean
    bankruptcyType: number
    id: number
    title: string
    time?: string
    star: number
    status: number
    roleType: number
    obligorName: string
    valueLevel: string
  }
}

type Iprops = {
  id: string | undefined
  index: number
  style: object
  data: itemType[]
}

const ListItem = React.memo((props: Iprops) => {
  const { id, index, data } = props;
  const onhandleNavigate = (index) => {
    // const newData = [...data];
    // newData[index].object.isRead = true;
    // setCurrentData([...newData]);
    Taro.navigateTo({
      url: `/subpackage/pages/monitor/asset-auction/index`,
    })
  };
  return (
    <View id={id} className='item' onClick={() => onhandleNavigate(index)}>
      <View className='item-segmentation'/>
      <View className='item-header'>
        <View className={`${index % 2 === 0 ? `item-header-box` : ``}`}>
          <Image className='item-header-box-pic' src={getPlot(data[index].dataType)}/>
          {
            data[index].object.isRead ? <View className='item-header-box-mask'/> : null
          }
        </View>
        <View className='item-header-title'>
          <View className='item-header-title-tag'>
            <View className='item-header-title-tag-star'>
              <Text className='iconfont icon-star item-header-title-tag-star-active' />
              <Text className={`iconfont icon-star item-header-title-tag-star-${data[index].object.star === 2 || data[index].object.star === 3 ? `active` : `normal`}`} />
              <Text className={`iconfont icon-star item-header-title-tag-star-${data[index].object.star === 3 ? `active` : `normal`}`} />
            </View>
            <View className='item-header-title-tag-type'>{getTitleTag(data[index].dataType, data[index].object.bankruptcyType)}</View>
            {
              data[index].dataType === 1 ? <View className='item-header-title-tag-status'>拍卖状态变更</View> : null
            }
          </View>
          <View className={`item-header-title-${ data[index].object.isRead ? 'readtext' : 'noreadtext'}`}>
            {
              data[index].object.obligorName
            }
          </View>
        </View>
        <View className='item-header-time'>{data[index].object.time}</View>
      </View>
      <View className='item-line'/>
      {/*资产拍卖*/}
      {
        data[index].dataType === 1 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>标题</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>{data[index].object.title }</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>拍卖状态</View>
						<View className='item-content-info-colon'>：</View>
						<View className='item-content-info-noreadtext item-content-info-status'>{data[index].object.status}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>角色</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>未知</View>
						{/*<View className={`item-content-info-${currentData[index].object.isRead ? `readtext` : `noreadtext`}`}>{roleType[currentData[index].object.roleType]}</View>*/}
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
          </View>
				</View>
      }
      {/*代位权-立案*/}
      {
        data[index].dataType === 2 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
      {/*代位权-开庭*/}
      {
        data[index].dataType === 3 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
				</View>
      }
      {/*代位权-文书*/}
      {
        data[index].dataType === 4 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
      {/*破产重整立案*/}
      {
        data[index].dataType === 5 && data[index].object.bankruptcyType === 1 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>申请人</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>破产法院</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>九江市中级人民法院</View>
					</View>
				</View>
      }
      {/*破产重整公告*/}
      {
        data[index].dataType === 5 && data[index].object.bankruptcyType === 2 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>标题</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>山东金安投资有限公司受理公告</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
				</View>
      }
      {/*涉诉-立案*/}
      {
        data[index].dataType === 6 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
      {/*涉诉-开庭*/}
      {
        data[index].dataType === 7 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
				</View>
      }
      {/*涉诉-文书*/}
      {
        data[index].dataType === 8 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${data[index].object.isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
    </View>
  );
});

export default ListItem
