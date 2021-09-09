import type { Reducer, Effect } from 'umi';
import { getOrderDetail } from '@/services/order';
import type { goodInfo } from './order';
import { statusMap } from './order';
import { preFixPath } from '@/utils/util';

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
export type DetailInfo = {
  id: string;
  sn: string;
  orderStatus: string;
  statusText: string;
  totalAmount: number;
  createDate: string;
  address: string;
  receiverContactName: string;
  receiverContactPhone: string;
  supplierName: string;
  payDate: string;
  shipDate: string;
  consumerRemark: string;
  receivableAmount: number;
  integralAmount: number;
  integral: number;
  rebateAmount: number;
  offlineAmount: number;
  hasOperate: boolean;
  shipDTOList: shipInfo[];
  integralOrderItemDTOs: goodInfo[];
};
export type shipInfo = {
  shipStoreHouse: string;
  expressName: string;
  expressNo: string;
};
const initialDetail = {
  id: '',
  sn: '',
  orderStatus: '',
  statusText: '',
  totalAmount: 0,
  createDate: '',
  address: '',
  receiverContactName: '',
  receiverContactPhone: '',
  supplierName: '',
  payDate: '',
  shipDate: '',
  consumerRemark: '',
  receivableAmount: 0,
  integralAmount: 0,
  integral: 0,
  rebateAmount: 0,
  offlineAmount: 0,
  hasOperate: false,
  integralOrderItemDTOs: [],
  shipDTOList: [],
};
const OrderModel: ModelType = {
  namespace: 'detail',
  state: {
    detail: {
      ...initialDetail,
    },
  },
  effects: {
    *getData({ payload }, { call, put }) {
      try {
        const res = yield call(getOrderDetail, payload.id);
        yield put({
          type: 'saveOrderDetail',
          payload: res.data,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    saveOrderDetail(state, { payload }): OrderModelState {
      payload.statusText = statusMap[payload.orderStatus];
      payload.shipDTOList.map((item: any) => {
        return {
          shipStoreHouse: item.shipStoreHouse,
          expressName: item.expressName,
          expressNo: item.expressNo,
        };
      });
      payload.integralOrderItemDTOs.map((item: any) => {
        if (item.images && item.images.indexOf('http') < 0) {
          item.images = preFixPath + item.images;
        }
        return item;
      });
      return {
        detail: payload,
      };
    },
  },
};
export default OrderModel;
