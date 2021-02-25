import {getGlobalData} from "../const/global";
// 按需加载，里面的函数用到的时候再加进去

// 标准时间转年月日
export const formatDateTime = (date: any, onlyYear: boolean) => {
  const data: Date = new Date(date && date * 1000);
  const y = data.getFullYear();
  let m : number | string = data.getMonth() + 1;
  m = m < 10 ? (`0${m}`) : m;
  let d: number | string = data.getDate();
  d = d < 10 ? (`0${d}`) : d;
  let h: number | string = data.getHours();
  h = h < 10 ? (`0${h}`) : h;
  let minute: number | string = data.getMinutes();
  minute = minute < 10 ? (`0${minute}`) : minute;
  if (typeof date === 'number' && date === 0)return '1970-01-01 00:00';
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
  if (param == null)return '';
  let paramStr: string = '';
  const t = typeof (param);
  if (t === 'string' || t === 'number' || t === 'boolean') {
    paramStr += `&${key}=${(encode == null || encode) ? encodeURIComponent(param) : param}`;
  }else {
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
  const $chars: string = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
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

export const isRule = (rule) =>  {
  let ispermission: number = 0;
  let ruleArray: string[] = getGlobalData('ruleArray');
  if(ruleArray && ruleArray.length > 0 ){
    if(Array.isArray(rule) && rule.length > 0){
      rule.forEach(item => {
        ispermission = ruleArray.includes(item) ? ispermission + 1 : ispermission
      });
      return ispermission > 0
    }
    else {
      return ruleArray.includes(rule)
    }
  }
  else {
    return false
  }
};

/**
 *
 * @param ruleArray
 */
export const filterArray = (ruleArray) => {
  let array: {isRule: boolean}[] = [];
  ruleArray.forEach(item => {
    if(item.isRule){
      array.push(item);
    }
  });
  return array;
};
