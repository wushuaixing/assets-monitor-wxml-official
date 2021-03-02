import { assetListApi, assetListCountApi, riskListApi, riskListCountApi} from '../../services/monitor';
import { clearEmpty } from '../../utils/tools/common';

export default {
  namespace: 'monitor',
  state: {
    num: 10,
  },
  effects: {
    *assetList({ payload }, { call }) {
      const res = yield call(assetListApi, { ...clearEmpty(payload), num: 10});
      return res;
    },
    *assetListCount({ payload }, { call }) {
      const res = yield call(assetListCountApi, {...clearEmpty(payload)} );
      return res;
    },

    *riskList({payload}, { call, put }) {
      const res = yield call(riskListApi, {...clearEmpty(payload), num: 10});
      return res;
    },

    *riskListCount({ payload }, {all, call, put }) {
      const res = yield call(riskListCountApi, {...clearEmpty(payload)});
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

    updateRiskList(state, { payload }) {
      return {
        ...state,
        riskList: [...payload]
      }
    },
    updateCount(state, { payload }) {
      return {
        ...state,
        listCount: payload,
      }
    },

    // 更新请求参数的集合
    paramsUpdate(state, { payload }) {
      return {
        ...state,
        params: {...state.params, ...payload}
      }
    },
  },

}
