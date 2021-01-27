import home from './home/index';
// appid: wx41313c1ef02c5cd3
// var testApiRoot = 'https://wechatdev.yczcjk.com/';
// export var base = 'https://wechatdev.yczcjk.com/';
export var base = 'https://wechat.yczcjk.com/';


export default {
  home: home(base),
}


console.log('home === ', home(base));
