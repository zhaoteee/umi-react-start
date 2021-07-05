import request from '@/utils/request';

export const getCartList = () => {
  return request('/integral/cart/list', {
    method: 'GET',
  });
};

export const addToCart = (params: any) => {
  return request('/integral/cart/add', {
    method: 'POST',
    data: params,
  });
};

export const deleteCartItem = (params: { ids: [number] }) => {
  return request('/integral/cart/delete', {
    method: 'POST',
    params,
  });
};

export const updateCartItemQuantity = (params: any) => {
  return request('/integral/cart/update', {
    method: 'POST',
    data: params,
  });
};

export const updateCartItemChecked = (params: { cartIds: [number]; isChecked: boolean }) => {
  return request('/integral/cart/update_select', {
    method: 'POST',
    data: params,
  });
};

// 查询购物车商品种类
export const getCartCount = () => {
  return request('/integral/cart/product/count', {
    method: 'GET',
  });
};
