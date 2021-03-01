import { currentOrganizationApi, assetApi, riskApi } from '../../services/home';
import { isRule, filterArray } from '../../utils/tools/common';

export default {
  namespace: 'home',
  state: {
    businessCount: 0,
    assetsArray: [
      { id: 1, name: '资产拍卖', num: 0, isRule: false, icon: 'icon-auction'},
      { id: 2, name: '代位权', num: 0, isRule: false, icon: 'icon-subrogation'},
    ],
    riskArray: [
      { id: 1, name: '破产重整', num: 0, isRule: false, icon: 'icon-bankruptcy'},
      { id: 2, name: '涉诉', num: 0, isRule: false, icon: 'icon-litigation'},
    ],
    starLevelCounts: [
      {starLevel: 90, starLevelCount: 0},
      {starLevel: 80, starLevelCount: 0},
      {starLevel: 60, starLevelCount: 0},
      {starLevel: 40, starLevelCount: 0},
    ],
  },
  effects: {
    *getCurrentOrganization({ payload }, { call, put }) {
      const res = yield call(currentOrganizationApi, payload);
      yield put({ type: 'updateState', payload: {businessCount: res.data.businessCount} });
    },

    *getAssets({ payload }, {all, call, put }) {
      const res = yield call(assetApi, payload);
      yield put({ type: 'updateAssets', payload: {
        auctionCount: res.data.auctionCount,
        subrogationCount: res.data.subrogationCount,
      }});
      yield put({ type: 'updateAssetsStarLevel', payload: {
          starLevelCounts: res.data.starLevelCounts
        }});
    },

    *getRisk({ payload }, {all, call, put }) {
      const res = yield call(riskApi, payload);
      yield put({ type: 'updateRisk', payload: {
          bankruptcyCount: res.data.bankruptcyCount,
          lawsuitCount: res.data.lawsuitCount,
      }});
      yield put({ type: 'updateRiskStarLevel', payload: {
          starLevelCounts: res.data.starLevelCounts,
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
      newRiskArrary[0].num = payload.bankruptcyCount ;
      newRiskArrary[0].isRule = isRule('fxjkqypccz');
      newRiskArrary[1].num = payload.lawsuitCount;
      newRiskArrary[1].isRule = isRule('fxjkssjk');
      return {
        ...state,
        riskArray: filterArray([...newRiskArrary]),
      }
    },

    updateAssetsStarLevel(state, {payload}: { payload: any }): any {
      let assetsStar = [
        {starLevel: 90, starLevelCount: 0},
        {starLevel: 80, starLevelCount: 0},
        {starLevel: 60, starLevelCount: 0},
      ];
      payload.starLevelCounts.forEach(item => {
        if(item.starLevel === 90){
          assetsStar[0].starLevelCount = item.starLevelCount;
        }
        else if(item.starLevel === 80){
          assetsStar[1].starLevelCount = item.starLevelCount;
        }
        else if(item.starLevel === 60){
          assetsStar[2].starLevelCount = item.starLevelCount;
        }
      });
      return {
        ...state,
        starLevelCounts: [...assetsStar],
      }
    },

    updateRiskStarLevel(state, {payload}: { payload: any }): any {
      let riskStar = [
        {starLevel: 90, starLevelCount: 0},
        {starLevel: 80, starLevelCount: 0},
        {starLevel: 60, starLevelCount: 0},
        {starLevel: 40, starLevelCount: 0},
      ];
      payload.starLevelCounts.forEach(item => {
        if(item.starLevel === 90){
          riskStar[0].starLevelCount = item.starLevelCount;
        }
        else if(item.starLevel === 80){
          riskStar[1].starLevelCount = item.starLevelCount;
        }
        else if(item.starLevel === 60){
          riskStar[2].starLevelCount = item.starLevelCount;
        }
        else{
          riskStar[3].starLevelCount = item.starLevelCount;
        }
      });
      return {
        ...state,
        starLevelCounts: [...riskStar],
      }
    },
  }
}
