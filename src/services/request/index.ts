import Taro from '@tarojs/taro';
import { urlEncode, formatDateTime}from "../../utils/tools/common";
import { HTTP_STATUS } from '../../utils/const/status'
import {base} from '../../utils/config';

interface resType {
  data: {
    code: number
  },
  statusCode: number
}

// interface optionType {
//   data: { token?: string },
//   dataType?: string,
//   header?: object,
//   method?: string,
//   isShowLoading: boolean,
//   loadingText: string,
//   url: string,
//   success: (res: resType) => any,
//   error: (e: any) => any,
//   xhrFields: object,
// }

type optionType = {
  url: string,
  data?: {token?: string},
  method?: any,
  header: object,
  // mode: string,
  success: any,
  error: any,
}


const logError = (name?: string, action?: any, info?: any) => {
  if (!info) {
    info = 'empty';
  }
  const now = new Date();
  let time = formatDateTime(now, false);
  console.error(time, name, action, info);
};

const handleStatusCode = (res: resType) => {
  let currentCode: { code?: number, tipText?: string } = {};
  if(res.statusCode === 200){
    return res.data;
  }
  else {
    HTTP_STATUS.forEach((item) => {
      if(item.code === res.statusCode) {
        currentCode = {...item}
      }
      if(item.code === res.statusCode) {
        currentCode = {...item}
      }
    });
    return logError('api', currentCode.tipText);
  }
};

const baseOptions = (params: {[propName: string] : any}, method?: string = 'GET') => {
  let { url, data, isToken, customUrl = '' } = params;
  const token: string = Taro.getStorageSync('token');
  let contentType: string = 'application/json;charset=utf-8';
  contentType = params.contentType || contentType;
  const _data: object = Object.assign({}, data, isToken ? { token } : {});
  const option: optionType = {
    url           : base + url + customUrl,
    data          : _data,
    method        : method,
    header        : { 'content-type' : contentType },
    success(res: resType) {
      handleStatusCode(res);
    },
    error(e) {
      logError('api', '请求接口出现问题', e);
    }
  };
  if (isToken && method === 'POST'){
    if(option.data && option.data.token){
      delete option.data.token;
    }
    if (option.url.match(/\?/)) {
      option.url = `${option.url}&token=${token}`;
    }else {
      option.url = `${option.url}?token=${token}`;
    }
  }
  console.log('option ========', option);
  return Taro.request(option);
};

export default {
  getNoToken: function(url: string, data: any = '', isToken: boolean = false) {
    let option = { url, data, isToken };
    return baseOptions(option);
  },
  get: function(url: string, data: object = {}, isToken: boolean = true) {
    let customUrl: string = '';
    if (!isToken){
      const token: string = Taro.getStorageSync('token');
      customUrl = `?${urlEncode(Object.assign({}, data, { token }))}`;
    }
    let option = { url, data, isToken, customUrl };
    return baseOptions(option);
  },
  post: function (url: string, data?: object, contentType?: string) {
    let params = { url, data, contentType, isToken : true };
    return baseOptions(params, 'POST');
  }
};
