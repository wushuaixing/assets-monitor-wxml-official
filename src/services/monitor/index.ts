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




