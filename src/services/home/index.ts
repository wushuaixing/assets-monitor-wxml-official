import request from '../request/index';

// jsSessionUrl
export async function getJsSessionUrl(payload) {
  return request.getNoToken('api/auth/open/wechat/jsSession',  { jsCode: payload.jsCode}, false);
}

