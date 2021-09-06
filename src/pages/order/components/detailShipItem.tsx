import React from 'react';
import { Descriptions, Card } from 'antd';
import type { DetailInfo } from '@/models/detail';

type DetailTotalProps = {
  info: DetailInfo;
};
const DetailTotal: React.FC<DetailTotalProps> = (props) => {
  const { info } = props;
  return (
    <Card title="物流信息" className="mt-2.5">
      <Descriptions>
        {info.shipDTOList.map((item) => {
          return (
            <>
              <Descriptions.Item label="发货仓库">{item.shipStoreHouse}</Descriptions.Item>
              <Descriptions.Item label="物流公司">{item.expressName}</Descriptions.Item>
              <Descriptions.Item label="物流单号">{item.expressNo}</Descriptions.Item>
            </>
          );
        })}
      </Descriptions>
    </Card>
  );
};
export default DetailTotal;
