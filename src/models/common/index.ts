// import { getRule } from "../common";

export default {
  namespace: 'common',
  state: {
    tabField: 'index',
    currentPage: '/pages/index/index',
    queryAssetsConfig: [
      {
        id: 1,
        title: '是否已读',
        isSelected: false,
        conditions: {
          type: 'selected',
          field: [
            {name: '全部', id: 1, value: '', isSelected: true},
            {name: '已读', id: 2, value: true, isSelected: false},
            {name: '未读', id: 3, value: false, isSelected: false},
          ],
        }
      },
      {
        id: 2,
        title: '线索类型',
        isSelected: false,
        conditions:   {
          type: 'line-choose',
          field: [
            {
              id: 1,
              name: '全部',
              isSelected: true,
              childrenName: [
                {name: '全部', value: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], id: 1, isSelected: true},
              ]
            },
            {
              id: 2,
              name: '涉诉资产',
              isSelected: false,
              childrenName: [
                {name: '全部', value: ['1', '2', '3', '4'], id: 1, isSelected: false},
                {name: '司法拍卖', value: ['1'], id: 2, isSelected: false},
                {name: '代位权-立案信息', value: ['2'], id: 3, isSelected: false},
                {name: '代位权-开庭公告', value: ['3'], id: 4, isSelected: false},
                {name: '代位权-裁判文书', value: ['4'], id: 5, isSelected: false},
              ]
            }
          ],
        },
      },
      {
        id: 3,
        title: '更多筛选',
        isSelected: false,
        conditions: {
          type: 'time',
          field: ['startTime', 'endTime'],
        },
      },
    ],
    queryRiskConfig: [
  {
    id: 1,
    title: '是否已读',
    isSelected: false,
    conditions: {
      type: 'selected',
      field: [
        {name: '全部', id: 1, value: '', isSelected: true},
        {name: '已读', id: 2, value: true, isSelected: false},
        {name: '未读', id: 3, value: false, isSelected: false},
      ],
      requird: true,
    }
  },
  {
    id: 2,
    title: '风险类型',
    isSelected: false,
    conditions:   {
      type: 'line-choose',
      field: [
        {
          id: 1,
          name: '全部',
          isSelected: true,
          childrenName: [
            {name: '全部', value: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], id: 1, isSelected: true},
          ]
        },
        {
          id: 2,
          name: '司法风险',
          isSelected: false,
          childrenName: [
            {name: '全部', value: ['1', '2', '3', '4'], id: 1, isSelected: true},
            {name: '破产重整', value: ['5', '6'], id: 2, isSelected: false},
            {name: '涉诉-立案信息', value: ['7'], id: 3, isSelected: false},
            {name: '涉诉-开庭公告', value: ['8'], id: 4, isSelected: false},
            {name: '涉诉-裁判文书', value: ['9'], id: 5, isSelected: false},
          ]
        }
      ],
      requird: true,
      value: '',
    },
  },
  {
    id: 3,
    title: '更多筛选',
    isSelected: false,
    conditions: {
      type: 'time',
      field: ['startTime', 'endTime'],
      requird: true,
      value: '',
    },
  },
]
  },
  effects: {
    *updateassetsConfig({ payload }, { put }) {
      yield put({ type: 'updateState', payload});
    },
  },
  reducers: {
    updateState: (state, { payload }) => {
      const { queryAssetsConfig } = state;
      console.log('updateState state === ', queryAssetsConfig, payload);
      let config = [...state.queryRiskConfig];
      config[0] = payload.item;
      console.log('updateState config === ', state, config );
      return {
        ...state,
        queryAssetsConfig: [...config]
      }
    },

  }
};
