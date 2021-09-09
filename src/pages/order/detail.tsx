import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import type { Loading } from '@@/plugin-dva/connect';
import type { OrderModelState, DetailInfo } from '@/models/detail';
import DetailHeader from './components/detailHeaderItem';
import OrderHeader from './components/headerItem';
import OrderItem from './components/orderItem';
import DetailTotal from './components/detailTotalItem';
import DetailFooter from './components/detailFooterItem';
import VoucherModal from './components/voucherModal';
import DetailShip from './components/detailShipItem';

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
  const getData = (q: any) => {
    setIsShow(false);
    dispatch({
      type: 'detail/getData',
      payload: q,
    });
  };
  useEffect(() => {
    getData(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <PageContainer loading={props.loading}>
      <div>
        <DetailHeader info={detail} />
        <OrderHeader headerColumns={headerColumns} />
        <OrderItem info={detail} />
        {detail.shipDTOList.length > 0 && <DetailShip info={detail} />}
        <DetailTotal info={detail} />
        {(detail.orderStatus === 'PART_PAY' || detail.orderStatus === 'WAIT_PAY') && (
          <div className="mt-5 mb-5">
            <DetailFooter info={detail} onHandleCancel={() => getData(query)} onHandleShow={() => setIsShow(true)} />
          </div>
        )}
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
