import { currentOrganizationApi, assetApi, riskApi } from '../../services/home';
import { isRule, filterArray } from '../../utils/tools/common';

interface starLevelType{
  [propName: string]: number
}

export default {
  namespace: 'home',
  state: {
    businessCount: 0,
    assetsArray: [
      { id: 1, name: '资产拍卖', num: 11, isRule: false, icon: 'icon-auction'},
      { id: 2, name: '代位权', num: 11, isRule: false, icon: 'icon-subrogation'},
    ],
    riskArray: [
      { id: 1, name: '破产重整', num: 34, isRule: false, icon: 'icon-bankruptcy'},
      { id: 2, name: '涉诉', num: 66, isRule: false, icon: 'icon-litigation'},
    ],
    starLevel: {},
  },
  effects: {
    *getCurrentOrganization({ payload }, { call, put }) {
      const res = yield call(currentOrganizationApi, payload);
      yield put({ type: 'updateState', payload: {businessCount: res.data.businessCount} });
    },

    *getAssets({ payload }, {all, call, put }) {
      // const res = yield call(assetApi, payload);
      yield put({ type: 'updateAssets', payload: {
        auctionCount: 22,
        subrogationCount: 22,
      }});
      yield put({ type: 'updateAssetsStarLevel', payload: {
          starLevelCounts: [
            {starLevel: 3, starLevelCount: 121},
            {starLevel: 2, starLevelCount: 121},
            {starLevel: 1, starLevelCount: 121},
          ]
        }});
    },

    *getRisk({ payload }, {all, call, put }) {
      // const res = yield call(riskApi, payload);
      yield put({ type: 'updateRisk', payload: {
          bankruptcyCount: 22,
          lawsuitCount: 22,
      }});
      yield put({ type: 'updateRiskStarLevel', payload: {
          starLevelCounts: [
            {starLevel: 90, starLevelCount: 311},
            {starLevel: 80, starLevelCount: 311},
            {starLevel: 60, starLevelCount: 311},
            {starLevel: 40, starLevelCount: 311},
          ]
        }});

    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    updateAssets(state, { payload }) {
      let newAssetsArrary = [...state.assetsArray];
      newAssetsArrary[0].num = payload.auctionCount;
      newAssetsArrary[0].isRule = isRule('zcwjzcpm');
      newAssetsArrary[1].isRule = isRule('zcwjdwq');
      newAssetsArrary[1].num = payload.subrogationCount;
      return {
        ...state,
        assetsArray: filterArray([...newAssetsArrary]),
      }
    },

    updateRisk(state, { payload }) {
      let newRiskArrary = [...state.riskArray];
      newRiskArrary[0].num = payload.bankruptcyCount;
      newRiskArrary[0].isRule = isRule('fxjkqypccz');
      newRiskArrary[1].num = payload.lawsuitCount;
      newRiskArrary[1].isRule = isRule('fxjkssjk');
      return {
        ...state,
        riskArray: filterArray([...newRiskArrary]),
      }
    },

    updateAssetsStarLevel(state, {payload}: { payload: any }): any {
      let newStarLevel: starLevelType = {};
      payload.starLevelCounts.forEach((item) => {
        if(item.starLevel === 3){
          newStarLevel.threeStar = item.starLevelCount
        }
        else if(item.starLevel === 2){
          newStarLevel.twoStar = item.starLevelCount
        }
        else {
          newStarLevel.oneStar = item.starLevelCount
        }
      });
      return {
        ...state,
        starLevel: {...newStarLevel},
      }
    },

    updateRiskStarLevel(state, {payload}: { payload: any }): any {
      let newStarLevel: starLevelType = {};
      payload.starLevelCounts.forEach((item) => {
        if(item.starLevel === 90){
          newStarLevel.high = item.starLevelCount
        }
        else if(item.starLevel === 80){
          newStarLevel.warn = item.starLevelCount
        }
        else if(item.starLevel === 60){
          newStarLevel.tip = item.starLevelCount
        }
        else {
          newStarLevel.good = item.starLevelCount
        }
      });
      return {
        ...state,
        starLevel: {...newStarLevel},
      }
    },
  }
}
