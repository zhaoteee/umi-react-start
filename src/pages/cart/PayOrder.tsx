import React, { useState } from 'react';
import PaddingPayOrder from '@/pages/cart/components/PaddingPayOrder';
import SuccessPayOrder from '@/pages/cart/components/SuccessPayOrder';
import { PageHeader } from 'antd';
import { history } from 'umi';

type OrderPayStatus = 'padding' | 'success';
const PayOrder: React.FC = () => {
  const [status] = useState<OrderPayStatus>('success');
  return (
    <div>
      <PageHeader className="p-2.5 border-b-2 border-red-500" title="订单支付" onBack={() => history.goBack()} />
      {status === 'padding' ? <PaddingPayOrder /> : <SuccessPayOrder />}
    </div>
  );
};

export default PayOrder;
