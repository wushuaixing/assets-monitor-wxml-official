import { getJsSessionUrl } from '../../services/home';

export default {
  namespace: 'home',
  state: {
    count: 12,
  },
  effects: {
    *getJsSession({ payload }, {all, call, put }) {
      console.log('getJsSession payload === ', payload);
      const res = yield call(getJsSessionUrl, payload);
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
