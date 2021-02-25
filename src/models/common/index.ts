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

interface showConfigType {
  id: number
  isSelected: boolean,
  title: string
}


function activeShowConfig(config, id, title) {
  let newConfig: showConfigType[] = [];
  config.forEach(item => {
    if(item.id === id){
      newConfig.push({id: item.id, isSelected: true, title: title || item.title})
    }
    else {
      newConfig.push({id: item.id, isSelected: item.isSelected, title: item.title})
    }
  });
  newConfig.sort( (a: {id: number}, b: {id: number}) => a.id - b.id);
  return newConfig
}


// 聚合获取线性选择的左边框
function getLeftArray(conditions) {
  let leftArray: leftArrayType[] = conditions.field.map(it => { return {id: it.id, name: it.name, isSelected: it.isSelected, isRule: it.isRule }});
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
    dropParams: {},
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
        showConfig: newShowConfig,
      }
    },

    updateSelect: (state, { payload }) => {
      let field = state.config.filter(item => item.id === payload.currentId)[0].conditions.field;
      let newField: {isSelected: boolean}[] = [];
      field.forEach(item => {
        if(item.id === payload.id){
          newField.push({...item, isSelected: true })
        }
        else{
          newField.push({...item, isSelected: false })
        }
      });
      let newConfig = [];
      let paramName = '';
      state.config.forEach(item => {
        if(item.id === payload.currentId){
          paramName = item.paramName;
          newConfig.push({...item, conditions: {field: newField, type: 'selected'}})
        }
        else{
          newConfig.push({...item})
        }
      });
      let newShowConfig = activeShowConfig(state.showConfig, payload.currentId, payload.info.name);
      return {
        ...state,
        config: newConfig,
        showConfig: newShowConfig,
        dropParams: { 'isRead': payload.info.value}
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
