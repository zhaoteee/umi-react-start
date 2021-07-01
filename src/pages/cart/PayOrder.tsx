import React, { useEffect, useState } from 'react';
import type { payDetailType } from '@/pages/cart/components/PaddingPayOrder';
import PaddingPayOrder from '@/pages/cart/components/PaddingPayOrder';
import SuccessPayOrder from '@/pages/cart/components/SuccessPayOrder';
import { PageHeader } from 'antd';
import { history, useLocation } from 'umi';
import { getPayDetail } from '@/services/order';

export type OrderPayStatus = 'padding' | 'success';
const initialPayDetail = {
  distributorIntegralPayEnable: true, // 是否开启经销商积分支付
  distributorRebatePayEnable: false, // 是否开启经销商返利支付
  distributorRebatePayBankAccountName: '', // 经销商返利支付开户名称
  distributorRebatePayBankAccountNum: '', // 经销商返利支付开户账号
  distributorRebatePayBankName: '', // 经销商返利支付开户行名称
  integral: 0, // 积分
  integralAmount: 0, // 积分抵扣金额
  rebateAmount: 0, // 返利抵扣金额
  supplierName: '', // 下单店铺名称
  totalAmount: 0, // 订单总金额
  totalRebate: 0,
  totalIntegral: 0,
};
const PayOrder: React.FC = () => {
  const location: any = useLocation();
  const [payDetail, setPayDetail] = useState<payDetailType>(initialPayDetail);

  useEffect(() => {
    getPayDetail(location.query.orderId).then((res) => {
      setPayDetail(res.data);
    });
  }, [location.query.orderId]);

  const [status, setStatus] = useState<OrderPayStatus>('padding');
  return (
    <div>
      <PageHeader className="p-2.5 border-b-2 border-red-500" title="订单支付" onBack={() => history.goBack()} />
      {status === 'padding' ? <PaddingPayOrder detail={payDetail} setStatus={setStatus} orderId={location.query.orderId} /> : <SuccessPayOrder orderId={location.query.orderId} />}
    </div>
  );
};

export default PayOrder;
