import request from '../request/index';

export async function getOpenIdUrl(payload) {
  return request.getNoToken('/api/auth/open/wechat/newJsSession',  { jsCode: payload.jsCode}, false);
}

export async function getSmsUrl(payload) {
  return request.getNoToken('/api/auth/open/wechat/sms',  { mobile: payload.mobile}, false);
}

export async function getLoginPreCheckUrl(payload) {
  return request.getNoToken('/api/auth/open/loginPreCheck',  { username: payload.username}, false);
}

export async function getPasswordLoginUrl(params) {
  return request.post(`/api/auth/open/wechat/passwordLogin?openId=${params.jsCode}`,  params);
}

export async function getSmsLoginUrl(params) {
  return request.post(`/api/auth/open/wechat/smsLogin?openId=${params.jsCode}`,  params);
}

export async function getAuthRuleUrl() {
  return request.get(`/api/auth/authRule`);
}
