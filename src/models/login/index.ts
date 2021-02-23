import { getOpenIdUrl, getSmsUrl,getLoginPreCheckUrl,getPasswordLoginUrl,getSmsLoginUrl,getAuthRuleUrl } from "../../services/login";

export default {
  namespace: 'login',
  state: {
    accountNumber:''
  },
  effects: {
    *getOpenId({ payload }, { call, put }) {
      const res = yield call(getOpenIdUrl, payload);
      return res;
      // yield put({type: 'getOpenIdSuccess', payload: res});
    },
    *getSms({ payload }, { call }) {
      const res = yield call(getSmsUrl, payload);
      return res;
    },
    *getLoginPreCheck({ payload }, { call }) {
      const res = yield call(getLoginPreCheckUrl, payload);
      return res;
    },
    *getPasswordLogin({ payload }, { call }) {
      const res = yield call(getPasswordLoginUrl, payload);
      return res;
    },
    *getSmsLogin({ payload }, { call }) {
      const res = yield call(getSmsLoginUrl, payload);
      return res;
    },
    *getAuthRule({},{ call }) {
      const res = yield call(getAuthRuleUrl);
      return res;
    },
    *getAccountNumber({ payload },{put}) {
      yield put({type: 'getAccountNumberSuccess', payload: payload.accountNumber});
    },
  },
  reducers: {

    getAccountNumberSuccess: (state,{ payload }) =>{
      return{
        ...payload,
        ...state,
        accountNumber:payload
      }
    }
  }
};
