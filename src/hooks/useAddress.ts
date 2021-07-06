import { useCallback, useEffect, useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  // 提交订单页面当前选择的地址 id
  const [selectedAddressId, setSelectedAddressId] = useState('');

  const getAddressList = useCallback(() => {
    setLoading(true);
    getList()
      .then((res) => {
        const result = res.data.map((item: addressItem) => {
          setLoading(false);
          if (item.isDefault) {
            setSelectedAddressId(item.id);
          }
          return {
            ...item,
            isChecked: item.isDefault,
          };
        });
        setAddressList(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getAddressList();
  }, [getAddressList]);

  const addNewAddress = useCallback(
    (params: addressParams) => {
      addAddress(params).then((res) => {
        if (res.data) {
          getAddressList();
        }
      });
    },
    [getAddressList],
  );

  const deleteAddress = useCallback(
    (id: string) => {
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
    },
    [getAddressList],
  );

  const updateAddress = useCallback(
    (params: addressParams) => {
      update(params).then((res) => {
        if (res.data) {
          getAddressList();
        }
      });
    },
    [getAddressList],
  );

  const setDefaultAddress = useCallback(
    (id: string) => {
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
    },
    [getAddressList],
  );

  const updateAddressChecked = useCallback((item: addressItem) => {
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
          setSelectedAddressId(address.id);
          return {
            ...address,
            isChecked: true,
          };
        }
        return address;
      });
    });
  }, []);

  return {
    addressList,
    loading,
    setAddressList,
    addNewAddress,
    deleteAddress,
    updateAddress,
    setDefaultAddress,
    updateAddressChecked,
    selectedAddressId,
  };
};

export default useAddress;
