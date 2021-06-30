import request from '@/utils/request';

export const getRegionData = () => {
  return request('/area/find_tree');
};

export const getAddressList = () => {
  return request(`/distributor/address/list`, {
    method: 'GET',
  });
};

export const getAddressDetail = (id: string) => {
  return request(`/distributor/address/detail/${id}`, {
    method: 'GET',
  });
};

export const addNewAddress = (params: any) => {
  return request('/distributor/address/add', {
    method: 'POST',
    data: params,
  });
};

export const updateAddress = (params: any) => {
  return request('/distributor/address/update', {
    method: 'POST',
    data: params,
  });
};

export const deleteAddress = (id: string) => {
  return request(`/distributor/address/delete/${id}`, {
    method: 'POST',
  });
};

export const setDefaultAddress = (id: string) => {
  return request(`/distributor/address/default/${id}`, {
    method: 'POST',
  });
};
