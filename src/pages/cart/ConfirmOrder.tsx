import React, { useState } from 'react';
import CartHeader from '@/pages/cart/components/CartHeader';
import CartList from '@/pages/cart/components/CartList';
import { Spin, Input, PageHeader } from 'antd';
import AddressCard from '@/pages/cart/components/AddressCard';
import { toDecimal } from '@/utils/util';
import { history } from 'umi';
import EditAddressForm from '@/pages/address/components/EditAddressForm';
import useAddress from '@/hooks/useAddress';
import useBoolean from '@/hooks/useBoolean';

export type IStore = {
  handleEditAddress: (id: string) => void;
};
export const Store = React.createContext<IStore | null>(null);

const ConfirmOrder: React.FC = () => {
  const { TextArea } = Input;
  const [loading] = useState(false);
  const [isVisible, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false);
  const [currentId, setCurrentId] = useState('');
  const handleEditAddress = (id: string) => {
    setCurrentId(id);
    openModal();
  };
  const { updateAddress } = useAddress();
  return (
    <Spin spinning={loading}>
      <div>
        <PageHeader className="p-2.5 border-b-2 border-red-500" title="确认订单" onBack={() => history.goBack()} />
        <Store.Provider value={{ handleEditAddress }}>
          <AddressCard />
        </Store.Provider>
        <div className="p-2.5 font-bold">确认订单信息</div>
        <CartHeader />
        <CartList />
        <div className="flex">
          <div className="flex-shrink-0 w-16">订单备注:</div>
          <TextArea />
        </div>
        <div className="flex flex-col items-end px-2.5">
          <div className="py-4">
            <span className="font-bold mr-2.5">应付金额: </span>
            <span className="text-3xl text-red-500 font-bold">{`￥${toDecimal(800)}`}</span>
          </div>
          <div className="btn-submit" onClick={() => history.push('/mall/cart/pay')}>
            提交订单
          </div>
        </div>
        <EditAddressForm isVisible={isVisible} id={currentId} onCancel={closeModal} updateAddress={updateAddress} />
      </div>
    </Spin>
  );
};

export default ConfirmOrder;
