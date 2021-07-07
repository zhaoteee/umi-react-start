import React, { useEffect } from 'react';
import { Button, Popconfirm, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import type { Loading } from '@@/plugin-dva/connect';
import { history } from 'umi';
import type { OrderModelState, DetailInfo } from '@/models/detail';
import { cancelOrder } from '@/services/order';
import DetailHeader from './components/detailHeaderItem';
import OrderHeader from './components/headerItem';
import OrderItem from './components/orderItem';
import DetailTotal from './components/detailTotalItem';
import VoucherModal from './components/voucherModal';

type detailQuery = { id: string };
type DetailProps = {
  detail: DetailInfo;
  loading: boolean;
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
  const [isShow, setIsShow] = React.useState(false);
  const { detail } = props;
  const { query } = props.location;
  const dispatch = useDispatch();
  const getData = (q) => {
    setIsShow(false);
    dispatch({
      type: 'detail/getData',
      payload: q,
    });
  };
  const handleCancelOrder = (id: string) => {
    cancelOrder(id).then(() => {
      getData(query);
      message.success('取消成功');
    });
  };
  useEffect(() => {
    getData(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <PageContainer
      loading={props.loading}
      footer={
        detail.orderStatus === 'PART_PAY' || detail.orderStatus === 'WAIT_PAY'
          ? [
              <Popconfirm title="确认取消订单吗?" onConfirm={() => handleCancelOrder(detail.id)} okText="是" cancelText="否" key="4">
                <Button>取消订单</Button>
              </Popconfirm>,
              detail.orderStatus === 'PART_PAY' && (
                <Button key="2" type="primary" onClick={() => setIsShow(true)}>
                  线下打款
                </Button>
              ),
              detail.orderStatus === 'WAIT_PAY' && (
                <Button key="3" type="primary" onClick={() => history.push(`/mall/cart/paying?orderId=${detail.id}`)}>
                  支付
                </Button>
              ),
            ]
          : []
      }
    >
      <div>
        <DetailHeader info={detail} />
        <OrderHeader headerColumns={headerColumns} />
        <OrderItem info={detail} />
        <DetailTotal info={detail} />
        <VoucherModal isShow={isShow} id={detail.id} onHandleHide={() => setIsShow(false)} onHandleOK={() => getData(query)} />
      </div>
    </PageContainer>
  );
};
export default connect(({ detail, loading }: { detail: OrderModelState; loading: Loading }) => {
  return {
    detail: detail.detail,
    loading: loading.effects['detail/getData'],
  };
})(OrderDetail);
