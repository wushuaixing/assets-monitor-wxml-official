import request from '../request/index';

// 监控页数据列表数量
export async function monitorListCount() {
  return request.get('/yc/wechat/index/aggregation/monitorListCount');
}

