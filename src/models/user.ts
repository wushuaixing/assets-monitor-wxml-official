
export default {
  namespace: 'user',
  state: {
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
