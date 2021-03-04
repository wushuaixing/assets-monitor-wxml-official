import request from '../../request/index';

// 监控 - 破产详情页 - 关联案件
export async function bankruptcyAssociatedCase(payload) {
  return request.get(`/yc/wechat/monitor/bankruptcy/trialDetail?id=${payload.id}`);
}

