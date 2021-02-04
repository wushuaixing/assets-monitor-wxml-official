interface globalType {
  tabName?: string,
  setGlobalData?: number
}

const globalData: globalType = {};

export function setGlobalData (key, val) {
  globalData[key] = val
}

export function getGlobalData (key) {
  return globalData[key]
}
