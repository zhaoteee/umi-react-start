import React from 'react';
import { PageHeader, Descriptions } from 'antd';
import type { DetailInfo } from '@/models/detail';
import { toDecimal } from '@/utils/util';
import { history } from 'umi';

type DetailHeaderProp = {
  info: DetailInfo;
};
const DetailHeader: React.FC<DetailHeaderProp> = (props) => {
  const { info } = props;
  return (
    <>
      <PageHeader
        className="site-page-header"
        title={`订单号：${info.sn}`}
        ghost={false}
        onBack={() => history.goBack()}
        extra={<span className="text-red-500 text-2xl">{`￥${toDecimal(info.receivableAmount)}`}</span>}
      />
      <Descriptions className="bg-gray-50 p-2 pb-0 mb-2.5 border-t-2 border-red-500">
        <Descriptions.Item label="下单时间">{info.createDate}</Descriptions.Item>
        <Descriptions.Item label="支付时间">{info.payDate}</Descriptions.Item>
        <Descriptions.Item label="发货时间">{info.shipDate}</Descriptions.Item>
        <Descriptions.Item label="收货人信息" span={3}>
          {info.receiverContactName}-{info.address}-{info.receiverContactPhone}
        </Descriptions.Item>
        {info.sellerRemark && (
          <Descriptions.Item label="买家备注" span={3}>
            {info.sellerRemark}
          </Descriptions.Item>
        )}
      </Descriptions>
    </>
  );
};
export default DetailHeader;
