export default {
  namespace: 'home',
  state: {
    count: 12,
  },
  effects: {
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  }
}
