import type { Reducer, Effect } from 'umi';

export type CartModelState = {
  total: number; //商品总数
  list: []; // 商品列表
};

export type CartModelType = {
  namespace: 'cart';
  state: CartModelState;
  effects: {
    fetchCartInfo: Effect;
    addGoodsToCart: Effect;
  };
  reducers: {
    saveCartInfo: Reducer<CartModelState>;
  };
};

const CartModel: CartModelType = {
  namespace: 'cart',

  state: {
    total: 22,
    list: []
  },

  effects: {
    *addGoodsToCart(_, { put, call }) {
      const addCartRequest = null
      // 触发添加到购物车
      yield call(addCartRequest)
      // 更新购物车数据
      yield put({
        type: 'fetchCartInfo'
      });
    },
    *fetchCartInfo(_, { put }) {
      const data: string | any[] = [];
      yield put({
        type: 'saveCartInfo',
        payload: data,
      });
    },
  },
  reducers: {
    saveCartInfo(state, { payload }): CartModelState {
      return {
        total: 3,
        list: payload,
      };
    },
  },
};

export default CartModel;
