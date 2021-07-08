import React from 'react';
import SuccessPayOrder from '@/pages/cart/components/SuccessPayOrder';
import { PageHeader } from 'antd';
import type { Location } from 'umi';
import { history, useLocation } from 'umi';
import './index.less';

const PayingOrder: React.FC = () => {
  const location: Location<{ query: { orderId: string } }> = useLocation();
  return (
    <div>
      <PageHeader className="p-2.5 border-b-2 border-red-500" title="订单支付" onBack={() => history.goBack()} />
      <SuccessPayOrder orderId={location.query?.orderId as string} />
    </div>
  );
};

export default PayingOrder;
