## 一、项目介绍

#### 背景
 资产监控平台移动端产品，基于微信使用的微信小程序

#### 进度
当前版本迭代是第一版，页面代码逻辑开发中

#### 人员
+ 产品: 张犇
+ 前端: 刘娜，武帅兴，张露露，袁鲁斌
+ 后端: 雷有裕，夏浩磊，周赛
+ UI: 杨统博
+ 测试: 卢祥

## 二、项目相关信息
#### 1、相关文档地址

+ 代码仓库管理使用的是git，以及gitLab管理工具
http://172.18.255.9:8280/fontend/assets/assets-monitor-wxml.git

+ 需求文档
https://www.tapd.cn/32583197/documents/show/1132583197001000141?file_type=word

+ 设计稿（蓝湖）地址
https://lanhuapp.com/web/#/item/project/stage?pid=9d12e55e-be47-4bac-bf67-a4571def16ab

+ icon地址
https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=2364316&keyword=&project_type=&page=

+ 接口文档 *在输入框输入对应的迭代版本号查询对应的接口信息*
http://172.18.255.251:18080/doc.html

#### 2、项目环境
+ 环境管理  
当前相关环境，共有两个环境。分别是测试环境（开发环境）、线上环境。 配置文件地址：assets-monitor-wxml\src\utils\config\index.ts，如果地址是https://wechatdev.yczcjk.com 是测试环境，https://wechat.yczcjk.com就是线上环境。

+ 分支管理   
目前开发分支是dev分支

#### 3、上传流程  
资产监控平台-小程序应用，是部署在微信云端的服务，需要通过“微信开发者工具”，以及，微信小程序相关账户权限。
+ 测试流程
<ol>
<li>在编辑器里（webstorm）通过npm run build:weapp 打包会在根目录文件下生成dist文件</li>
<li>打开【微信开发者工具】，并打开该dist文件</li>
<li> 确认根目录下project.config.json文件中appid是否有误（或者在微信开发工具里面要配置好对应的appId，否则不会出现上传按钮）然后【工具】=>【上传】，输入版本号，以及项目备注，然后点击【上传】，等待结束。</li>
<li>登录微信公众平台，在右侧【管理】=>【版本管理】模块，开发版本里会发现，刚才上传的版本，右边下拉选中【选为体验版本】，提交测试。</li>
</ol>

+ 部署流程
<ol>
<li>在编辑器里（webstorm）通过npm run build:weapp 打包会在根目录文件下生成dist文件</li>
<li>打开【微信开发者工具】，并打开该dist文件</li>
<li> 确认根目录下project.config.json文件中appid是否有误（或者在微信开发工具里面要配置好对应的appId，否则不会出现上传按钮）然后【工具】=>【上传】，输入版本号，以及项目备注，然后点击【上传】，等待结束。</li>
<li>登录微信公众平台，在右侧【管理】=>【版本管理】模块，开发版本里会发现，刚才上传的版本，右边下拉选中【选为体验版本】，提交测试。</li>
<li>测试通过后，点击【提交审核】，弹框勾选后【下一步】，然后【继续提交】后会跳出新页面，填写好【版本描述】、【测试账号】(15225645956)【测试密码】(123456a)，审核加急默认【不加急】，然后【继续提交】会得到一个通知。回到【版本管理】，在【审核版本】看到刚才提交的版本。</li>
<li>待审核通过，点击右边下拉，选择【提交发布】，并选择【一次性推送】，扫码确认后就可以发布小程序。</li>
</ol>

## 三、项目技术文档

#### 1、基础框架
项目隶属于微信小程序，但是并没有使用官方的语法库，采用的第三方库Taro@3.0.24（Taro 是一套遵循 React 语法规范的多端开发解决方案。），进行编写，由Taro自带工具进行转化输出为WXML标签语言，从而构建页面。Taro参仿的是React的语法规则，常规的写法与React没有差别，但受限于WXML的语法，以及微信的环境规则，需要做一个适配性的配置，以及一些微信运行的基本要求（详情参考Taro官网）。配套的选择了UI组件库taro-ui@3.0.0，在此框架上又引入了dva，基于redux封装，目的是为了跨模块和跨页面的时候一些数据可以共享。

####2、分包加载

+ 2.1 项目结构  

