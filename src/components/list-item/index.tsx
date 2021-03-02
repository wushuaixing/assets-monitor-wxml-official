import React from "react";
import moment from "moment";
import {View, Text, Image} from '@tarojs/components';
import { getPlot, getTitleTag, getRiskTag} from './config';
// import { roleType } from '../../utils/const/monitor';
import './index.scss';

const roleType = ['未知', '资产所有人', '债权人', '资产线索', '起诉人', '竞买人'];

interface itemType{
  caseNumber?: string
  caseReason?: string
  gmtCreate?: Date
  isRead: boolean
  id: number
  title: string
  time?: string
  status: number
  roleType: number
  obligorName: string
  valueLevel: number
  bankruptcyType?:number
}

type IProps = {
  type: string
  dataType: number
  object: itemType
  onClick: any
}

const ListItem = React.memo((props: IProps) => {
  const { dataType, type, object } = props;
  const detail: itemType = {...object};
  return (
    <View className='item'>
      <View className='item-segmentation'/>
      <View className='item-header'>
        <View className={`${detail.isRead ? `item-header-box` : ``}`}>
          <Image className='item-header-box-pic' src={getPlot(dataType)}/>
          {
            detail.isRead ? <View className='item-header-box-mask'/> : null
          }
        </View>
        <View className='item-header-title'>
          <View className='item-header-title-tag'>
            {
              type === 'assets' ? <View className='item-header-title-tag-star'>
                <Text className='iconfont icon-star item-header-title-tag-star-active' />
                <Text className={`iconfont icon-star item-header-title-tag-star-${detail.valueLevel === 90 || detail.valueLevel === 80 ? `active` : `normal`}`} />
                <Text className={`iconfont icon-star item-header-title-tag-star-${detail.valueLevel === 90 ? `active` : `normal`}`} />
              </View> : <View className={`item-header-title-tag-risk${detail.valueLevel}`}>{getRiskTag(detail.valueLevel)}</View>
            }

            <View className='item-header-title-tag-type'>{getTitleTag(dataType, detail.bankruptcyType)}</View>
            {
              dataType === 1 ? <View className='item-header-title-tag-status'>拍卖状态变更</View> : null
            }
          </View>
          <View className={`item-header-title-${ detail.isRead ? 'readtext' : 'noreadtext'}`}>
            {
              detail.obligorName
            }
          </View>
        </View>
        <View className='item-header-time'>{detail.time}</View>
      </View>
      <View className='item-line'/>
      {/*资产拍卖*/}
      {
        dataType === 1 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>标题</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.title }</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>拍卖状态</View>
						<View className='item-content-info-colon'>：</View>
						<View className='item-content-info-noreadtext item-content-info-status'>{detail.status}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>角色</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>未知</View>
            {/*<View className={`item-content-info-${currentData[index].object.isRead ? `readtext` : `noreadtext`}`}>{roleType[currentData[index].object.roleType]}</View>*/}
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
      {/*代位权-立案*/}
      {
        dataType === 2 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
      {/*代位权-开庭*/}
      {
        dataType === 3 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.gmtCreate ? moment(detail.gmtCreate).format('YYYY-MM-DD') : '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseNumber || '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason}</View>
					</View>
				</View>
      }
      {/*代位权-文书*/}
      {
        dataType === 4 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
      {/*破产重整立案*/}
      {
        dataType === 5 && detail.bankruptcyType === 1 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>申请人</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>破产法院</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>九江市中级人民法院</View>
					</View>
				</View>
      }
      {/*破产重整公告*/}
      {
        dataType === 5 && detail.bankruptcyType === 2 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>标题</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>山东金安投资有限公司受理公告</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
				</View>
      }
      {/*涉诉-立案*/}
      {
        dataType === 6 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
      {/*涉诉-开庭*/}
      {
        dataType === 7 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
				</View>
      }
      {/*涉诉-文书*/}
      {
        dataType === 8 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>2020-03-25</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>（2020）沪0117民初14166号</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>借款纠纷</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>执行案件</View>
					</View>
				</View>
      }
    </View>
  );
});

export default ListItem;
