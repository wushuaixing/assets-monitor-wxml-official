import request from '../request/index';

export async function getObligorListUrl(params) {
  return request.get(`/yc/wechat/obligor/obligorList`,{...params});
}

export async function getOpenPushUrl(params) {
  return request.post('/yc/wechat/obligor/openPush',  params);
}

export async function getClosePushUrl(params) {
  return request.post('/yc/wechat/obligor/closePush',  params);
}

export async function getBusinessListUrl(params) {
  return request.get(`/yc/wechat/business/list`,{...params});
}

export async function getBusinessDetailUrl(params) {
  return request.get(`/yc/wechat/business/detail`,{...params});
}

export async function getBusinessDeleteUrl(params) {
  return request.post('/yc/wechat/business/delete',  params);
}

export async function getBusinessSaveUrl(params) {
  return request.post('/yc/wechat/business/save',  params);
}

export async function getBusinessEditUrl(params) {
  return request.post(`/yc/wechat/business/edit/${params.id}`,  params);
}
export async function getBusOpenPushUrl(params) {
  return request.post('/yc/wechat/business/openPush',  params);
}

export async function getBusClosePushUrl(params) {
  return request.post('/yc/wechat/business/closePush',  params);
}

// 债务人详情
export async function getObligorDetailUrl(params) {
  return request.get('/yc/wechat/obligor/monitor/overview/detail',{...params});
}

// 关联业务
export async function getObligorRelationUrl(params) {
  return request.get('/yc/wechat/obligor/monitor/overview/relation',{...params});
}

// 资产各类数据统计
export async function getObligorAssetTotalCountUrl(params) {
  return request.get('/yc/wechat/obligor/monitor/asset/assetTotalCount',{...params});
}

// 风险各类数据统计
export async function getObligorRiskTotalCountCountUrl(params) {
  return request.get('/yc/wechat/obligor/monitor/risk/riskTotalCount',{...params});
}

export async function getAuthRuleUrl({}) {
  return request.get('/api/auth/authRule',{});
}

//html文书还原详情
export async function getWritRestore(params) {
  return request.get('/yc/wechat/index/aggregation/getJudgmentDocumentReduction',{...params});
}




