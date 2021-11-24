import React, { useState, useEffect } from 'react';
import { Pagination, PageHeader, Spin, Result, Button } from 'antd';
import Search from './components/searchItem';
import Tabs from './components/tabsItem';
import OrderHeader from './components/headerItem';
import OrderList from './components/orderList';
import { statusMap } from '@/models/order';
import { FileSearchOutlined } from '@ant-design/icons';
import { getOrderList, exportIntegral } from '@/services/order';
import { preFixPath } from '@/utils/util';

type orderQuery = {
  orderStatus?: string;
  keyword?: string;
  current?: number;
  size?: number;
  title?: string;
  orderStatusList?: string[] | string;
};
const IndexPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    size: 20,
    total: 0,
  });
  const integralExport = (p: orderQuery) => {
    setIsLoading(true);
    const params = {
      current: pageInfo.current,
      size: pageInfo.size,
      title: keyword,
      ...p,
    };
    params.orderStatusList = params.orderStatus ? params.orderStatus.split(',') : [];
    delete params.orderStatus;
    exportIntegral(params).then(() => {
      window.open('/setting/export/list');
      setIsLoading(false);
    });
  };
  const getData = (p: orderQuery) => {
    setIsLoading(true);
    const params = {
      current: pageInfo.current,
      size: pageInfo.size,
      title: keyword,
      ...p,
    };
    params.orderStatusList = params.orderStatus ? params.orderStatus.split(',') : [];
    delete params.orderStatus;
    getOrderList(params)
      .then((res) => {
        const data = res.data || { records: [], current: 1, size: 20, total: 0 };
        const { current, total, size } = data;
        const list = (data.records || []).map((item: any) => {
          return {
            id: item.id,
            sn: item.sn,
            createDate: item.createDate,
            orderStatus: item.orderStatus,
            supplierName: item.supplierName,
            statusText: statusMap[item.orderStatus],
            freightFee: item.freightFee,
            receivableAmount: item.receivableAmount,
            hasOperate: true,
            integralOrderItemDTOs: (item.integralOrderItemDTOs || []).map((cell: any) => {
              if (cell.images && cell.images.indexOf('http') < 0) {
                cell.images = preFixPath + cell.images;
              }
              return {
                ...cell,
              };
            }),
          };
        });
        setOrderList(list);
        setIsLoading(false);
        setPageInfo({
          current: Number(current),
          size: Number(size),
          total: Number(total),
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onConfirmSearch = (val: string) => {
    setKeyword(val);
    getData({ title: val, current: 1 });
  };
  const onConfirmChange = (val: string) => {
    getData({
      orderStatus: val,
      current: 1,
    });
  };
  useEffect(() => {
    getData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Spin spinning={isLoading} tip="加载中...">
      <div>
        <PageHeader className="site-page-header" backIcon={false} extra={<Search onConfirmSearch={onConfirmSearch} />} />
        <div className="text-right  mr">
          <Button onClick={() => integralExport(pageInfo)} type="primary">
            导出
          </Button>
        </div>
        <Tabs onConfirmChange={onConfirmChange} />
        {orderList.length ? (
          <>
            <OrderHeader />
            <OrderList list={orderList} onHandleCancel={() => getData({})} />
            <Pagination
              current={pageInfo.current}
              pageSize={pageInfo.size}
              total={pageInfo.total}
              className="text-right mt-5"
              onChange={(page: number, pageSize?: number) => {
                getData({ current: page, size: pageSize });
              }}
            />
          </>
        ) : (
          <Result icon={<FileSearchOutlined className="text-gray-200" />} subTitle="暂无数据" />
        )}
      </div>
    </Spin>
  );
};
export default IndexPage;
