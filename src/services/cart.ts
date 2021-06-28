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