│  .editorconfig  
│  .eslintrc  
│  .gitignore  
│  .npmrc  
│  babel.config.js  
│  global.d.ts  
│  package-lock.json  
│  package.json  
│  project.config.json  
│  README.md  
│  tsconfig.json  
│  yarn.lock  
│  
├─.idea  
│      .gitignore  
│      assets-monitor-wxml.iml  
│      misc.xml  
│      modules.xml  
│      vcs.xml  
│      workspace.xml  
│      
├─config  
│      dev.js  
│      index.js  
│      prod.js  
│      
├─dist // 生成的wxml文件
│                  
└─src  
    │  app.config.ts  
    │  app.scss  
    │  app.tsx  
    │  dva.ts  
    │  index.html  
    │    
    ├─assets  
    │  ├─css  
    │  │  │  configuration.scss  
    │  │  │  custom-variables.scss  
    │  │  │    
    │  │  └─font  
    │  │          iconfont.css  
    │  │          iconfont.eot  
    │  │          iconfont.svg  
    │  │          iconfont.ttf  
    │  │          iconfont.woff  
    │  │          iconfont.woff2  
    │  │            
    │  └─img  
    │                
    ├─components  
    │  ├─conditions  
    │  ├─form-item  
    │  ├─home-tab  
    │  ├─line-choose  
    │  ├─list  
    │  ├─list-item  
    │  ├─multiple-form  
    │  ├─navigation-bar  
    │  ├─query-drop  
    │  ├─single-selected  
    │  ├─tab  
    │  ├─tag-group  
    │  └─tag-selected  
    ├─config  
    ├─custom-tab-bar  
    ├─models  
    │  ├─common  
    │  ├─home  
    │  ├─login  
    │  ├─monitor  
    │  ├─monitorManage  
    │  ├─query-drop  
    │  └─user  
    │            
    ├─pages  
    │  ├─default-page  
    │  ├─index  
    │  ├─loginAgency  
    │  │  ├─account-invalid  
    │  │  ├─auth-code  
    │  │  └─image-code  
    │  ├─monitor  
    │  ├─search  
    │  └─user  
    │      └─feedBack    
    ├─services  
    │  ├─common  
    │  ├─home  
    │  ├─login  
    │  ├─monitor  
    │  │  └─bankruptcy  
    │  │          announcement.tsx  
    │  ├─monitorManage  
    │  ├─request  
    │  └─user  
    ├─subpackage  
    │  └─pages  
    │      ├─monitor  
    │      │  ├─asset-auction  
    │      │  │  ├─confirmation  
    │      │  │  └─detail  
    │      │  ├─bankruptcy  
    │      │  │  └─details  
    │      │  ├─involve-info  
    │      │  └─subrogation  
    │      ├─monitorManage  
    │      │  ├─addBusiness  
    │      │  ├─businessDetail  
    │      │  ├─businessListItem  
    │      │  ├─deleteModal  
    │      │  └─obligorDetail  
    │      │      ├─assetsRisk  
    │      │      ├─baseInfo  
    │      │      └─relationBusiness  
    │      └─rule-description  
    └─utils  
        ├─config  
        ├─const  
        │      global.ts  
        │      monitor.ts  
        │      status.ts  
        ├─encrypt  
        │      base64.js  
        │      des.js  
        │      index.js  
        │      jsencrypt.min.js  
        └─tools  
                common.ts  
+ 2.2 分包加载  
  
  关于小程序分包问题，由于官网限定了小程序代码包总大小（未使用分包时）不得大于2M，如果采用分包，则单个分包/主包大小不得大于2M，且所有包总和不得大于20M。项目中关于分包的配置，详见【/src/app.config.ts】（参考地址）。  
  为什么采取分包机制，Taro转译后的ts文件里，会加入自定义的生命周期标准，导致转译后的文件容量变大。其次，还有附带的npm库，也是让主包量变大的原因。
  
+ 2.3 主要模块  

| 路径        |主要内容 |  
| --------    | ----- |
| /pages/ (主包) | 放置了小程序加载首次需要的所有文件， 包括了公共组件、插件库、静态文件、首页模块、以及一些通用模块。 由于分包之间无法共用资源，所以共用资源会被打包进主包。 |
| /subpackage/ |放置了所有查询模块的查询页，每个模块的详情页以及关联页面；以及债务人模块|

#### 3、公共组件
##### 公共组件路径 /src/components：  

| 路径  | 主要内容 |  备注 |
| -------- | ----- | ---- |
|navigation-bar| 自定义的导航条| 基本上所有的页面都会用到这个自定义的导航条，会兼容ios 和 安卓，让标题居中和渐变 |
|list-item | 监控页的列表展示 | 每一种数据类型的展示公用这个组件 |

#### 4、相关注意事项
+ 如果当前组件是页面的话，需要使用类（class）组件，子组件没有太多交互的使用函数式组件
+ 页面tab之间切换，只会第一次触发 componentWillMount，之后的每一次都会触发componentDidShow，
+ 子组件更新（非页面组件），通过componentWillReceiveProps可以获取到最新值，配合shouldComponentUpdate来进行页面的渲染。

## 四、版本迭代
| 版本  | 更新内容 |  Tag | 上线时间| 备注|
| -------- | ----- | ---- | ---- | ---- |
|V2.0| 小程序创建，第一版内容 | 2.0 | 20210310| - |
|V2.1| 部分交互优化，html还原，债务人详情和相关数据展示 | 2.1 |  ？ |当前版本  |

#### 遇到的问题以及解决方案
| 序号  | 所属版本 |  问题描述 | 解决方案|
| -------- | ----- | ---- | ---- |
|1|-| - | - |
|2|-|-  | - |





