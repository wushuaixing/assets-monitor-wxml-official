import React, {useState} from "react";
import {View, Text, Image} from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getPlot, getTitleTag } from './config';
import './index.scss';

// dataType的映射
// 1：资产拍卖 2：代位权-立案 3：代位权-开庭 4：代位权-涉诉 5：破产 6：涉诉-立案 7：涉诉-开庭 8：涉诉-涉诉

interface itemType{
  index: any
  id: number
  title: string
  time?: string
  star: number
  dataType: number
  isRead: boolean
  bankruptcyType: number
}

type Iprops = {
  id: string | undefined
  index: any
  style: object
  data: itemType[]
}

const ListItem = React.memo((props: Iprops) => {
  const { id, index, data } = props;
  const [currentData, setCurrentData] = useState(data);

  const onhandleNavigate = (index) => {
    const newData = [...data];
    newData[index].isRead = true;
    setCurrentData([...newData]);
    Taro.navigateTo({
      url: `/subpackage/pages/monitor/asset-auction/index`,
    })
  };

  return (
    <View id={id} className='item' onClick={() => onhandleNavigate(index)}>
      <View className='item-segmentation'/>
      <View className='item-header'>
        <View className={`${index % 2 === 0 ? `item-header-box` : ``}`}>
          <Image className='item-header-box-pic' src={getPlot(currentData[index].dataType)}/>
          {
            currentData[index].isRead ? <View className='item-header-box-mask'/> : null
          }
        </View>
        <View className='item-header-title'>
          <View className='item-header-title-tag'>
            <View className='item-header-title-tag-star'>
              <Text className='iconfont icon-star item-header-title-tag-star-active' />
              <Text className={`iconfont icon-star item-header-title-tag-star-${currentData[index].star === 2 || currentData[index].star === 3 ? `active` : `normal`}`} />
              <Text className={`iconfont icon-star item-header-title-tag-star-${currentData[index].star === 3 ? `active` : `normal`}`} />
            </View>
            <View className='item-header-title-tag-type'>{getTitleTag(currentData[index].dataType, currentData[index].bankruptcyType)}</View>
            {
              currentData[index].dataType === 1 ? <View className='item-header-title-tag-status'>拍卖状态变更</View> : null
            }
          </View>
          <View className={`item-header-title-${ currentData[index].isRead ? 'readtext' : 'noreadtext'}`}>
            {
              currentData[index].title
            }
          </View>
        </View>
        <View className='item-header-time'>{currentData[index].time}</View>
      </View>
      <View className='item-line'/>
      {/*资产拍卖*/}
      {
        currentData[index].dataType === 1 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>标题</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>【一拍】(破)华鑫化纤科技有限公司、余姚新华鑫纤维销售有限公司应收款项</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>拍卖状态</View>
						<View className='item-content-info-colon'>：</View>
						<View className='item-content-info-noreadtext item-content-info-status'>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>角色</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>资产所有人</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
          </View>
				</View>
      }
      {/*代位权-立案*/}
      {
        currentData[index].dataType === 2 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
      {/*代位权-开庭*/}
      {
        currentData[index].dataType === 3 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
				</View>
      }
      {/*代位权-文书*/}
      {
        currentData[index].dataType === 4 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
      {/*破产重整立案*/}
      {
        currentData[index].dataType === 5 && currentData[index].bankruptcyType === 1 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>申请人</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>破产法院</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>九江市中级人民法院</View>
					</View>
				</View>
      }
      {/*破产重整公告*/}
      {
        currentData[index].dataType === 5 && currentData[index].bankruptcyType === 2 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>标题</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>山东金安投资有限公司受理公告</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
				</View>
      }
      {/*涉诉-立案*/}
      {
        currentData[index].dataType === 6 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
      {/*涉诉-开庭*/}
      {
        currentData[index].dataType === 7 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
				</View>
      }
      {/*涉诉-文书*/}
      {
        currentData[index].dataType === 8 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${currentData[index].isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
    </View>
  );
});

export default ListItem
