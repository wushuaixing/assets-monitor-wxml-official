import React, {useEffect, useState} from "react";
import Taro from '@tarojs/taro';
import moment from "moment";
import {View, Text, Image} from '@tarojs/components';
import { getPlot, getTitleTag, getRiskTag, getObligorName, getTime, getAuctionStatus, getAuctionRoleType, getJumpType, getCaseType } from './config';
import { floatFormat } from '../../utils/tools/common';
import './index.scss';


interface itemType{
  caseNumber?: string
  caseReason?: string
  isRead: boolean
  id: number
  title: string
  time?: string
  status: number
  roleType: number
  obligorName: string
  valueLevel: number
  bankruptcyType?:number
  consultPrice: number
  auctionStatusTag?: number
  roundTag?: number
  caseType?: number
  start?: Date
  gmtCreate?: Date
  gmtRegister?: Date
  gmtPublish?: Date
  publishDate?: Date
  gmtTrial?: Date
  court?: string
}

type IProps = {
  type: string
  dataType: number
  object: itemType
  onMarkRead: any
  index: number
}

const ListItem = (props: IProps) => {
  const { dataType, type, object, index} = props;
  const [detail, setDetail] = useState(props.object);
  useEffect(() => {
    setDetail(props.object);
  }, [props.object]);

  const onRefresh = (objValue, type) => {
    const newDetail = {...detail};
    newDetail[type] = objValue[type];
    setDetail(newDetail);
  };


  const handleMarkRead = () => {
    getJumpType(dataType).apiName({idList: [`${detail.id}`]})
      .then(res => {
        let url = getJumpType(dataType).url;
        if(res.code === 200 && res.data){
          Taro.navigateTo({url: url})
        }
        else {
          const { id, isRead } = detail;
          onRefresh({id, isRead: !isRead, index}, 'isRead');
          let detailString = JSON.stringify({...detail, dataType});
          Taro.navigateTo({
            url: `${url}?detail=${detailString}`,
            success: function(res) {
              res.eventChannel.emit('acceptDataFromOpenerPage', { ...detail, dataType})
            }
          })
        }
    })
  };

  return (
    <View className='item' onClick={handleMarkRead}>
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
            {/*优先展示 新增拍卖轮次*/}
            {
              dataType === 1 ? ( detail.roundTag === 1 ? <View className='item-header-title-tag-status'>新增拍卖轮次</View> : ( detail.auctionStatusTag === 1 ? <View className='item-header-title-tag-status'>拍卖状态变更</View> : null)) : null
            }
          </View>
          <View className={`item-header-title-${ detail.isRead ? 'readtext' : 'noreadtext'}`}>
            {
              getObligorName(dataType, detail)
            }
          </View>
        </View>
        <View className='item-header-time'>
          {
            getTime(dataType, detail)
          }
        </View>
      </View>
      <View className='item-line'/>
      {/*资产拍卖*/}
      {
        dataType === 1 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>标题</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.title}</View>
					</View>
	        <View className='item-content-info'>
		        <View className='item-content-info-label'>角色</View>
		        <View className='item-content-info-colon'>：</View>
		        <View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{getAuctionRoleType(detail.roleType)}</View>
	        </View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>拍卖状态</View>
						<View className='item-content-info-colon'>：</View>
						<View className='item-content-info-noreadtext item-content-info-status'>{getAuctionStatus(detail.status)}</View>
					</View>
	        <View className='item-content-info'>
		        <View className='item-content-info-label'>评估价</View>
		        <View className='item-content-info-colon'>：</View>
		        <View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{`${floatFormat(detail.consultPrice)}元`}</View>
	        </View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>开拍时间</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{moment(detail.start).format('YYYY-MM-DD HH:mm:ss')}</View>
					</View>
				</View>
      }
      {/*代位权-立案*/}
      {
        dataType === 2 && <View className='item-content'>
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
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason || '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseType ? getCaseType(detail.caseType) : '-'}</View>
					</View>
				</View>
      }
      {/*代位权-开庭*/}
      {
        dataType === 3 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>开庭日期</View>
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
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason || '-'}</View>
					</View>
				</View>
      }
      {/*代位权-文书*/}
      {
        dataType === 4 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.gmtPublish ? moment(detail.gmtPublish).format('YYYY-MM-DD') : '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseNumber || '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason || '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseType ? getCaseType(detail.caseType) : '-'}</View>
					</View>
				</View>
      }
      {/*破产重整立案*/}
      {
        dataType === 5 && detail.bankruptcyType === 1 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.publishDate ? moment(detail.publishDate).format('YYYY-MM-DD') : '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>申请人</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.obligorName || '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.obligorName || '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>破产法院</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.court || '-'}</View>
					</View>
				</View>
      }
      {/*破产重整公告*/}
      {
        dataType === 5 && detail.bankruptcyType === 2 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>标题</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.title || '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.publishDate ? moment(detail.publishDate).format('YYYY-MM-DD') : '-'}</View>
					</View>
	        <View className='item-content-info'>
		        <View className='item-content-info-label'>破产法院</View>
		        <View className='item-content-info-colon'>：</View>
		        <View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.court || '-'}</View>
	        </View>
				</View>
      }
      {/*涉诉-立案*/}
      {
        dataType === 6 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.gmtRegister ? moment(detail.gmtRegister).format('YYYY-MM-DD') : '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseNumber || '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason || '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseType ? getCaseType(detail.caseType) : '-'}</View>
					</View>
				</View>
      }
      {/*涉诉-开庭*/}
      {
        dataType === 7 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>开庭日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.gmtTrial ? moment(detail.gmtTrial).format('YYYY-MM-DD') : '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseNumber || '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason || '-'}</View>
					</View>
				</View>
      }
      {/*涉诉-文书*/}
      {
        dataType === 8 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.gmtPublish ? moment(detail.gmtPublish).format('YYYY-MM-DD') : '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseNumber || '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason || '-'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseType ? getCaseType(detail.caseType) : '-'}</View>
					</View>
				</View>
      }
    </View>
  );
};

export default ListItem;
