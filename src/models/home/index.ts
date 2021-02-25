import { currentOrganizationApi } from '../../services/home';

export default {
  namespace: 'home',
  state: {
    businessCount: 0,
  },
  effects: {
    *getCurrentOrganization({ payload }, {all, call, put }) {
      const res = yield call(currentOrganizationApi, payload);
      yield put({ type: 'updateState', payload: {businessCount: res.data.businessCount} });
      console.log('res === ', res);
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  }
}
