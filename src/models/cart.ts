import type { Reducer, Effect } from 'umi';
import { deleteCartItem, getCartList, updateCartItemChecked, updateCartItemQuantity } from '@/services/cart';

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
  };
  reducers: {
    saveCartInfo: Reducer<CartModelState>;
  };
};

export type CartModelState = {
  total: number; // 商品总数
  totalPrice: number;
  isAllChecked: boolean;
  list: CartItemInfo[]; // 商品列表
};

function handleCartInfo(list: GoodsInfo[]) {
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
  isAllChecked: false,
  list: [],
};

const CartModel: CartModelType = {
  namespace: 'cart',
  state: initialState,

  effects: {
    *addGoodsToCart(_, { put, call }) {
      const addCartRequest = null;
      // 触发添加到购物车
      yield call(addCartRequest);
      // 更新购物车数据
      yield put({
        type: 'fetchCartInfo',
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
        console.log(e);
      }
    },
    *updateCartItemChecked({ payload: { items, value } }, { call, put }) {
      console.log(items, value);
      try {
        const params = {
          cartIds: items.map((item: GoodsInfo) => item.id),
          isChecked: value ? 1 : 0,
        };
        const res = yield call(updateCartItemChecked, params);
        if (res.success) yield put({ type: 'fetchCartInfo' });
      } catch (e) {
        console.log(e);
      }
    },
    *updateCartItemQuantity({ payload: { item, quantity } }, { call, put }) {
      try {
        const res = yield call(updateCartItemQuantity, { ...item, quantity });
        if (res.success) yield put({ type: 'fetchCartInfo' });
      } catch (e) {
        console.log(e);
      }
    },
    *deleteCartItem({ payload: { items } }, { call, put }) {
      try {
        const ids = items.map((item: GoodsInfo) => item.id);
        const res = yield call(deleteCartItem, { ids });
        if (res.success) yield put({ type: 'fetchCartInfo' });
      } catch (e) {
        console.log(e);
      }
    },
  },
  reducers: {
    saveCartInfo(state = initialState, { payload }): CartModelState {
      return {
        ...state,
        total: payload.length,
        totalPrice: payload.reduce((acc: number, cur: GoodsInfo) => acc + cur.invoicePrice * cur.quantity, 0),
        isAllChecked: payload.every((item: GoodsInfo) => item.isChecked),
        list: handleCartInfo(payload),
      };
    },
  },
};

export default CartModel;
