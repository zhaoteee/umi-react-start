import type { Reducer, Effect } from 'umi';
import { deleteCartItem, getCartList, updateCartItemChecked, updateCartItemQuantity, getCartCount, addToCart } from '@/services/cart';

export type GoodsInfo = {
  id: number;
  distributorId: number;
  productId: string;
  image: string;
  invoicePrice: number;
  title: string;
  isChecked: boolean;
  quantity: number;
  supplierId: number;
  supplierName: string;
  unit: string;
  orderNum: number;
  primaryNum: number;
};
export type CartItemInfo = {
  supplierId: number;
  supplierName: string;
  isChecked: boolean;
  goodsList: GoodsInfo[];
};
export type CartModelType = {
  namespace: 'cart';
  state: CartModelState;
  effects: {
    fetchCartInfo: Effect;
    addGoodsToCart: Effect;
    deleteCartItem: Effect;
    updateCartItemQuantity: Effect;
    updateCartItemChecked: Effect;
    getCartTotalCount: Effect;
  };
  reducers: {
    saveCartInfo: Reducer<CartModelState>;
    updateCartTotal: Reducer<CartModelState>;
  };
};

export type CartModelState = {
  total: number; // 商品总数
  totalPrice: number;
  list: CartItemInfo[]; // 商品列表
  originalList: GoodsInfo[];
};

export function handleCartInfo(list: GoodsInfo[]) {
  return list.reduce((acc: CartItemInfo[], cur) => {
    let isExisted = false;
    acc.forEach((item) => {
      if (item.supplierId === cur.supplierId) {
        isExisted = true;
        item.isChecked = item.isChecked && cur.isChecked;
        item.goodsList.push({
          ...cur,
        });
      }
    });
    if (!isExisted) {
      acc.push({
        supplierId: cur.supplierId,
        supplierName: cur.supplierName,
        isChecked: cur.isChecked,
        goodsList: [
          {
            ...cur,
          },
        ],
      });
    }
    return acc;
  }, []);
}

const initialState = {
  total: 0,
  totalPrice: 0,
  list: [],
  originalList: [],
};

const CartModel: CartModelType = {
  namespace: 'cart',
  state: initialState,

  effects: {
    *addGoodsToCart({ payload }, { put, call }) {
      // 触发添加到购物车
      yield call(addToCart, payload);
      // 更新购物车数据
      yield put({
        type: 'fetchCartInfo',
      });
    },
    *getCartTotalCount(_, { put, call }) {
      const res = yield call(getCartCount);
      yield put({
        type: 'updateCartTotal',
        payload: res?.data,
      });
    },
    *fetchCartInfo(_, { put, call }) {
      try {
        const res = yield call(getCartList);
        yield put({
          type: 'saveCartInfo',
          payload: res?.data ?? [],
        });
      } catch (e) {
        Promise.reject(e);
      }
    },
    *updateCartItemChecked({ payload: { items, value } }, { call, put }) {
      try {
        const params = {
          cartIds: items.map((item: GoodsInfo) => item.id),
          isChecked: value ? 1 : 0,
        };
        const res = yield call(updateCartItemChecked, params);
        if (res.success) yield put({ type: 'fetchCartInfo' });
      } catch (e) {
        Promise.reject(e);
      }
    },
    *updateCartItemQuantity({ payload: { item, quantity } }, { call, put }) {
      try {
        const res = yield call(updateCartItemQuantity, { ...item, quantity });
        if (res.success) yield put({ type: 'fetchCartInfo' });
      } catch (e) {
        Promise.reject(e);
      }
    },
    *deleteCartItem({ payload: { items } }, { call, put }) {
      try {
        const ids = items.map((item: GoodsInfo) => item.id);
        const res = yield call(deleteCartItem, { ids });
        if (res.success) yield put({ type: 'fetchCartInfo' });
      } catch (e) {
        Promise.reject(e);
      }
    },
  },
  reducers: {
    saveCartInfo(state = initialState, { payload }): CartModelState {
      return {
        ...state,
        total: payload.length,
        totalPrice: payload.filter((item: GoodsInfo) => item.isChecked).reduce((acc: number, cur: GoodsInfo) => acc + cur.invoicePrice * cur.quantity, 0),
        list: handleCartInfo(payload),
        originalList: payload,
      };
    },
    updateCartTotal(state = initialState, { payload }): CartModelState {
      return {
        ...state,
        total: payload,
      };
    },
  },
};

export default CartModel;
