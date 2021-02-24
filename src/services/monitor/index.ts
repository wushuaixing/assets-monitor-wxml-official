import request from '../request/index';

// 监控页数据列表数量
export async function assetListCountApi() {
  return request.get('/yc/wechat/index/aggregation/assetListCount');
}

export async function assetListApi(payload) {
  console.log('assetListApi payload === ', payload);
  return request.get('/yc/wechat/index/aggregation/assetList', {...payload});
}

export async function riskListApi(payload) {
  return request.get('/yc/wechat/index/aggregation/riskList', {...payload});
}
export async function riskListCountApi(payload) {
  return request.get('/yc/wechat/index/aggregation/riskListCount', {...payload});
}



