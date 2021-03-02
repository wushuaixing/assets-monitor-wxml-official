import request from '../request/index';

// 监控 - 资产列表数量
export async function assetListCountApi(payload) {
  return request.get('/yc/wechat/index/aggregation/assetListCount', {...payload});
}
// 监控 - 资产列表
export async function assetListApi(payload) {
  return request.get('/yc/wechat/index/aggregation/assetList', {...payload});
}
// 监控 - 风险列表数量
export async function riskListCountApi(payload) {
  return request.get('/yc/wechat/index/aggregation/riskListCount', {...payload});
}
// 监控 - 风险列表
export async function riskListApi(payload) {
  return request.get('/yc/wechat/index/aggregation/riskList', {...payload});
}

// 监控 - 资产拍卖已读
export async function auctionMarkReadApi(payload) {
  return request.post('/yc/wechat/monitor/auction/markRead', {...payload});
}

// 监控 - 代位权-立案
export async function subrogationTrialMarkReadApi(payload) {
  return request.post('/yc/wechat/monitor/trial/subrogation/read', {...payload});
}

// 监控 - 代位权-开庭
export async function subrogationCourtMarkReadApi(payload) {
  return request.post('/yc/wechat/monitor/court/subrogation/read', {...payload});
}

// 监控 - 代位权-裁判文书
export async function subrogationJudgmentMarkReadApi(payload) {
  return request.post('/yc/wechat/monitor/judgment/subrogation/read', {...payload});
}

// 监控 - 破产
export async function bankruptcyMarkReadApi(payload) {
  return request.post('/yc/wechat/monitor/bankruptcy/markRead', {...payload});
}

// 监控 - 涉诉 -立案
export async function lawsuitTrialMarkReadApi(payload) {
  return request.post('/yc/wechat/monitor/trial/lawsuit/read', {...payload});
}

// 监控 - 涉诉 -开庭
export async function lawsuitCourtMarkReadApi(payload) {
  return request.post('/yc/wechat/monitor/court/lawsuit/read', {...payload});
}

// 监控 - 涉诉 -裁判文书
export async function lawsuitJudgmentMarkReadApi(payload) {
  return request.post('/yc/wechat/monitor/judgment/lawsuit/read', {...payload});
}






