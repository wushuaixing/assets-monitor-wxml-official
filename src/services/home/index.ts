import request from '../request/index';

// 当前机构统计信息
export async function currentOrganizationApi() {
  return request.get('/yc/index/information/overview/currentOrganization');
}

// 资产分类统计
export async function assetApi(payload) {
  return request.get('/yc/wechat/index/information/asset', { ...payload });
}

// 风险分类统计
export async function riskApi(payload) {
  return request.get('/yc/wechat/index/information/risk', {...payload});
}


