import {getObligorListUrl,getOpenPushUrl,getClosePushUrl,getBusinessListUrl,getBusinessDetailUrl} from "../../services/monitorManage";

export default {
  namespace: 'monitorManage',
  state: {},
  effects: {
    * getObligorList({payload}, {call}) {
      const res = yield call(getObligorListUrl, payload);
      return res;
    },
    * getOpenPush({payload}, {call}) {
      const res = yield call(getOpenPushUrl, payload);
      return res;
    },
    * getClosePush({payload}, {call}) {
      const res = yield call(getClosePushUrl, payload);
      return res;
    },
    * getBusinessList({payload}, {call}) {
      const res = yield call(getBusinessListUrl, payload);
      return res;
    },
    * getBusinessDetail({payload}, {call}) {
      const res = yield call(getBusinessDetailUrl, payload);
      return res;
    },
  },
  reducers: {}
};
