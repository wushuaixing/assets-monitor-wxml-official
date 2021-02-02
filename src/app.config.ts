export default {
  pages: [
    "pages/index/index",
    "pages/monitor/index",
    "pages/search/index",
    "pages/user/index",
    "pages/demo/index"
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        iconPath         : "./assets/img/tab-bar/home.png",
        selectedIconPath : "./assets/img/tab-bar/home-active.png",
        pagePath: "pages/index/index",
        text: "首页"
      },
      {
        iconPath         : "./assets/img/tab-bar/monitor.png",
        selectedIconPath : "./assets/img/tab-bar/monitor-active.png",
        pagePath: "pages/monitor/index",
        text: "监控"
      },
      {
        iconPath         : "./assets/img/tab-bar/search.png",
        selectedIconPath : "./assets/img/tab-bar/search-active.png",
        pagePath: "pages/search/index",
        text: "搜索"
      },
      {
        iconPath         : "./assets/img/tab-bar/user.png",
        selectedIconPath : "./assets/img/tab-bar/user-active.png",
        pagePath: "pages/user/index",
        text: "我的"
      }
    ],
    color: "#7D8699",
    selectedColor: "#1C80E1",
    backgroundColor: "#FFFFFF",
  },
  "usingComponents": {},
}
