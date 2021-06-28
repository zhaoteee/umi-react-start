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
    // update: Reducer<CartModelState>;
    // delete: Reducer<CartModelState>;
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
        name: '商品名称商品名称商品名称商品名称商品名称',
        price: 200,
        unit: '台',
        count: 3,
        totalPrice: 600,
        selected: true,
      },
      {
        id: 2,
        img: 'http://zc-peppa-dev.oss-cn-hangzhou.aliyuncs.com/upload/image/20210512/NpHm3P4UU.png',
        name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
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
    storeName: '大胎品牌方',
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

function handleUpdateCartInfo(list: CartItemInfo[], storeIndex: number, goodIndex: number) {
  return list.map((item, itemIndex) => {
    if (itemIndex === storeIndex) {
      const goodsList = item.goodsList.map((good, index) => {
        if (goodIndex !== undefined) {
          // 更新商品信息
          if (goodIndex === index) {
            return {
              ...good,
              selected: !good.selected,
            };
          }
          return good;
        }
        return {
          ...good,
          selected: !item.selected ? !item.selected : !good.selected,
        };
      });
      return {
        ...item,
        selected: goodsList.every((good) => good.selected),
        goodsList,
      };
    }
    return item;
  });
}

const CartModel: CartModelType = {
  namespace: 'cart',
  state: {
    total: 0,
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
        total: payload.reduce((acc: number, cur: CartItemInfo) => acc + cur.goodsList.length, 0),
        list: payload,
        allSelected: true,
      };
    },
    updateCartInfo(state = initialState, { payload = {} }) {
      console.log(payload);
      const { storeIndex, goodIndex, type } = payload;
      let newList: CartItemInfo[] = [];
      const oldAllSelected = state.allSelected;
      if (storeIndex === undefined && goodIndex === undefined) {
        // 更新全选
        newList = cloneDeep(state.list);
        switch (type) {
          case 'update':
            newList.forEach((item) => {
              item.selected = !oldAllSelected;
              item.goodsList.forEach((good) => {
                good.selected = !oldAllSelected;
              });
            });
            break;
          case 'delete':
            for (let i = newList.length - 1; i >= 0; i--) {
              if (newList[i].selected) {
                newList.splice(i, 1);
              } else {
                for (let j = newList[i].goodsList.length - 1; j >= 0; j--) {
                  if (newList[i].goodsList[j].selected) {
                    newList[i].goodsList.splice(j, 1);
                  }
                }
              }
            }
            break;
          default:
            break;
        }
      } else {
        let updateGoodsListLength: number | null = null; // 当前正在更新的goodslist长度
        switch (type) {
          case 'update':
            newList = handleUpdateCartInfo(state.list, storeIndex, goodIndex);
            break;
          case 'delete':
            newList = state.list.map((item, itemIndex) => {
              if (storeIndex === itemIndex) {
                item.goodsList.splice(goodIndex, 1);
                updateGoodsListLength = item.goodsList.length;
                return {
                  ...item,
                  goodsList: item.goodsList,
                };
              }
              return item;
            });
            if (updateGoodsListLength === 0) {
              newList.splice(storeIndex, 1);
            }
            break;
          default:
            break;
        }
      }
      return {
        ...state,
        total: newList.reduce((acc, cur) => acc + cur.goodsList.length, 0),
        list: newList,
        allSelected: newList.every((item) => item.selected),
      };
    },
    // update(state = initialState, { payload }) {
    //   console.log(state, payload);
    //   return {
    //     ...state,
    //   };
    // },
    // delete(state = initialState, { payload }) {
    //   console.log(state, payload);
    //   return {
    //     ...state,
    //   };
    // },
  },
};

export default CartModel;
