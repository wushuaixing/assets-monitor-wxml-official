import { monitorListCount } from '../../services/monitor';

export default {
  namespace: 'monitor',
  state: {
    count: 12,
  },
  effects: {
    *getMonitorListCount({}, {all, call, put }) {
      const res = yield call(monitorListCount, );
      console.log('getJsSession res === ', res);
      // yield put({type: 'saveCatalog', payload: res});
    },
  },
  reducers: {
    // updateState(state, { payload }) {
    //   return {
    //     ...state,
    //     ...payload,
    //   }
    // },
  }
}
