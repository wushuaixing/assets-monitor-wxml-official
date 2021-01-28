export default {
  namespace: 'common',
  state: {
    tabField: 'index',
    currentPage: '/pages/index/index',
  },
  effects: {
  },
  reducers: {

    updateState: (state, { payload }) => {
      return{
        ...state,
        ...payload,
      }
    },

  }
};
