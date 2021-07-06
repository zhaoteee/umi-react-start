import React, { useState, useEffect } from 'react';
import { Pagination, PageHeader, Spin, Result } from 'antd';
import Search from './components/searchItem';
import Tabs from './components/tabsItem';
import OrderHeader from './components/headerItem';
import OrderList from './components/orderList';
import { statusMap } from '@/models/order';
import { FileSearchOutlined } from '@ant-design/icons';
import { getOrderList } from '@/services/order';
import { preFixPath } from '@/utils/util';

type orderQuery = {
  status?: number;
  keyword?: string;
  current?: number;
  size?: number;
};
const IndexPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    size: 20,
    total: 0,
  });
  const getData = (p: orderQuery) => {
    setIsLoading(true);
    const params = {
      current: pageInfo.current,
      size: pageInfo.size,
      title: keyword,
      orderStatus: status,
      ...p
    }
    getOrderList(params).then((res) => {
      const data = res.data || { records: [], current: 1, size: 20, total: 0 };
      const { current, total, size } = data
      const list = (data.records || []).map(item => {
        return {
          id: item.id,
          sn: item.sn,
          createDate: item.createDate,
          supplierName: item.supplierName,
          statusText: statusMap[item.orderStatus],
          hasOperate: true,
          integralOrderItemDTOs: (item.integralOrderItemDTOs || []).map(cell => {
            if (cell.images && cell.images.indexOf('http') < 0) {
              cell.images = preFixPath + cell.images;
            }
            return {
              ...cell
            }
          })
        }
      })
      setOrderList(list);
      setIsLoading(false);
      setPageInfo({
        current: Number(current),
        size: Number(size),
        total: Number(total)
      });
    }).catch(e => {
      console.log(e);
    });
  };
  const onConfirmSearch = (val: string) => {
    setKeyword(val);
    getData({keyword: val, current: 1});
  };
  const onConfirmChange = (val: number) => {
    setStatus(Number(val));
    getData({
      orderStatus: Number(val),
      current: 1
    });
  };
  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Spin spinning={isLoading} tip="加载中...">
      <div>
        <PageHeader className="site-page-header" backIcon={false} title="我的订单" extra={<Search onConfirmSearch={onConfirmSearch} />} />
        <Tabs onConfirmChange={onConfirmChange} />
        {orderList.length ? (
          <>
            <OrderHeader />
            <OrderList list={orderList}/>
            <Pagination 
              defaultCurrent={pageInfo.current} 
              total={pageInfo.total} 
              className="text-right mt-5" 
              onChange={(page: number, pageSize?: number) => {
                getData({ current: page, size: pageSize });
              }}/>
          </>
        ) : (
          <Result icon={<FileSearchOutlined className="text-gray-200" />} subTitle="暂无数据" />
        )}
      </div>
    </Spin>
  );
};
export default IndexPage;
