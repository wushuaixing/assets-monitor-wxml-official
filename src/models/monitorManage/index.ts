import {
  getObligorListUrl,
  getOpenPushUrl,
  getClosePushUrl,
  getBusinessListUrl,
  getBusinessDetailUrl,
  getBusinessDeleteUrl,
  getBusinessSaveUrl,
  getBusinessEditUrl,
  getBusOpenPushUrl,
  getBusClosePushUrl
} from "../../services/monitorManage";

export default {
  namespace: 'monitorManage',
  state: {
    curClickItem: '',
    isDeleteOpendModal: false,
    deleteId: ''
  },
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
    * getCurClickItem({payload}, {put}) {
      yield put({type: 'getCurClickItemrSuccess', payload: payload.curClickItem});
    },
    * getIsDeleteOpendModal({payload}, {put}) {
      console.log('payload===', payload)
      const params = {
        deleteId: payload.deleteId,
        isDeleteOpendModal: payload.isDeleteOpendModal
      }
      yield put({type: 'getIsDeleteOpendModalSuccess', payload:params});
    },
    * getBusinessDelete({payload}, {call}) {
      const res = yield call(getBusinessDeleteUrl, payload);
      return res;
    },
    * getBusinessSave({payload}, {call}) {
      const res = yield call(getBusinessSaveUrl, payload);
      return res;
    },
    * getBusinessEdit({payload}, {call}) {
      const res = yield call(getBusinessEditUrl, payload);
      return res;
    },
    * getBusOpenPush({payload}, {call}) {
      const res = yield call(getBusOpenPushUrl, payload);
      return res;
    },
    * getBusClosePush({payload}, {call}) {
      const res = yield call(getBusClosePushUrl, payload);
      return res;
    },
  },
  reducers: {
    getCurClickItemrSuccess: (state, {payload}) => {
      return {
        ...payload,
        ...state,
        curClickItem: payload
      }
    },
    getIsDeleteOpendModalSuccess: (state, {payload}) => {
      console.log('52payload', payload)
      return {
        ...payload,
        ...state,
        isDeleteOpendModal: payload.isDeleteOpendModal,
        deleteId: payload.deleteId
      }
    },
  }
};
