import React, { useState, useEffect } from 'react';
import { Pagination, PageHeader, Spin, Result } from 'antd';
import { connect, useDispatch } from '@@/plugin-dva/exports';
import Search from './components/searchItem';
import Tabs from './components/tabsItem';
import OrderHeader from './components/headerItem';
import OrderList from './components/orderList';
import type { OrderModelState, OrderItemInfo } from '@/models/order';
import { FileSearchOutlined } from '@ant-design/icons';

type orderQuery = {
  status?: number;
  keyword?: string;
};
type OrderProps = {
  list: OrderItemInfo[];
};
const IndexPage: React.FC<OrderProps> = (props) => {
  console.log(props);
  const [isLoading, setIsLoading] = useState(false);
  const { list } = props;
  const getData = (params: orderQuery) => {
    console.log(params);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const onConfirmSearch = (val: string) => {
    console.log(val);
    getData({ keyword: val });
  };
  const onConfirmChange = (val: number) => {
    console.log('状态：', val);
    getData({ status: val });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'order/getData',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Spin spinning={isLoading} tip="加载中...">
      <div>
        <PageHeader className="site-page-header" backIcon={false} title="我的订单" extra={<Search onConfirmSearch={onConfirmSearch} />} />
        <Tabs onConfirmChange={onConfirmChange} />
        {list.length ? (
          <>
            <OrderHeader />
            <OrderList />
            <Pagination defaultCurrent={6} total={500} className="text-right mt-5" />
          </>
        ) : (
          <Result icon={<FileSearchOutlined className="text-gray-200" />} subTitle="暂无数据" />
        )}
      </div>
    </Spin>
  );
};
export default connect(({ order }: { order: OrderModelState }) => {
  return {
    list: order.list,
  };
})(IndexPage);
