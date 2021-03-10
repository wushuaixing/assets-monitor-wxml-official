import React, {useEffect, useState} from "react";
import Taro from '@tarojs/taro';
import {View, Text, Image} from '@tarojs/components';
import { getPlot, getTitleTag, getRiskTag, getObligorName, getTime, getAuctionStatus, getAuctionRoleType, getJumpType, getCaseType, getRequestParams } from './config';
import {dateToFormat, floatFormat, throttle} from '../../utils/tools/common';
import { setGlobalData } from "../../utils/const/global";
import './index.scss';


interface itemType{
  caseNumber?: string
  caseReason?: string
  isRead: boolean
  id: number
  title: string
  time?: string
  status: number
  roleType?: number
  obligorName: string
  valueLevel: number
  bankruptcyType?:number
  consultPrice?: number
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
  parties?: []
}

type IProps = {
  type: string
  dataType: number
  updateTime: Date
  object: itemType
  onMarkRead: any
  index: number
  loading: boolean
}

const ListItem = (props: IProps) => {
  const { dataType, updateTime, type, index} = props;
  const [detail, setDetail] = useState(props.object);
  useEffect(() => {
    setDetail(props.object);
  }, [props.object]);

  // 刷新页面
  const onRefresh = (objValue, type) => {
    const newDetail = {...detail};
    newDetail[type] = objValue[type];
    setDetail(newDetail);
  };

  // 跳转详情页
  const handleGoDetail = () => {
    let detailString = JSON.stringify({...detail, dataType});
    let url = getJumpType(dataType).url;
    Taro.navigateTo({
      url: `${url}?detail=${detailString}`,
      success: function(res) {
        setGlobalData('refreshMonitor', false);
        res.eventChannel.emit('acceptDataFromOpenerPage', { ...detail, dataType})
      }
    });
  };

  // 点击已读未读
  const handleMarkRead = () => {
    getJumpType(dataType).apiName({...getRequestParams(dataType, detail.id)})
      .then(res => {
        if(res.code === 200 && res.data){
          const { id } = detail;
          onRefresh({id, isRead: true, index}, 'isRead');
          handleGoDetail();
        }
        else {
          handleGoDetail();
        }
      })
  };

  const handleGetName = (parties, field, name ) => {
    const applicantName = (parties || []).filter(item =>item[field] === name) || [];
    return applicantName.length > 0 ? (applicantName.map(item => { return item.name }) || []).join() : '--';
  };

  return (
    <View className='item' onClick={throttle(handleMarkRead, 2000)}>
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
            getTime(updateTime)
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
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{dateToFormat(detail.start, 'YYYY-MM-DD HH:mm:ss')}</View>
					</View>
				</View>
      }
      {/*代位权-立案*/}
      {
        dataType === 2 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{dateToFormat(detail.gmtRegister)}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseNumber || '--'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason || '--'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseType ? getCaseType(detail.caseType) : '--'}</View>
					</View>
				</View>
      }
      {/*代位权-开庭*/}
      {
        dataType === 3 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>开庭日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{dateToFormat(detail.gmtTrial)}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseNumber || '--'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason || '--'}</View>
					</View>
				</View>
      }
      {/*代位权-文书*/}
      {
        dataType === 4 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{dateToFormat(detail.gmtPublish)}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseNumber || '--'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason || '--'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseType || '--'}</View>
					</View>
				</View>
      }
      {/*破产重整立案*/}
      {
        dataType === 5 && detail.bankruptcyType === 1 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{dateToFormat(detail.publishDate)}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>申请人</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{handleGetName(detail.parties, 'role', '申请人')}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.title || '--'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>破产法院</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.court || '--'}</View>
					</View>
				</View>
      }
      {/*破产重整公告*/}
      {
        dataType === 5 && detail.bankruptcyType === 2 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>标题</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.title || '--'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{dateToFormat(detail.publishDate)}</View>
					</View>
	        <View className='item-content-info'>
		        <View className='item-content-info-label'>破产法院</View>
		        <View className='item-content-info-colon'>：</View>
		        <View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.court || '--'}</View>
	        </View>
				</View>
      }
      {/*涉诉-立案*/}
      {
        dataType === 6 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>立案日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{dateToFormat(detail.gmtRegister)}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseNumber || '--'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason || '--'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseType ? getCaseType(detail.caseType) : '--'}</View>
					</View>
				</View>
      }
      {/*涉诉-开庭*/}
      {
        dataType === 7 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>开庭日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.gmtTrial}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseNumber || '--'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason || '--'}</View>
					</View>
				</View>
      }
      {/*涉诉-文书*/}
      {
        dataType === 8 && <View className='item-content'>
					<View className='item-content-info'>
						<View className='item-content-info-label'>发布日期</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{dateToFormat(detail.gmtPublish)}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案号</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseNumber || '--'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案由</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseReason || '--'}</View>
					</View>
					<View className='item-content-info'>
						<View className='item-content-info-label'>案件类型</View>
						<View className='item-content-info-colon'>：</View>
						<View className={`item-content-info-${detail.isRead ? `readtext` : `noreadtext`}`}>{detail.caseType || '--'}</View>
					</View>
				</View>
      }
    </View>
  );
};

export default ListItem;
