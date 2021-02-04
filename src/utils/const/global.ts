interface globalType {
  tabName?: string
}

const globalData: globalType = {};

export function setGlobalData (key, val) {
  globalData[key] = val
}

export function getGlobalData (key) {
  return globalData[key]
}
