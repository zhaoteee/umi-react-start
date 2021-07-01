import React, { useCallback, useEffect, useState } from 'react';
import CartHeader from '@/pages/cart/components/CartHeader';
import CartList from '@/pages/cart/components/CartList';
import { Spin, Input, PageHeader } from 'antd';
import AddressCard from '@/pages/cart/components/AddressCard';
import { toDecimal } from '@/utils/util';
import { history } from 'umi';
import EditAddressForm from '@/pages/address/components/EditAddressForm';
import useAddress from '@/hooks/useAddress';
import useBoolean from '@/hooks/useBoolean';
import type { CartModelState, GoodsInfo, CartItemInfo } from '@/models/cart';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import { handleCartInfo } from '@/models/cart';
import { addOrder } from '@/services/order';
import type { Loading } from '@@/plugin-dva/connect';

type ConfirmOrderProps = {
  originalList: GoodsInfo[];
  totalPrice: number;
  loading: boolean;
};
const headerColumns = [
  { text: '商品信息', col: 12 },
  { text: '单价', col: 4 },
  { text: '数量', col: 4 },
  { text: '金额', col: 4 },
];
const col = [12, 4, 4, 4];
const ConfirmOrder: React.FC<ConfirmOrderProps> = (props) => {
  const { originalList, totalPrice, loading } = props;
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const [isVisible, { setTrue: openModal, setFalse: closeModal }] = useBoolean(false);
  const [editingAddressId, setEditingAddressId] = useState('');
  const [consumerRemark, setConsumerRemark] = useState('');
  const { addressList, updateAddressChecked, updateAddress, selectedAddressId } = useAddress();
  const [selectedList, setSelectedList] = useState<CartItemInfo[]>([]);

  const handleEditAddress = useCallback(
    (id: string) => {
      setEditingAddressId(id);
      openModal();
    },
    [openModal],
  );

  useEffect(() => {
    setSelectedList(handleCartInfo(originalList.filter((item) => item.isChecked)));
  }, [originalList]);

  useEffect(() => {
    dispatch({
      type: 'cart/fetchCartInfo',
    });
  }, [dispatch]);

  const handleSubmit = () => {
    const params = {
      addressId: selectedAddressId,
      cartIds: originalList.filter((item) => item.isChecked).map((item) => item.id),
      consumerRemark,
    };
    addOrder(params).then((res: any) => {
      if (res.success) {
        history.push(`/mall/cart/pay?orderId=${res.data}`);
      }
    });
  };
  return (
    <Spin spinning={loading}>
      <div>
        <PageHeader className="p-2.5 border-b-2 border-red-500" title="确认订单" onBack={() => history.goBack()} />
        <AddressCard addressList={addressList} updateAddressChecked={updateAddressChecked} handleEditAddress={handleEditAddress} />
        <div className="p-2.5 font-bold">确认订单信息</div>
        <CartHeader hasAllChecked={false} headerColumns={headerColumns} />
        <CartList list={selectedList} canEdit={false} col={col} />
        <div className="flex">
          <div className="flex-shrink-0 w-16">订单备注:</div>
          <TextArea placeholder="请输入备注" onChange={(e) => setConsumerRemark(e.target.value)} />
        </div>
        <div className="flex flex-col items-end px-2.5">
          <div className="py-4">
            <span className="font-bold mr-2.5">应付金额: </span>
            <span className="text-3xl text-red-500 font-bold">{`￥${toDecimal(totalPrice)}`}</span>
          </div>
          <div className="btn-submit" onClick={handleSubmit}>
            提交订单
          </div>
        </div>
        <EditAddressForm isVisible={isVisible} id={editingAddressId} onCancel={closeModal} updateAddress={updateAddress} />
      </div>
    </Spin>
  );
};

const mapStateToProps = ({ cart, loading }: { cart: CartModelState; loading: Loading }) => {
  return {
    originalList: cart.originalList,
    totalPrice: cart.totalPrice,
    loading: loading.effects['cart/fetchCartInfo'],
  };
};

export default connect(mapStateToProps)(ConfirmOrder);
