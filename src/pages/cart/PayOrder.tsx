import React, { useState } from 'react';
import PaddingPayOrder from '@/pages/cart/components/PaddingPayOrder';
import SuccessPayOrder from '@/pages/cart/components/SuccessPayOrder';

type OrderPayStatus = 'padding' | 'success';
const PayOrder: React.FC = () => {
  const [status] = useState<OrderPayStatus>('success');
  return (
    <div>
      <h2 className="p-2.5 border-b-2 border-red-500">订单支付</h2>
      {status === 'padding' ? <PaddingPayOrder /> : <SuccessPayOrder />}
    </div>
  );
};

export default PayOrder;
