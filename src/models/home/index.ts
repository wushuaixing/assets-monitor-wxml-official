import { currentOrganizationApi, assetApi, riskApi } from '../../services/home';
import { handleDealAuthRule } from '../../utils/tools/common';
import { getAuthRuleUrl } from "../../services/login";
import { setGlobalData } from "../../utils/const/global";

// 资产/风险类型 1：资产拍卖 2：代位权-立案 3：代位权-开庭 4：代位权-裁判文书 5：破产重组 6：涉诉-立案 7：涉诉-开庭 8：涉诉-裁判文书
export default {
  namespace: 'home',
  state: {
    monitorParams: {},
  },
  effects: {
    *getCurrentOrganization({ payload }, { call, put }) {
      const res = yield call(currentOrganizationApi, payload);
      return res;
    },

    *getAuthRule({}, {call}) {
      const res = yield call(getAuthRuleUrl);
      if(res.code === 200 ){
        setGlobalData('ruleArray', handleDealAuthRule(res.data.orgPageGroups));
      }
      return res;
    },


    *getAssets({ payload }, {all, call, put }) {
      const res = yield call(assetApi, payload);
      return res;
    },

    *getRisk({ payload}, {all, call, put }) {
      const res = yield call(riskApi, payload);
      return res;
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    updateMonitorParams(state, { payload }) {
      let newParmas = {...state.monitorParams, ...payload.params};
      return {
        ...state,
        monitorParams: {...newParmas},
      }
    },
  }
}
