import request from '../request/index';

export async function getObligorListUrl(params) {
  return request.get(`/yc/wechat/obligor/obligorList`,{...params});
}

export async function getOpenPushUrl(params) {
  return request.post('/yc/wechat/obligor/openPush',  params);
}

export async function getClosePushUrl(params) {
  return request.post('/yc/wechat/obligor/closePush',  params);
}

export async function getBusinessListUrl(params) {
  return request.get(`/yc/wechat/business/list`,{...params});
}

export async function getBusinessDetailUrl(params) {
  return request.get(`/yc/wechat/business/detail`,{...params});
}

export async function getBusinessDeleteUrl(params) {
  return request.post('/yc/wechat/business/delete',  params);
}

export async function getBusinessSaveUrl(params) {
  return request.post('/yc/wechat/business/save',  params);
}

export async function getBusinessEditUrl(params) {
  return request.post(`/yc/wechat/business/edit/${params.id}`,  params);
}
