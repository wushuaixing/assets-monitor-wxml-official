import Taro from '@tarojs/taro';
import { urlEncode, formatDateTime}from "./tools/common";
import { HTTP_STATUS } from './const/status'
import { base } from './api'

interface resType {
  data: {
    code: number
  },
  statusCode: number
}

interface optionType {
  data?: object,
  dataType?: string,
  header?: any,
  method?: string,
  isShowLoading: boolean,
  loadingText: string,
  url: string,
  success: (res: resType) => any,
  error: (e: any) => any,
}

const logError = (name?: string, action?: any, info?: any) => {
  if (!info) {
    info = 'empty';
  }
  try {
    // let deviceInfo = wx.getSystemInfoSync();
    // var device = JSON.stringify(deviceInfo);
  }catch (err) {
    console.error('not support getSystemInfoSync api', err.message);
  }
  const now = new Date();
  let time = formatDateTime(now, false);
  console.error(time, name, action, info);
};

// export default request;

const baseOptions = (params: {[propName: string] : any}, method: string = 'GET') => {
  let { url, data, isToken, customUrl = '' } = params;
  const token: string = Taro.getStorageSync('token');
  let contentType: string = 'application/json;charset=utf-8';
  contentType = params.contentType || contentType;
  const _data: object = Object.assign({}, data, isToken ? { token } : {});
  // @ts-ignore
  const option: optionType = {
    isShowLoading : false,
    loadingText   : '正在加载',
    url           : base + url + customUrl,
    data          : _data,
    method        : method,
    header        : { 'content-type' : contentType },
    success(res: resType) {
      if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
        return logError('api', '请求资源不存在');
      }else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
        return logError('api', '服务端出现了问题');
      }else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
        return logError('api', '没有权限访问');
      }else if (res.statusCode === HTTP_STATUS.SUCCESS) {
        return res.data;
      }
      if (res.data.code === 401) {
        Taro.reLaunch({
          url : '/pages/login/index'
        });
      }
    },
    error(e) {
      logError('api', '请求接口出现问题', e);
    }
  };
  if (isToken && method === 'POST'){
    // @ts-ignore
    delete option.data.token;
    if (option.url.match(/\?/)) {
      option.url = `${option.url}${`&token=${token}`}`;
    }else {
      option.url = `${option.url}${`?token=${token}`}`;
    }
  }
  // @ts-ignore
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
  post : function (url: string, data?: object, contentType?: string) {
    let params = { url, data, contentType, isToken : true };
    return baseOptions(params, 'POST');
  }
};
