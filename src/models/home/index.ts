import { currentOrganizationApi, assetApi, riskApi } from '../../services/home';
import { isRule, filterArray, handleDealAuthRule } from '../../utils/tools/common';
import { getAuthRuleUrl } from "../../services/login";
import { setGlobalData } from "../../utils/const/global";

// 资产/风险类型 1：资产拍卖 2：代位权-立案 3：代位权-开庭 4：代位权-裁判文书 5：破产重组 6：涉诉-立案 7：涉诉-开庭 8：涉诉-裁判文书
export default {
  namespace: 'home',
  state: {
    monitorParams: {},
  },
  effects: {
    *getCurrentOrganization({ payload }, { call, put }) {
      const res = yield call(currentOrganizationApi, payload);
      return res;
    },

    *getAuthRule({}, {call}) {
      const res = yield call(getAuthRuleUrl);
      if(res.code === 200 ){
        setGlobalData('ruleArray', handleDealAuthRule(res.data.orgPageGroups));
      }
      return res;
    },


    *getAssets({ payload }, {all, call, put }) {
      const res = yield call(assetApi, payload);
      return res;
      // if(res.code === 200){
      //   yield put({ type: 'updateAssets', payload: {
      //       auctionCount: res.data.auctionCount || 0,
      //       subrogationCount: res.data.subrogationCount || 0,
      //     }});
      //   yield put({ type: 'updateAssetsStarLevel', payload: {
      //       starLevelCounts: res.data.starLevelCounts
      //     }});
      // }
    },

    *getRisk({ payload}, {all, call, put }) {
      const res = yield call(riskApi, payload);
      return res;
      // if(res.code === 200){
      //   yield put({ type: 'updateRisk', payload: {
      //       bankruptcyCount: res.data.bankruptcyCount || 0,
      //       lawsuitCount: res.data.lawsuitCount || 0,
      //     }});
      //   yield put({ type: 'updateRiskStarLevel', payload: {
      //       starLevelCounts: res.data.starLevelCounts,
      //     }});
      // }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    // updateAssets(state, { payload }) {
    //   let newAssetsArrary =  [
    //     { id: 1, name: '资产拍卖', num: 0, isRule: false, icon: 'icon-auction', value: 'zcwjzcpm'},
    //     { id: 2, name: '代位权', num: 0, isRule: false, icon: 'icon-subrogation', value: 'zcwjdwq'},
    //   ];
    //   newAssetsArrary[0].num = payload.auctionCount || 0;
    //   newAssetsArrary[0].isRule = isRule('zcwjzcpm');
    //   newAssetsArrary[1].num = payload.subrogationCount || 0;
    //   newAssetsArrary[1].isRule = isRule('zcwjdwq');
    //   return {
    //     ...state,
    //     assetsArray: filterArray([...newAssetsArrary]),
    //   }
    // },
    //
    // updateRisk(state, { payload }) {
    //   let newRiskArrary = [
    //     { id: 21, name: '破产重整', num: 0, isRule: false, icon: 'icon-bankruptcy', value: 'fxjkqypccz'},
    //     { id: 22, name: '涉诉', num: 0, isRule: false, icon: 'icon-litigation', value: 'fxjkssjk'},
    //   ];
    //   newRiskArrary[0].num = payload.bankruptcyCount || 0 ;
    //   newRiskArrary[0].isRule = isRule('fxjkqypccz');
    //   newRiskArrary[1].num = payload.lawsuitCount || 0;
    //   newRiskArrary[1].isRule = isRule('fxjkssjk');
    //   return {
    //     ...state,
    //     riskArray: filterArray([...newRiskArrary]),
    //   }
    // },
    //
    // updateAssetsStarLevel(state, {payload}: { payload: any }): any {
    //   let assetsStar = [...state.assetsStarLevelCounts];
    //   if(payload.starLevelCounts.length > 0){
    //     payload.starLevelCounts.forEach(item => {
    //       if(item.starLevel === 90){
    //         assetsStar[0].starLevelCount = item.starLevelCount;
    //       }
    //       else if(item.starLevel === 80){
    //         assetsStar[1].starLevelCount = item.starLevelCount;
    //       }
    //       else if(item.starLevel === 60){
    //         assetsStar[2].starLevelCount = item.starLevelCount;
    //       }
    //     });
    //   }
    //   return {
    //     ...state,
    //     assetsStarLevelCounts: [...assetsStar],
    //   }
    // },
    //
    // updateRiskStarLevel(state, {payload}: { payload: any }): any {
    //   let riskStar = [...state.riskStarLevelCounts];
    //   if(payload.starLevelCounts.length > 0){
    //     payload.starLevelCounts.forEach(item => {
    //       if(item.starLevel === 90){
    //         riskStar[0].starLevelCount = item.starLevelCount;
    //       }
    //       else if(item.starLevel === 80){
    //         riskStar[1].starLevelCount = item.starLevelCount;
    //       }
    //       else if(item.starLevel === 60){
    //         riskStar[2].starLevelCount = item.starLevelCount;
    //       }
    //       else{
    //         riskStar[3].starLevelCount = item.starLevelCount;
    //       }
    //     });
    //   }
    //   return {
    //     ...state,
    //     riskStarLevelCounts: [...riskStar],
    //   }
    // },

    updateMonitorParams(state, { payload }) {
      let newParmas = {...state.monitorParams, ...payload.params};
      return {
        ...state,
        monitorParams: {...newParmas},
      }
    },
  }
}
