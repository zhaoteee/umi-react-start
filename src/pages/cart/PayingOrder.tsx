import React, { useEffect, useState } from 'react';
import type { payDetailType, orderStatusType } from '@/pages/cart/components/PaddingPayOrder';
import PaddingPayOrder from '@/pages/cart/components/PaddingPayOrder';
import { PageHeader, Spin } from 'antd';
import type { Location } from 'umi';
import { history, useLocation } from 'umi';
import { getPayDetail } from '@/services/order';
import './index.less';

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
  orderStatus: 'WAIT_PAY' as orderStatusType,
};
const PayingOrder: React.FC = () => {
  const location: Location<{ query: { orderId: string } }> = useLocation();
  const orderId = location.query?.orderId as string;
  const [payDetail, setPayDetail] = useState<payDetailType>(initialPayDetail);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPayDetail(orderId).then((res) => {
      setPayDetail(res.data);
    });
  }, [orderId]);

  return (
    <div>
      <PageHeader className="p-2.5 border-b-2 border-red-500" title="订单支付" onBack={() => history.goBack()} />
      <Spin spinning={loading}>
        <PaddingPayOrder detail={payDetail} setLoading={setLoading} orderId={orderId} />
      </Spin>
    </div>
  );
};

export default PayingOrder;
