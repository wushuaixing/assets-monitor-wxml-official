import { assetListApi, assetListCountApi, riskListApi, riskListCountApi} from '../../services/monitor';
import {getUserInfoUrl} from "../../services/user";

export default {
  namespace: 'monitor',
  state: {
    count: 12,
    list: [],
    assetsList: [],
    riskList: [],
  },
  effects: {
    *assetList({ payload }, { call, put}) {
      const res = yield call(assetListApi, payload);
      console.log('res === ', res);
      const { data } = res;
      if(res.code === 200){
        yield put({ type: 'updateList', payload: res.data.list });
      }
    },
    *assetListCount({}, {all, call, put }) {
      const res = yield call(assetListCountApi, );
      return res;
    },

    *riskList({}, {all, call, put }) {
      const res = yield call(riskListApi, );
      return res;
    },

    *riskListCount({}, {all, call, put }) {
      const res = yield call(riskListCountApi, );
      return res;
    },
  },
  reducers: {
    updateState(state, { payload }) {
      console.log('payload === ', payload);
      return {
        ...state,
        ...payload,
      }
    },
  },
  updateList(state, {payload}){
    console.log('payload === ', payload);
    return {
      ...state,
      ...payload,
    }
  },
}
