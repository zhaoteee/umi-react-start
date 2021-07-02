import React from 'react';
import SuccessPayOrder from '@/pages/cart/components/SuccessPayOrder';
import { PageHeader } from 'antd';
import { history, useLocation } from 'umi';

const PayingOrder: React.FC = () => {
  const location: any = useLocation();
  return (
    <div>
      <PageHeader className="p-2.5 border-b-2 border-red-500" title="订单支付" onBack={() => history.goBack()} />
      <SuccessPayOrder orderId={location.query.orderId} />
    </div>
  );
};

export default PayingOrder;
