import { assetListApi, assetListCountApi, riskListApi, riskListCountApi} from '../../services/monitor';

export default {
  namespace: 'monitor',
  state: {
    count: 0,
    params : {},
    assetsList: [],
    riskList: []
  },
  effects: {
    *assetList({ payload }, { call, put}) {
      yield put({ type: 'paramsUpdate', payload, });
      const res = yield call(assetListApi, payload);
      if(res.code === 200){
        yield put({ type: 'updateAssetsList', payload: res.data.list });
      }
    },
    *assetListCount({ payload }, { call, put }) {
      const res = yield call(assetListCountApi, payload );
      if(res.code === 200){
        yield put({ type: 'updateCount', payload: res.data });
      }
    },

    *riskList({payload}, {all, call, put }) {
      yield put({ type: 'paramsUpdate', payload, });
      const res = yield call(riskListApi, payload);
      if(res.code === 200){
        yield put({ type: 'updateRiskList', payload: res.data.list });
      }
      if(payload.score){
        yield put({ type: 'paramsUpdate', payload });
      }
    },

    *riskListCount({ payload }, {all, call, put }) {
      const res = yield call(riskListCountApi, payload);
      if(res.code === 200){
        yield put({ type: 'updateCount', payload: res.data });
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    updateAssetsList(state, { payload }) {
      return {
        ...state,
        assetsList: [...payload]
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
        count: payload,
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
