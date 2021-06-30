import { useEffect, useState } from 'react';
import { addNewAddress as addAddress, deleteAddress as deleteAdd, getAddressList as getList, setDefaultAddress as setDefault, updateAddress as update } from '@/services/address';
import { Modal } from 'antd';

export type addressItem = {
  id: string;
  contacts: string;
  mobile: string;
  provinceId: string;
  provinceName: string;
  cityId: string;
  cityName: string;
  areaId: string;
  areaName: string;
  address: string;
  isDefault: boolean;
  isChecked?: boolean;
};
export type addressParams = Omit<addressItem, 'id' | 'isChecked' | 'isDefault'> & { id?: string; isDefault: 0 | 1 };
const useAddress = () => {
  const [addressList, setAddressList] = useState<addressItem[]>([]);

  const getAddressList = () => {
    getList().then((res) => {
      const result = res.data.map((item: addressItem) => ({
        ...item,
        isChecked: item.isDefault,
      }));
      setAddressList(result);
    });
  };

  useEffect(() => {
    getAddressList();
  }, []);

  const addNewAddress = (params: addressParams) => {
    addAddress(params).then((res) => {
      if (res.data) {
        getAddressList();
      }
    });
  };

  const deleteAddress = (id: string) => {
    Modal.confirm({
      content: '确认删除这个地址吗?',
      onOk() {
        deleteAdd(id).then((res) => {
          if (res.data) {
            getAddressList();
          }
        });
      },
    });
  };

  const updateAddress = (params: addressParams) => {
    update(params).then((res) => {
      if (res.data) {
        getAddressList();
      }
    });
  };

  const setDefaultAddress = (id: string) => {
    Modal.confirm({
      content: '确认将这个地址设为默认地址吗?',
      onOk() {
        setDefault(id).then((res) => {
          if (res.data) {
            getAddressList();
          }
        });
      },
    });
  };

  const updateAddressChecked = (item: addressItem) => {
    if (item.isChecked) return;
    setAddressList((state) => {
      return state.map((address) => {
        if (address.isChecked) {
          return {
            ...address,
            isChecked: false,
          };
        }
        if (address.id === item.id) {
          return {
            ...address,
            isChecked: true,
          };
        }
        return address;
      });
    });
  };

  return {
    addressList,
    setAddressList,
    addNewAddress,
    deleteAddress,
    updateAddress,
    setDefaultAddress,
    updateAddressChecked,
  };
};

export default useAddress;
