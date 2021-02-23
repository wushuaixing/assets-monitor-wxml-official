// import { getRule } from "../common";

interface leftArrayType{
  id: number
  isSelected: boolean
  name: string
}

interface rightArrayType{
  id: number
  name: string
  value: string
  isSelected: boolean
}


function activeShowConfig(config, id, title) {
  let newConfig = [];
  config.forEach(item => {
    if(item.id === id){
      newConfig.push({...item, isSelected: true, title: title || item.title})
    }
    else {
      newConfig.push({...item})
    }
  });
  return newConfig
}


// 聚合获取线性选择的左边框
function getLeftArray(conditions) {
  let leftArray: leftArrayType[] = conditions.field.map(it => { return {id: it.id, name: it.name, isSelected: it.isSelected}});
  return leftArray;
}

// 聚合获取线性选择的右边框
function getRightArray(conditions, id) {
  let rightArray: rightArrayType[] = [];
  if(conditions.type === 'line-choose'){
    rightArray = conditions.field.filter(it => it.id === id)[0].childrenName;
  }
  return rightArray;
}

export default {
  namespace: 'common',
  state: {
    tabField: 'index',
    currentPage: '/pages/index/index',
    leftArray: [],
    rightArray: [],
    config: [],
    showConfig: [],
//     queryAssetsConfig: [
//       {
//         id: 1,
//         title: '是否已读',
//         isSelected: false,
//         conditions: {
//           type: 'selected',
//           field: [
//             {name: '全部', id: 1, value: '', isSelected: true},
//             {name: '已读', id: 2, value: true, isSelected: false},
//             {name: '未读', id: 3, value: false, isSelected: false},
//           ],
//         }
//       },
//       {
//         id: 2,
//         title: '线索类型',
//         isSelected: false,
//         conditions:   {
//           type: 'line-choose',
//           field: [
//             {
//               id: 1,
//               name: '全部',
//               isSelected: true,
//               childrenName: [
//                 {name: '全部', value: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], id: 1, isSelected: true},
//               ]
//             },
//             {
//               id: 2,
//               name: '涉诉资产',
//               isSelected: false,
//               childrenName: [
//                 {name: '全部', value: ['1', '2', '3', '4'], id: 1, isSelected: false},
//                 {name: '司法拍卖', value: ['1'], id: 2, isSelected: false},
//                 {name: '代位权-立案信息', value: ['2'], id: 3, isSelected: false},
//                 {name: '代位权-开庭公告', value: ['3'], id: 4, isSelected: false},
//                 {name: '代位权-裁判文书', value: ['4'], id: 5, isSelected: false},
//               ]
//             }
//           ],
//         },
//       },
//       {
//         id: 3,
//         title: '更多筛选',
//         isSelected: false,
//         conditions: {
//           type: 'time',
//           field: ['startTime', 'endTime'],
//         },
//       },
//     ],
//     queryRiskConfig: [
//   {
//     id: 1,
//     title: '是否已读',
//     isSelected: false,
//     conditions: {
//       type: 'selected',
//       field: [
//         {name: '全部', id: 1, value: '', isSelected: true},
//         {name: '已读', id: 2, value: true, isSelected: false},
//         {name: '未读', id: 3, value: false, isSelected: false},
//       ],
//       requird: true,
//     }
//   },
//   {
//     id: 2,
//     title: '风险类型',
//     isSelected: false,
//     conditions:   {
//       type: 'line-choose',
//       field: [
//         {
//           id: 1,
//           name: '全部',
//           isSelected: true,
//           childrenName: [
//             {name: '全部', value: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], id: 1, isSelected: true},
//           ]
//         },
//         {
//           id: 2,
//           name: '司法风险',
//           isSelected: false,
//           childrenName: [
//             {name: '全部', value: ['1', '2', '3', '4'], id: 1, isSelected: true},
//             {name: '破产重整', value: ['5', '6'], id: 2, isSelected: false},
//             {name: '涉诉-立案信息', value: ['7'], id: 3, isSelected: false},
//             {name: '涉诉-开庭公告', value: ['8'], id: 4, isSelected: false},
//             {name: '涉诉-裁判文书', value: ['9'], id: 5, isSelected: false},
//           ]
//         }
//       ],
//       requird: true,
//       value: '',
//     },
//   },
//   {
//     id: 3,
//     title: '更多筛选',
//     isSelected: false,
//     conditions: {
//       type: 'time',
//       field: ['startTime', 'endTime'],
//       requird: true,
//       value: '',
//     },
//   },
// ]
  },
  effects: {
    *updateassetsConfig({ payload }, { put }) {
      yield put({ type: 'updateState', payload});
    },
  },
  reducers: {
    initConfig: (state, { payload })=> {
      console.log('config ===', payload);
      let newConfig = [];
      payload.forEach(item => {
        newConfig.push({id: item.id, title: item.title, isSelected: item.isSelected })
      });
      return {
        ...state,
        config: [...payload],
        showConfig: [...newConfig]
      }
    },

    updateConfig: (state, { payload }) => {
      let newConfig = [];
      let leftArray = [];
      let rightArray = [];
      let conditions = {};
      let newShowConfig = activeShowConfig(state.showConfig, payload.currentId, '');
      state.config.forEach(item => {
        if(item.id === payload.id){
          conditions = item.conditions;
          newConfig.push({...item, isSelected: true})
        }
        else{
          newConfig.push({...item, title: payload.info.title || item.title })
        }
      });
      if(conditions.type === 'line-choose'){
        let activeId = getLeftArray(conditions).filter(item => item.isSelected)[0].id;
        leftArray = getLeftArray(conditions);
        rightArray = getRightArray(conditions, activeId);
      }
      console.log('updateConfig === ', payload, newConfig, newShowConfig, leftArray, rightArray);
      return {
        ...state,
        leftArray: [...leftArray],
        rightArray: [...rightArray],
        config: newConfig,
        showConfig: newShowConfig
      }
    },

    updateSelect: (state, { payload }) => {
      let field = state.config.filter(item => item.id === payload.currentId)[0].conditions.field;
      let newField = [];
      field.forEach(item => {
        if(item.id === payload.id){
          newField.push({...item, isSelected: true })
        }
        else{
          newField.push({...item, isSelected: false })
        }
      });
      let newConfig = [];
      state.config.forEach(item => {
        if(item.id === payload.currentId){
          newConfig.push({...item, conditions: {field: newField, type: 'selected'}})
        }
        else{
          newConfig.push({...item})
        }
      });
      let newShowConfig = activeShowConfig(newConfig, payload.currentId, payload.info.name);
      console.log('updateSelect === ', newConfig, newShowConfig);
      return {
        ...state,
        config: newConfig,
        showConfig: newShowConfig
      }
    },

    updateChooseLeft: (state, { payload }) => {
      let newField = [];
      let newLeftArray: leftArrayType[] = [];
      let newRightArray: rightArrayType[] = [];
      let configItem = state.config.filter(item => item.id === payload.currentId)[0];
      configItem.conditions.field.forEach(item => {
        if(item.id === payload.info.id){
          newRightArray = item.childrenName;
          newField.push({...item, isSelected: true })
        }
        else {
          newField.push({...item, isSelected: false })
        }
      });
      console.log('configItem ===', configItem, newField);
      configItem.conditions.field = newField;
      let newConfig = [...state.config];
      newConfig[1] = configItem;
      state.leftArray.forEach(item => {
        if(item.id === payload.info.id){
          newLeftArray.push({...item, isSelected: true})
        }
        else {
          newLeftArray.push({...item, isSelected: false})
        }
      });
      return {
        ...state,
        config: newConfig,
        leftArray: [...newLeftArray],
        rightArray: [...newRightArray]
      }
    },

    updateChooseRight: (state, { payload }) => {
      let newConfig = [...state.config];
      let newField = [];
      let field = state.config.filter(item => item.id === payload.currentId)[0].conditions.field;
      let childrenName: rightArrayType[] = field.filter(item => item.isSelected)[0].childrenName;
      let newRightArray = [];
      childrenName.forEach(item => {
        if(item.id === payload.info.id){
          newRightArray.push({...item, isSelected: true})
        }
        else {
          newRightArray.push({...item, isSelected: false})
        }
      });
      field.forEach(item => {
        if(item.isSelected){
          newField.push({...item, childrenName: newRightArray})
        }
        else {
          newField.push({...item })
        }
      });
      newConfig[1].conditions.field = [...newField];
      console.log('updateChooseRight ===', newRightArray, newConfig);
      return {
        ...state,
        config: newConfig,
        rightArray: [...newRightArray],
      }
    }
  }
};
