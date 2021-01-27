
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

/* 填写数据
 * 如果没有填写默认值
 * {[propName: string] : string} string类型键值键名的对象 */
export const w = (v: string = '', option: {[propName: string] : string}) => {
  const { prefix = '', suffix = '', mark = '' } = option || {};
  const value = (v + '').trim();
  if (value)return `${prefix}${value}${suffix}`;
  return value || mark || global.Default_Value;
};

/* 案件类型 */
export const getCaseType = (source : {[propName: string] : any}): string => {
  const { isRestore, caseType } = source || {};
  if (isRestore)return '执恢案件';
  if (caseType === 1)return '普通案件';
  if (caseType === 2)return '破产案件';
  if (caseType === 3)return '执行案件';
  if (caseType === 4)return '终本案件';
  if (typeof caseType === 'string')return caseType;
  return global.Default_Value;
};

// 获得输入框中字符长度
export const getByteLength = (val: any): number => {
  const str = String(val);
  let bytesCount: number = 0;
  for (let i = 0, n = str.length; i < n; i += 1) {
    const c = str.charCodeAt(i);
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      bytesCount += 1;
    }else {
      bytesCount += 2;
    }
  }
  return bytesCount;
};
/**
 * 截取前N个字节的字符串
 * @param str
 * @param len
 * @param suffix
 * @returns {*}
 */
export const toCutString = (str: string, len: number, suffix: string): string => {
  if (!str)return '';
  if (len <= 0)return '';
  if (getByteLength(str) <= len)return str;
  const _suffix: string = suffix || '';
  let template: number = 0;
  for (let i: number = 0; i < str.length; i += 1) {
    if (str.charCodeAt(i) > 255) {
      template += 2;
    }else {
      template += 1;
    }
    if (template === len) {
      return str.substring(0, i + 1) + _suffix;
    }if (template > len) {
      return str.substring(0, i) + _suffix;
    }
  }
  return str;
};

export  const randomStr = (length: number): string => {
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
 * 去除对象中空值
 * @param obj
 * @returns {*}
 */
export const clearEmpty = (obj : any): any => {
  if (typeof obj === 'object') {
    const l: any[] = Object.keys(obj);
    const _obj: object = Object.assign({}, obj);
    l.forEach((item) => {
      if (_obj[item] === '' || _obj[item] === undefined)delete _obj[item];
      else if (typeof _obj[item] === 'string')_obj[item] = _obj[item].replace(/^\s+|\s+$/g, '');
    });
    return _obj;
  }
  return obj;
};
// @ts-ignore
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

// 金额三位添加小数点
export const toThousands = (value: any): string => {
	const number: number = Number(value);
  return number.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
};

// 防抖
export const debounce = (fn, delay: number) => {
  // 定时器；
  let timer: any = null;
  return function() {
    // 保存上下文的this
    let context = this;
    // 保存传入的参数
    let args = arguments;
    // 每次调用前都清空定时器
    if (timer) {
      clearTimeout(timer);
    }
    // 去设立一个新的定时器
    timer = setTimeout (function() {
      fn.apply(context, args);
    }, delay);
  };
};

// 节流
export const throttle = (fn, Interval: number) => {

  // 定时器；
  let last: number = 0;
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
