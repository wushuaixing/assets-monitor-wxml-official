import request from '../request/index';

export async function getUserInfoUrl() {
  return request.get('/yc/wechat/user/userInfo');
}
export async function getAdviceUrl(params) {
  return request.post('/yc/wechat/user/getAdvice',  params);
}
