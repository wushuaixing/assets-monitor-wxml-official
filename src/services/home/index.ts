import request from '../request/index';

// 当前机构统计信息
export async function currentOrganizationApi() {
  return request.get('/yc/index/information/overview/currentOrganization');
}

// 资产分类统计
export async function assetApi() {
  return request.get('/yc/wechat/index/information/asset');
}

// 风险分类统计
export async function riskApi() {
  return request.get('/yc/wechat/index/information/risk');
}


