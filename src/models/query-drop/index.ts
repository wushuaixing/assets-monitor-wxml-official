interface configType {
  id: number
  isSelected: boolean,
  title: string
  field: string
  type: string
  conditions: []
}

export default {
  namespace: 'queryDrop',
  state: {
    config: [],
  },
  effects: {
    *updateassetsConfig({ payload }, { put }) {
      yield put({ type: 'updateState', payload});
    },
  },
  reducers: {
    initConfig: (state, { payload })=> {
      return {
        ...state,
        config: [...payload],
      }
    },

    updateShowSelected: (state, { payload })=> {
      let newConfig: configType[] = [];
      state.config.forEach(item => {
        if(item.id === payload.id){
          newConfig.push({...item, isSelected: true })
        }
        else {
          newConfig.push({...item})
        }
      });
      return {
        ...state,
        config: [...newConfig]
      }
    },

    updateConfig: (state, { payload })=> {
      let newConfig: configType[] = [];
      state.config.forEach(item => {
        if(item.id === payload.tab.id){
          newConfig.push({...item, conditions: payload.conditions, title: payload.info.name ? payload.info.name : item.title})
        }
        else {
          newConfig.push({...item})
        }
      });
      return {
        ...state,
        config: [...newConfig]
      }
    },

    updateLineConfig: (state, { payload })=> {
      let newConfig: configType[] = [];
      state.config.forEach(item => {
        if(item.id === payload.tab.id){
          newConfig.push({...item, conditions: payload.conditions, title: payload.info.name ? payload.info.name : item.title})
        }
        else {
          newConfig.push({...item})
        }
      });
      return {
        ...state,
        config: [...newConfig]
      }
    },

    updateFormConfig: (state, { payload })=> {
      let newConfig: configType[] = [];
      state.config.forEach(item => {
        if(item.id === payload.tab.id){
          newConfig.push({...item, isSelected: true, conditions: payload.conditions,})
        }
        else {
          newConfig.push({...item})
        }
      });
      return {
        ...state,
        config: [...newConfig]
      }
    },

  }
};
