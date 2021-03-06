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



const HTTP_ERROR = {
  '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  '401': '用户没有权限（令牌、用户名、密码错误）。',
  '403': '用户得到授权，但是访问是被禁止的。',
  '404': '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  '406': '请求的格式不可得。',
  '410': '请求的资源被永久删除，且不会再得到的。',
  '422': '当创建一个对象时，发生一个验证错误。',
  '500': '服务器发生错误，请检查服务器。',
  '502': '网关错误。',
  '503': '服务不可用，服务器暂时过载或维护。',
  '504': '网关超时。',
};


type optionType = {
  url: string,
  data?: {token?: string},
  method?: any,
  header: object,
  // mode: string,
  success: any,
  fail: any,
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

function checkHttpStatus(response: any, resolve, reject) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    resolve(response.data)
  } else {
    const message = HTTP_ERROR[response.statusCode] || `ERROR CODE: ${response.statusCode}`;
    response.data.errorCode = response.statusCode;
    response.data.error = message;
    reject(response.data)
  }
}

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
    fail(e) {
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
  // console.log('option ========', option);
  // return Taro.request(option);
  return new Promise(((resolve, reject) => {
    Taro.request({
      ...option,
    }).then((res) => {
        checkHttpStatus(res, resolve, reject)
      })
  }))
};

export default {
  getNoToken: function(url: string, data: any = '', isToken: boolean = false) {
    let option = { url, data, isToken };
    return baseOptions(option);
  },
  get: function(url: string, data: any, isToken: boolean = true) {
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
