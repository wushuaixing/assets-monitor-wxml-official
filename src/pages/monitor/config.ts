import {getGlobalData} from "../../utils/const/global";
import {isRule} from "../../utils/tools/common";

/**
 * tabId 和starId id分别对应的score值
 * @param tabId
 * @param starId
 */
const getStarValue = (tabId: number, starId: number) => {
  let star: number | undefined = undefined;
  if (tabId === 1) {
    switch (starId) {
      case 1:
        star = undefined;
        break;
      case 2:
        star = 90;
        break;
      case 3:
        star = 80;
        break;
      case 4:
        star = 60;
        break;
    }
  } else {
    switch (starId) {
      case 1:
        star = undefined;
        break;
      case 2:
        star = 90;
        break;
      case 3:
        star = 80;
        break;
      case 4:
        star = 60;
        break;
      case 5:
        star = 40;
        break;
    }
  }
  return star;
};

// 资产/风险类型 1：资产拍卖 2：代位权-立案 3：代位权-开庭 4：代位权-裁判文书 5：破产重组 6：涉诉-立案 7：涉诉-开庭 8：涉诉-裁判文书
/**
 * 返回权限类型映射的assetAndRiskType值
 * @param rule
 */
const getRuleValue = (rule) => {
  let array: string[] = [];
  switch (rule) {
    case 'zcwjzcpm':
      array = ['1'];
      break;
    case 'zcwjdwq':
      array = ['2', '3', '4'];
      break;
    case 'fxjkqypccz':
      array = ['5'];
      break;
    case 'fxjkssjk':
      array = ['6', '7', '8'];
      break;
  }
  return array;
};

/**
 * 返回权限类型映射的name显示值
 * @param rule
 */
const getRuleName = (rule) => {
  let title: string = '资产拍卖';
  switch (rule) {
    case 'zcwjzcpm':
      title = '资产拍卖';
      break;
    case 'zcwjdwq':
      title = '代位权';
      break;
    case 'fxjkqypccz':
      title = '破产重整';
      break;
    case 'fxjkssjk':
      title = '涉诉信息';
      break;
  }
  return title;
};

/**
 * 过滤有权限的数据类型值
 * @param rule
 */
const filterArray = (rule) => {
  let ruleArray: string[] = getGlobalData('ruleArray');
  let resultArray: string[] = [];
  if (ruleArray && ruleArray.length > 0) {
    rule.forEach(item => {
      if (ruleArray.includes(item)) {
        resultArray = [...resultArray, ...getRuleValue(item)]
      }
    });
    return resultArray;
  } else {
    return []
  }
};

const getUpdateRuleConfig = (config) => {
  let conditions = [...config[1].conditions];
  let newConditions = [];
  conditions.forEach(item => {
    let newChildrenName = [];
    let {childrenName} = item;
    childrenName.forEach(it => {
      if (isRule(it.isRule)) {
        newChildrenName.push({...it, value: filterArray(it.value), isRule: isRule(it.isRule)})
      }
    });
    newConditions.push({...item, childrenName: [...newChildrenName]});
  });
  config[1].conditions = newConditions;
  console.log('config === ', config);
  return [...config];
};

export {
  getStarValue,
  getRuleName,
  getRuleValue,
  filterArray,
  getUpdateRuleConfig,
}
