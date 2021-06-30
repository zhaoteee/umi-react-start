// import styles from './index.less';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'umi';
import { Pagination, PageHeader, Spin, Result } from 'antd';
import Search from './components/search';
import GoodsItem from './components/goodsItem';
import { FileSearchOutlined } from '@ant-design/icons';

import type { Location } from 'umi';
import type { OptionsItemType } from './components/searchItem';
import { getProductList } from '@/services/home';

// import goodsList from './testList';
import styles from './index.less';

export type productInfoExtType = {
  id: string;
  createDate: string;
  productId: string;
  productImageDTOList: { resource: string; sort: number }[];
};

export type GoodsItemType = {
  brandId: string;
  brandName: string;
  categoryId: string;
  centerProductId: string;
  code: string;
  createDate: string;
  id: string;
  invoicePrice: string;
  marketPrice: number;
  salePrice: number;
  salesNum: number;
  stock: number;
  subTitle: string;
  supplierId: string;
  supplierShopName: string;
  title: string;
  unit: string;
  productInfoExtDTO: productInfoExtType;
};
export type HomeQuery = Location['query'] & { userToken: string; origin?: string; keyword?: string };

type ParamsPropsType = {
  current?: number;
  size?: number;
  title?: string;
};

const IndexPage: React.FC = () => {
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    size: 20,
    total: 0,
  });
  const [goodsList, setGoodsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loaction: Location = useLocation();
  const getData = (p: ParamsPropsType) => {
    setIsLoading(true);
    const params = {
      current: pageInfo.current,
      size: pageInfo.size,
      ...p,
    };
    getProductList(params).then((res) => {
      setGoodsList(res.data.records);
      setIsLoading(false);
      setPageInfo({
        current: Number(res.data.current),
        size: Number(res.data.size),
        total: Number(res.data.total),
      });
    });
  };
  const onConfirmSelect = (name: string, value: string, selectedOptions: OptionsItemType[]) => {
    const params = { name, value, selectedOptions };
    getData(params);
  };
  useEffect(() => {
    const { userToken, origin, keyword = '' } = loaction.query as HomeQuery;
    if (userToken) {
      localStorage.setItem('token', userToken);
    }
    if (origin) {
      localStorage.setItem('origin', origin);
    }
    const p = keyword ? { title: keyword } : {};
    getData(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaction.query]);
  return (
    <Spin spinning={isLoading} tip="加载中...">
      <div className={styles.goodsListPage}>
        <PageHeader className="site-page-header" backIcon={false} title="商品列表" />
        <Search onConfirmSelect={onConfirmSelect} />
        {goodsList.length ? (
          <>
            <div className={styles.goodsList}>
              {goodsList.map((item: GoodsItemType) => {
                return <GoodsItem key={item.id} item={item}></GoodsItem>;
              })}
            </div>
            <div style={{ textAlign: 'right' }}>
              <Pagination
                current={pageInfo.current}
                pageSize={pageInfo.size}
                total={pageInfo.total}
                onChange={(page: number, pageSize?: number) => {
                  console.log(page, pageSize);
                  getData({ current: page, size: pageSize });
                }}
              />
            </div>
          </>
        ) : (
          <Result icon={<FileSearchOutlined className="text-gray-200" />} subTitle="暂无数据" />
        )}
      </div>
    </Spin>
  );
};

export default IndexPage;
