import React, { useEffect } from 'react';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import type { OrderModelState, DetailInfo } from '@/models/detail';
import DetailHeader from './components/detailHeaderItem';
import OrderHeader from './components/headerItem';
import OrderItem from './components/orderItem';
import DetailTotal from './components/detailTotalItem';

type detailQuery = { id: string };
type DetailProps = {
  detail: DetailInfo;
  location: {
    query: detailQuery;
  };
};
const headerColumns = [
  { text: '商品', col: 12 },
  { text: '售价', col: 3 },
  { text: '数量', col: 3 },
  { text: '金额', col: 3 },
];
const OrderDetail: React.FC<DetailProps> = (props) => {
  const { detail } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'detail/getData',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PageContainer
      footer={[
        <Button key="3">取消订单</Button>,
        <Button key="2" type="primary">
          线下打款
        </Button>,
      ]}
    >
      <div>
        <DetailHeader info={detail} />
        <OrderHeader headerColumns={headerColumns} />
        <OrderItem info={detail} />
        <DetailTotal info={detail} />
      </div>
    </PageContainer>
  );
};
export default connect(({ detail }: { detail: OrderModelState }) => {
  return {
    detail: detail.detail,
  };
})(OrderDetail);
