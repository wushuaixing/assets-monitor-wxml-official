import assetsAuction from '../../assets/img/components/assets-auction.png'
import subrogation from '../../assets/img/components/subrogation.png'
import litigation from '../../assets/img/components/litigation.png';
import bankruptcy from '../../assets/img/components/bankruptcy.png';
import {
  auctionMarkReadApi,
  subrogationTrialMarkReadApi,
  subrogationCourtMarkReadApi,
  subrogationJudgmentMarkReadApi,
  bankruptcyMarkReadApi, lawsuitTrialMarkReadApi, lawsuitCourtMarkReadApi, lawsuitJudgmentMarkReadApi
} from '../../services/monitor';
import moment from "moment";
moment.locale('zh-cn');

// 1：资产拍卖 2：代位权-立案 3：代位权-开庭 4：代位权-涉诉 5：破产立案 6：破产公告 7：涉诉-立案 8：涉诉-开庭 9：涉诉-涉诉
const getPlot = (type: number) => {
  switch (type) {
    case 1: return assetsAuction;
    case 2: return subrogation;
    case 3: return subrogation;
    case 4: return subrogation;
    case 5: return bankruptcy;
    case 6: return litigation;
    case 7: return litigation;
    case 8: return litigation;
    default: return assetsAuction;
  }
};

const getLevel = (type, status: number) => {
  let title: string = '即将开始';
  if(type === 1){
    switch (status) {
      case 90: title = '三星'; break;
      case 80: title = '二星'; break;
      case 60: title = '一星'; break;
    }
  }
  else{
    switch (status) {
      case 90: title = '高风险'; break;
      case 80: title = '警示'; break;
      case 60: title = '提示'; break;
      case 40: title = '利好'; break;
    }
  }
  return title
};

// const status = 1-即将开始、3-正在进行、5-已成交、7-已流拍、9-中止、11-撤回
const getAuctionStatus = (status: number) => {
  let title: string = '-';
  switch (status) {
    case 1: title = '即将开始'; break;
    case 3: title = '正在进行'; break;
    case 5: title = '已成交'; break;
    case 7: title = '已流拍'; break;
    case 9: title = '中止'; break;
    case 11: title = '撤回'; break;
  }
  return title
};


// 角色类型:0-未知 1-资产所有人 2-债权人 3-资产线索 4-起诉人 5-竞买人
const getAuctionRoleType = (role: number) => {
  let roleType: string = '未知';
  switch (role) {
    case 0: roleType = '未知'; break;
    case 1: roleType = '资产所有人'; break;
    case 2: roleType = '债权人'; break;
    case 3: roleType = '资产线索'; break;
    case 4: roleType = '起诉人'; break;
    case 5: roleType = '竞买人'; break;
  }
  return roleType
};


const getRiskTag = (valueLevel: number) => {
  let title: string = '高风险';
  switch (valueLevel) {
    case 90: title = '高风险'; break;
    case 80: title = '警示'; break;
    case 60: title = '提示'; break;
    case 40: title = '利好'; break;
  }
  return title
};

const getTitleTag = (type: number, bankruptcyType?: number) => {
  let title: string = '资产拍卖';
  switch (type) {
    case 1: title = '资产拍卖'; break;
    case 2: title = '代位权-立案'; break;
    case 3: title = '代位权-开庭'; break;
    case 4: title = '代位权-文书'; break;
    case 5: title = bankruptcyType === 1 ? '破产重整立案' : '破产重整公告'; break;
    case 6: title = '涉诉-立案'; break;
    case 7: title = '涉诉-开庭'; break;
    case 8: title = '涉诉-文书'; break;
  }
  return title
};

const getObligorName = (type: number, detail) => {
  let name: string = '';
  switch (type) {
    case 1: name = detail.obligorName; break;
    case 2:
    case 3:
    case 4:
      let subrogationParties = detail.parties && detail.parties.length > 0 && detail.parties.filter(item => item.roleType === 1 && item.obligorId > 0) || [];
      name = subrogationParties.length > 0 ? subrogationParties.map(it => { return it.name}).join() : '';
      break;
    case 5: name = detail.obligorName; break;
    case 6:
    case 7:
    case 8:
      let litigationParties = detail.parties && detail.parties.filter(item => item.roleType === 2 && item.obligorId > 0);
      name = litigationParties.length > 0 ? litigationParties.map(item => { return item.name}).join() : '';
      break;
  }
  // console.log('name === ', name);
  return name
};


const getTime = ( updateTime ) => {
  let showTime: string = '-';
  if(!updateTime){
    return showTime;
  }
  let currentTime = moment();
  let time = moment(updateTime * 1000);
  let long = currentTime.diff(time, 'h');
  if(currentTime.isSame(time, 'd')){
    if(long < 1) {
      showTime = '刚刚';
    }
    else if(long >= 1 && long < 24){
      showTime = moment(updateTime * 1000).startOf('hour').fromNow();
    }
    else{
      showTime = moment(updateTime * 1000).format('YYYY-MM-DD');
    }
  }
  else{
    showTime = moment(updateTime * 1000).format('YYYY-MM-DD');
  }
  return showTime;
};

const getJumpType = (type) => {
  let apiName;
  let url: string = '';
  switch (type) {
    case 1: apiName = auctionMarkReadApi; url = '/subpackage/pages/monitor/asset-auction/index'; break;
    case 2: apiName = subrogationTrialMarkReadApi; url = '/subpackage/pages/monitor/subrogation/index?type=2'; break;
    case 3: apiName = subrogationCourtMarkReadApi; url = '/subpackage/pages/monitor/subrogation/index?type=3'; break;
    case 4: apiName = subrogationJudgmentMarkReadApi; url = '/subpackage/pages/monitor/subrogation/index?type=4'; break;
    case 5: apiName = bankruptcyMarkReadApi; url = '/subpackage/pages/monitor/bankruptcy/index'; break;
    case 6: apiName = lawsuitTrialMarkReadApi; url = '/subpackage/pages/monitor/involve-info/index?type=6'; break;
    case 7: apiName = lawsuitCourtMarkReadApi; url = '/subpackage/pages/monitor/involve-info/index?type=7'; break;
    case 8: apiName = lawsuitJudgmentMarkReadApi; url = '/subpackage/pages/monitor/involve-info/index?type=8'; break;
  }
  return { apiName, url}
};

// 类型 1：普通 2：破产 3：执行 4：终本
const getCaseType = (type) => {
  let caseType = '普通案件';
  switch (type) {
    case 1: caseType = '普通案件'; break;
    case 2: caseType = '破产案件'; break;
    case 3: caseType = '执行案件'; break;
    case 4: caseType = '终本案件'; break;
  }
  return caseType;
};

/**
 *  * 已读未读的请求字段
 * @param type
 * @param id
 */

const getRequestParams = (type, id) => {
  let arrayParams = {
    idList: [`${id}`]
  };
  let stringParams = {
    id: id
  };
  let params = {};
  switch (type) {
    case 1:
      params = stringParams;
      break;
    case 2:
    case 3:
    case 4:
      params = arrayParams;
      break;
    case 5:
      params = stringParams;
      break;
    case 6:
    case 7:
    case 8:
      params = arrayParams;
      break;
  }
  return params;
};

export {
  getPlot,
  getTitleTag,
  getRiskTag,
  getObligorName,
  getTime,
  getAuctionStatus,
  getAuctionRoleType,
  getJumpType,
  getCaseType,
  getLevel,
  getRequestParams
}
