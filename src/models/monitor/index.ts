import { assetListApi, assetListCountApi, riskListApi, riskListCountApi, auctionMarkReadApi, subrogationTrialMarkReadApi,
subrogationCourtMarkReadApi, subrogationJudgmentMarkReadApi, bankruptcyMarkReadApi, lawsuitTrialMarkReadApi, lawsuitCourtMarkReadApi, lawsuitJudgmentMarkReadApi } from '../../services/monitor';
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

    *auctionMarkRead({ payload }, {all, call, put }) {
      const res = yield call(auctionMarkReadApi, {...clearEmpty(payload)});
      return res;
    },
    //
    // *subrogationTrialMarkRead({ payload }, {all, call, put }) {
    //   const res = yield call(subrogationTrialMarkReadApi, {...clearEmpty(payload)});
    //   return res;
    // },
    //
    // *subrogationCourtMarkRead({ payload }, {all, call, put }) {
    //   const res = yield call(subrogationCourtMarkReadApi, {...clearEmpty(payload)});
    //   return res;
    // },
    //
    // *subrogationJudgmentMarkRead({ payload }, {all, call, put }) {
    //   const res = yield call(subrogationJudgmentMarkReadApi, {...clearEmpty(payload)});
    //   return res;
    // },
    //
    // *bankruptcyMarkRead({ payload }, {all, call, put }) {
    //   const res = yield call(bankruptcyMarkReadApi, {...clearEmpty(payload)});
    //   return res;
    // },
    //
    // *lawsuitTrialMarkRead({ payload }, {all, call, put }) {
    //   const res = yield call(lawsuitTrialMarkReadApi, {...clearEmpty(payload)});
    //   return res;
    // },
    //
    // *lawsuitCourtMarkRead({ payload }, {all, call, put }) {
    //   const res = yield call(lawsuitCourtMarkReadApi, {...clearEmpty(payload)});
    //   return res;
    // },
    //
    // *lawsuitJudgmentMarkReadApi({ payload }, {all, call, put }) {
    //   const res = yield call(lawsuitJudgmentMarkReadApi, {...clearEmpty(payload)});
    //   return res;
    // },
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
