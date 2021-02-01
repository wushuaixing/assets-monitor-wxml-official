import request from '../../utils/request';
import Api from '../../utils/api/index';

// jsSessionUrl
export async function getJsSessionUrl(payload) {
  console.log('api === ', Api.home.jsSessionUrl, payload);
  return request.getNoToken(Api.home.jsSessionUrl,  { jsCode: payload.jsCode}, false);
}

