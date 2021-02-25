import request from '../request/index';

// 当前机构统计信息
export async function currentOrganizationApi() {
  return request.get('/yc/index/information/overview/currentOrganization');
}

