export default {
  pages: [
    "pages/index/index",
    "pages/monitor/index",
    "pages/search/index",
    "pages/user/index",
    "pages/default-page/index",
    "pages/user/feedBack/index",
  ],
  subpackages:[
    {
      root:'subpackage/pages/',
      pages:[
        "monitor/asset-auction/index",
        "monitor/asset-auction/detail/index",
        "monitor/asset-auction/confirmation/index",
        "monitor/bankruptcy/index",
        "monitor/bankruptcy/details/index",
        "monitor/subrogation/index",
        "monitor/involve-info/index",
        "monitorManage/index",
        "monitorManage/businessDetail/index",
        "monitorManage/addBusiness/index",
        "rule-description/index",
        "restoreHtml/index",
        "monitorManage/obligorDetail/index",
      ]
    },
    {
      root:'pages/loginAgency/',
      pages:[
        "index",
        "auth-code/index"
      ]
    }
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
    // custom: true,
    borderStyle: 'white',
    color: "#7D8699",
    selectedColor: "#1C80E1",
    backgroundColor: "#FFFFFF",
  },
  "usingComponents": {},
  entryPagePath:'pages/default-page/index', // 指定小程序的默认启动路径
}
