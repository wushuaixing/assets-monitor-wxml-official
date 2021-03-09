interface globalType {
  tabName?: string,
  openId?: string,
  statusBarHeight?: number,
  statusRailHome?: number,
  systemAuthRule?: any,
  systemRoleType?: any,
  weChatCode?: string,
  ruleArray?: string[]
  serviceWeChat?: string
  starId: number
  tabId?: number
  screenHeight?: number
}

const globalData: globalType = {};

export function setGlobalData (key, val) {
  globalData[key] = val
}

export function getGlobalData (key) {
  return globalData[key]
}
