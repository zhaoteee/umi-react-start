import React from 'react';
import { Descriptions, Card } from 'antd';
import type { DetailInfo } from '@/models/detail';
import { toDecimal } from '@/utils/util';

type DetailTotalProps = {
  info: DetailInfo;
};
const DetailTotal: React.FC<DetailTotalProps> = (props) => {
  const { info } = props;
  return (
    <Card title="金额信息" className="mt-2.5">
      <Descriptions>
        <Descriptions.Item label="商品金额">{`￥${toDecimal(info.productTotal)}`}</Descriptions.Item>
        <Descriptions.Item label="积分支付">{`￥${toDecimal(info.integral)}`}</Descriptions.Item>
        <Descriptions.Item label="使用积分">{`￥${toDecimal(info.useIntegral)}`}</Descriptions.Item>
        <Descriptions.Item label="返利支付">{`￥${toDecimal(info.rebate)}`}</Descriptions.Item>
        <Descriptions.Item label="线下打款">{`￥${toDecimal(info.offline)}`}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
export default DetailTotal;
