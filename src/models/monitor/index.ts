import { assetListApi, assetListCountApi, riskListApi, riskListCountApi} from '../../services/monitor';

export default {
  namespace: 'monitor',
  state: {
    num: 10,
  },
  effects: {
    *assetList({ payload }, { call }) {
      const res = yield call(assetListApi, {...payload, num: 10});
      return res;
    },
    *assetListCount({ payload }, { call }) {
      const res = yield call(assetListCountApi, payload );
      return res;
    },

    *riskList({payload}, { call, put }) {
      const res = yield call(riskListApi, {...payload, num: 10});
      return res;
    },

    *riskListCount({ payload }, {all, call, put }) {
      const res = yield call(riskListCountApi, payload);
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
