import { getUserInfoUrl,getAdviceUrl } from "../../services/user";

export default {
  namespace: 'user',
  state: {
    count:12
  },
  effects: {
    *getUserInfo({ payload }, { call }) {
      const res = yield call(getUserInfoUrl, payload);
      return res;
    },
    *getAdvice({ payload }, { call }) {
      const res = yield call(getAdviceUrl, payload);
      return res;
    },
  },
  reducers: {
  }
};
