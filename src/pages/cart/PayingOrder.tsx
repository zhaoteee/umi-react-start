import React, { useEffect, useState } from 'react';
import type { payDetailType } from '@/pages/cart/components/PaddingPayOrder';
import PaddingPayOrder from '@/pages/cart/components/PaddingPayOrder';
import { PageHeader, Spin } from 'antd';
import type { Location } from 'umi';
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
const PayingOrder: React.FC = () => {
  const location: Location<{ query: { orderId: string } }> = useLocation();
  const [payDetail, setPayDetail] = useState<payDetailType>(initialPayDetail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPayDetail(location.query?.orderId as string).then((res) => {
      setPayDetail(res.data);
    });
  }, [location.query?.orderId]);

  return (
    <div>
      <PageHeader className="p-2.5 border-b-2 border-red-500" title="订单支付" onBack={() => history.goBack()} />
      <Spin spinning={loading}>
        <PaddingPayOrder detail={payDetail} setLoading={setLoading} orderId={location.query?.orderId as string} />
      </Spin>
    </div>
  );
};

export default PayingOrder;
