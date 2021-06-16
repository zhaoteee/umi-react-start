import React, { useState, useEffect } from 'react';
import { Pagination, PageHeader, Spin } from 'antd';
import Search from './components/searchItem';
import Tabs from './components/tabsItem';
import OrderHeader from './components/headerItem';

type orderQuery = {
  status?: number;
  keyword?: string;
};
const IndexPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

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
  useEffect(() => {
    getData();
  }, []);
  return (
    <Spin spinning={isLoading} tip="加载中...">
      <div>
        <PageHeader className="site-page-header" backIcon={false} title="我的订单" extra={<Search onConfirmSearch={onConfirmSearch} />} />
        <Tabs onConfirmChange={onConfirmChange} />
        <OrderHeader />
        <div>订单</div>
        <Pagination defaultCurrent={6} total={500} />
      </div>
    </Spin>
  );
};
export default IndexPage;
