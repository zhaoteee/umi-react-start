import request from '@/utils/request';

export const addOrder = (params: { addressId?: string; cartIds?: number[]; consumerRemark?: string; productId?: string; quantity?: string }) => {
  return request('/integral/order/add', {
    method: 'POST',
    data: params,
  });
};
export const getOrderDetail = (id: string) => {
  return request(`/integral/order/detail/${id}`);
};

export const getPayDetail = (orderId: string) => {
  return request(`/integral/order/pay/method/${orderId}`);
};

export const uploadCredential = (params: { image: string; orderId: string }) => {
  return request('/integral/order/up_credential', {
    method: 'POST',
    data: params,
  });
};

export const payOrder = (params: { orderId: string; credentialImage?: string; payMethod: string }) => {
  return request('/integral/order/pay', {
    method: 'POST',
    data: params,
  });
};
