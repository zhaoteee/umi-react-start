import request from '@/utils/request';

export const addOrder = (params: { addressId?: string; cartIds?: number[]; consumerRemark?: string; productId?: string; quantity?: string }) => {
  return request('/integral/order/add', {
    method: 'POST',
    data: params,
  });
};

// 订单详情
export const getOrderDetail = (id: string) => {
  return request(`/integral/order/detail/${id}`);
};

export const getPayDetail = (orderId: string) => {
  return request(`/integral/order/pay/method/${orderId}`);
};

// 订单列表
export const getOrderList = (params: any) => {
  return request(`/integral/order/page`, {
    method: 'POST',
    data: params,
  });
};

// 取消订单
export const cancelOrder = (id: string) => {
  return request(`/integral/order/cancel/${id}`, {
    method: 'POST',
  });
};

// 提交凭证
export const uploadCredential = (params: { image: string; orderId: string }) => {
  return request('/integral/order/up_credential', {
    method: 'POST',
    data: params,
  });
};

// 确认订单
export const confirmOrder = (id: string) => {
  return request(`/integral/order/confirm/${id}`, {
    method: 'POST',
  });
};

export const payOrder = (params: { orderId: string; credentialImage?: string; payMethod: string }) => {
  return request('/integral/order/pay', {
    method: 'POST',
    data: params,
  });
};

// 订单列表
export const exportIntegral = (params: any) => {
  return request(`/integral/order/export`, {
    method: 'POST',
    data: params,
  });
};
