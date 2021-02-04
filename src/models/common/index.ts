// import { getRule } from "../common";

export default {
  namespace: 'common',
  state: {
    tabField: 'index',
    currentPage: '/pages/index/index',
  },
  effects: {
    // *authRule({ payload }, {all, call, put }) {
    //   const res = yield call(getRule, payload);
    //   console.log('getJsSession res === ', res);
    //   // yield put({type: 'saveCatalog', payload: res});
    // },
  },
  reducers: {

    updateState: (state, { payload }) => {
      return{
        ...state,
        ...payload,
      }
    },

  }
};
