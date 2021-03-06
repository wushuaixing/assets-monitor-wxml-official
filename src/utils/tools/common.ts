import {getGlobalData} from "../const/global";
import Taro from '@tarojs/taro';
import moment from 'moment';
// 按需加载，里面的函数用到的时候再加进去

// 标准时间转年月日
export const formatDateTime = (date: any, onlyYear: boolean) => {
  const data: Date = new Date(date && date * 1000);
  const y = data.getFullYear();
  let m: number | string = data.getMonth() + 1;
  m = m < 10 ? (`0${m}`) : m;
  let d: number | string = data.getDate();
  d = d < 10 ? (`0${d}`) : d;
  let h: number | string = data.getHours();
  h = h < 10 ? (`0${h}`) : h;
  let minute: number | string = data.getMinutes();
  minute = minute < 10 ? (`0${minute}`) : minute;
  if (typeof date === 'number' && date === 0) return '1970-01-01 00:00';
  return onlyYear ? `${y}-${m}-${d}` : `${y}-${m}-${d} ${h}:${minute}`;
};

/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 *
 * return URL参数字符串
 */
export const urlEncode = (param?: any, key?: any, encode?: any): string => {
  if (param == null) return '';
  let paramStr: string = '';
  const t = typeof (param);
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += `&${key}=${(encode == null || encode) ? encodeURIComponent(param) : param}`;
  } else {
    Object.keys(param).forEach((i) => {
      const k = key == null ? i : key + (param instanceof Array ? '' : `.${i}`);
      paramStr += urlEncode(param[i], k, encode);
    });
  }
  return paramStr;
};

/**
 *
 * @param length
 */
export const randomStr = (length: number): string => {
  const len: number = length || 6;
  const $chars: string = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos: number = $chars.length;
  let pwd: string = '';
  for (let i: number = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};

/**
 * 传进来的权限，支持字符串或者数组
 * @param rule
 */

export const isRule = (rule) => {
  let ispermission: number = 0;
  let ruleArray: string[] = getGlobalData('ruleArray');
  if (ruleArray && ruleArray.length > 0) {
    if (Array.isArray(rule) && rule.length > 0) {
      rule.forEach(item => {
        ispermission = ruleArray.includes(item) ? ispermission + 1 : ispermission
      });
      return ispermission > 0
    } else if (typeof rule === 'string') {
      return ruleArray.includes(rule)
    } else {
      return rule
    }
  } else {
    return false
  }
};

/**
 * 过滤掉权限为false的数据
 * @param ruleArray
 */
export const filterArray = (ruleArray) => {
  let array: any[] = [];
  ruleArray.forEach(item => {
    if (item.isRule) {
      array.push(item);
    }
  });
  return array;
};


/**
 * 压缩权限数组
 * @param authRule
 */
export const handleDealAuthRule = (authRule) => {
  let ruleArray: string[] = [];
  authRule.forEach(item => {
    ruleArray.push(item.rule)
  });
  return ruleArray;
};

/**
 * 去除对象中空值
 * @param obj
 * @returns {*}
 */
export const clearEmpty = (obj) => {
  if (typeof obj === 'object') {
    const l = Object.keys(obj);
    const _obj = Object.assign({}, obj);
    l.forEach((item) => {
      if (_obj[item] === '' || _obj[item] === undefined || _obj[item] === null) delete _obj[item];
      else if (typeof _obj[item] === 'string') _obj[item] = _obj[item].replace(/^\s+|\s+$/g, '');
    });
    return _obj;
  }
  return obj;
};

/**
 * 数组根据某个对象的值去重
 * @param arr
 * @param val
 */
export const removeDuplicateFields = (arr, val) => {
  const res = new Map();
  return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1))
};


export const Message = title => Taro.showToast({title, icon: 'none'});

/**
 * 金额转成字符串
 * @param item
 */
export const floatFormat = (item) => {
  let result: any = null;
  if (!item && item !== 0) {
    return '-';
  }
  const type: number = Number.parseFloat(item);
  const bol: boolean = Number.isNaN(type);
  if (bol) {
    result = item;
    return result;
  }
  const num1: number = type.toFixed(2);
  const str: string = `${num1}`;
  if (str.length <= 3) {
    return str;
  }
  const pointer = str.split('.')[1];
  const str1 = str.split('.')[0];
  const arr = str1.split('');
  const arr1 = arr.slice(0);
  let i = 1;
  for (let j = 0; j <= i; j += 1) {
    if ((i * 3) < arr.length) {
      arr1.splice(arr.length - (3 * i), 0, ',');
      i += 1;
    }
  }
  if (pointer) {
    arr1.push('.');
    arr1.push(pointer);
  }
  result = arr1.join('');
  return result;
};

export const dateToFormat = (date, format = 'YYYY-MM-DD') => {
  if (date && typeof (date) === 'string') {
    console.log('string')
    return moment(date).format(format);
  }
  if (date && typeof (date) === 'number') {
    const handleDate = date * 1000;
    return moment(handleDate).format(format);
  }
  return '-';
}
/**
 * 数组根据某个对象的值去重
 * @param arr
 * @param val
 */
export const getArraySum = (arr, field) => {
  let sum = 0;
  if (Array.isArray(arr) && arr.length > 0) {
    arr.forEach(item => {
      sum += item[field];
    })
  }
  return sum;
};

// 节流
export const throttle = (fn, Interval) => {

  // 定时器；
  let last = 0;
  return function() {
    // 保存上下文的this
    let context = this;
    // 保存传入的参数
    let args = arguments;
    // 保存调用时的时间;
    let now = + new Date;
    // 判断上一次调用时间和当前调用时间对比
    if (now - last > Interval) {
      // 更新最后一次调用时间;
      last = now;
      fn.apply(context, args);
    }
  };
};

