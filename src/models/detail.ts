import type { Reducer, Effect } from 'umi';

export type ModelType = {
  namespace: string;
  state: OrderModelState;
  effects: {
    getData: Effect;
  };
  reducers: {
    saveOrderDetail: Reducer<OrderModelState>;
  };
};
export type OrderModelState = {
  detail: DetailInfo;
};
export type goodInfo = {
  id: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
};
export type DetailInfo = {
  sn: string;
  state: string;
  total: number;
  date: string;
  address: string;
  receiverName: string;
  tel: string;
  storeName: string;
  payDate: string;
  completeDate: string;
  remark: string;
  productTotal: number;
  integral: number;
  useIntegral: number;
  rebate: number;
  offline: number;
  hasOperate: boolean;
  goodsList: goodInfo[];
};
const detailData = {
  sn: '1701463358915213660',
  state: '待付款',
  total: 200,
  date: '2021-04-05',
  address: '浙江省杭州市江干区下沙一号大街一号',
  receiverName: '王小明',
  tel: '18758109716',
  storeName: '小胎品牌方名称',
  payDate: '2021-04-05',
  completeDate: '2021-04-05',
  remark: '尽快发货',
  productTotal: 180,
  integral: 10,
  useIntegral: 20,
  rebate: 30,
  offline: 50,
  hasOperate: false,
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
};
const initialDetail = {
  sn: '',
  state: '',
  total: 0,
  date: '',
  address: '',
  receiverName: '',
  tel: '',
  storeName: '',
  payDate: '',
  completeDate: '',
  remark: '',
  productTotal: 0,
  integral: 0,
  useIntegral: 0,
  rebate: 0,
  offline: 0,
  hasOperate: false,
  goodsList: [],
};
const OrderModel: ModelType = {
  namespace: 'detail',
  state: {
    detail: {
      ...initialDetail,
    },
  },
  effects: {
    *getData(_, { put }) {
      // const res: { data: DetailInfoType } = yield call(getMateriaDetail, payload);
      yield put({
        type: 'saveOrderDetail',
        payload: detailData,
      });
    },
  },
  reducers: {
    saveOrderDetail(state, { payload }): OrderModelState {
      return {
        detail: payload,
      };
    },
  },
};
export default OrderModel;
