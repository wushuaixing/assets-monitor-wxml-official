interface globalType {
  tabName?: string,
  openId?: string,
  statusBarHeight?: number,
  statusRailHome?: number,
  systemAuthRule?: any,
  systemRoleType?: any,
  weChatCode?: string,
}

const globalData: globalType = {};

export function setGlobalData (key, val) {
  globalData[key] = val
}

export function getGlobalData (key) {
  return globalData[key]
}
