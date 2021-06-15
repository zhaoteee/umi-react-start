import React, { useEffect, useState } from 'react';
import CartHeader from '@/pages/cart/components/CartHeader';
import CartList from '@/pages/cart/components/CartList';
import { Spin, Input } from 'antd';
import AddressCard from '@/pages/cart/components/AddressCard';
import { useDispatch } from '@@/plugin-dva/exports';
import { toDecimal } from '@/utils/util';
import { history } from 'umi';

const ConfirmOrder: React.FC = () => {
  const { TextArea } = Input;
  const [loading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'cart/fetchCartInfo',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Spin spinning={loading}>
      <div>
        <h2 className="p-2.5 border-b-2 border-red-500">确认订单</h2>
        <AddressCard />
        <div className="p-2.5 font-bold">确认订单信息</div>
        <CartHeader />
        <CartList />
        <div className="flex">
          <div className="flex-shrink-0 w-16">订单备注: </div>
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
      </div>
    </Spin>
  );
};

export default ConfirmOrder;
