import type { Reducer, Effect } from 'umi';
import { cloneDeep } from 'lodash';

export type GoodsInfo = {
  id: number;
  img: string;
  name: string;
  price: number;
  unit: string;
  count: number;
  totalPrice: number;
  selected: boolean;
};
export type CartItemInfo = {
  storeId: number;
  storeName: string;
  selected: boolean;
  goodsList: GoodsInfo[];
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
    updateCartInfo: Reducer<CartModelState>;
  };
};

export type CartModelState = {
  total: number; // 商品总数
  allSelected: boolean;
  list: CartItemInfo[]; // 商品列表
};

const initialState = {
  total: 0,
  allSelected: false,
  list: [],
};

const testData = [
  {
    storeId: 0,
    storeName: '小胎品牌方',
    selected: true,
    goodsList: [
      {
        id: 0,
        img: 'http://zc-peppa-dev.oss-cn-hangzhou.aliyuncs.com/upload/image/20210512/NpHm3P4UU.png',
        name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
        price: 200,
        unit: '台',
        count: 3,
        totalPrice: 600,
        selected: true,
      },
      {
        id: 1,
        img: 'http://zc-peppa-dev.oss-cn-hangzhou.aliyuncs.com/upload/image/20210512/NpHm3P4UU.png',
        name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
        price: 200,
        unit: '台',
        count: 3,
        totalPrice: 600,
        selected: true,
      },
    ],
  },
  {
    storeId: 1,
    storeName: '小胎品牌方',
    selected: true,
    goodsList: [
      {
        id: 0,
        img: 'http://zc-peppa-dev.oss-cn-hangzhou.aliyuncs.com/upload/image/20210512/NpHm3P4UU.png',
        name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
        price: 200,
        unit: '台',
        count: 3,
        totalPrice: 600,
        selected: true,
      },
    ],
  },
];

const CartModel: CartModelType = {
  namespace: 'cart',
  state: {
    total: 22,
    allSelected: false,
    list: [],
  },

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
    *fetchCartInfo(_, { put }) {
      yield put({
        type: 'saveCartInfo',
        payload: testData,
      });
    },
  },
  reducers: {
    saveCartInfo(state, { payload }): CartModelState {
      return {
        total: 3,
        list: payload,
        allSelected: true,
      };
    },
    updateCartInfo(state = initialState, { payload = {} }) {
      let newList: CartItemInfo[];
      const { storeId, id } = payload;
      if (storeId === undefined && id === undefined) {
        // 更新全选
        newList = cloneDeep(state.list);
        const allSelected = !state.allSelected;
        newList.forEach((item) => {
          item.selected = allSelected;
          item.goodsList.forEach((good) => (good.selected = allSelected));
        });
      } else {
        newList = state.list.map((item) => {
          if (item.storeId === storeId) {
            const newStoreItem = cloneDeep(item);
            if (id !== undefined) {
              // id存在 更新的是商品 selected
              newStoreItem.selected = newStoreItem.goodsList
                .map((good) => {
                  if (good.id === id) good.selected = !good.selected;
                  return good;
                })
                .every((good) => good.selected);
            } else {
              // id不存在 更新的店铺 selected
              newStoreItem.selected = !newStoreItem.selected;
              newStoreItem.goodsList.forEach((good) => {
                good.selected = newStoreItem.selected;
              });
            }
            return newStoreItem;
          }
          return item;
        });
      }
      return {
        ...state,
        total: 3,
        list: newList,
        allSelected: newList.every((item) => item.selected),
      };
    },
  },
};

export default CartModel;
