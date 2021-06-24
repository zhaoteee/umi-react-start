import type { Reducer, Effect } from 'umi';

export type ModelType = {
  namespace: 'order';
  state: OrderModelState;
  effects: {
    getData: Effect;
  };
  reducers: {
    saveOrderList: Reducer<OrderModelState>;
  };
};
export type OrderModelState = {
  list: OrderItemInfo[];
};
export type OrderItemInfo = {
  id: number;
  storeName: string;
  sn: string;
  date: string;
  state: string;
  hasOperate: boolean;
  goodsList: goodInfo[];
};
export type goodInfo = {
  id: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};
const testData = [
  {
    id: 1,
    storeName: '小胎品牌方名称',
    sn: '1701463358915213660',
    date: '2021-04-05',
    state: '待发货',
    hasOperate: true,
    goodsList: [
      {
        id: 2,
        img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        name: '商品名称',
        price: 200,
        quantity: 3,
        total: 600,
      },
      {
        id: 3,
        img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        name: '商品名称',
        price: 200,
        quantity: 3,
        total: 600,
      },
    ],
  },
  {
    id: 4,
    storeName: '小胎品牌方名称',
    sn: '1701463358915213660',
    date: '2021-04-05',
    state: '待发货',
    hasOperate: true,
    goodsList: [
      {
        id: 5,
        img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        name: '商品名称',
        price: 200,
        quantity: 3,
        total: 600,
      },
      {
        id: 6,
        img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        name: '商品名称',
        price: 200,
        quantity: 3,
        total: 600,
      },
    ],
  },
];
const OrderModel: ModelType = {
  namespace: 'order',
  state: {
    list: [],
  },
  effects: {
    *getData(_, { put }) {
      // const res: { data: DetailInfoType } = yield call(getMateriaDetail, payload);
      yield put({
        type: 'saveOrderList',
        payload: testData,
      });
    },
  },
  reducers: {
    saveOrderList(state, { payload }): OrderModelState {
      return {
        list: payload,
      };
    },
  },
};
export default OrderModel;
