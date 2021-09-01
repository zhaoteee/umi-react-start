// import styles from './index.less';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'umi';
import { useDispatch } from '@@/plugin-dva/exports';
import { Pagination, Spin, Result, message } from 'antd';
import Search from './components/search';
import GoodsItem from './components/goodsItem';
import { FileSearchOutlined } from '@ant-design/icons';

import type { Location } from 'umi';
import type { SearchListType } from './components/search';
import type { Dispatch } from '@@/plugin-dva/connect';
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
  orderNum: number;
  primaryNum: number;
};
export type HomeQueryType = Location['query'] & { userToken?: string; origin?: string; keyword?: string };

type ParamsPropsType = {
  current?: number;
  size?: number;
  title?: string;
};
type SearchParamsType = {
  brandIds?: string[];
  categoryIds?: string[];
  supplierIds?: string[];
};

const IndexPage: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    size: 20,
    total: 0,
  });
  const [goodsList, setGoodsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParamsType>({});
  const location: Location = useLocation();
  const getData = (p: ParamsPropsType & SearchParamsType) => {
    setIsLoading(true);
    const { keyword = '' } = location.query as HomeQueryType;
    const query = keyword ? { title: keyword } : {};
    const params = {
      current: pageInfo.current,
      size: pageInfo.size,
      ...query,
      ...p,
    };
    getProductList(params).then((res) => {
      const data = res.data || { records: [], current: 1, size: 20, total: 0 };
      setGoodsList(data.records);
      setIsLoading(false);
      setPageInfo({
        current: Number(data.current),
        size: Number(data.size),
        total: Number(data.total),
      });
    });
  };
  const addGoodsToCart = async (p: GoodsItemType) => {
    const hide = message.loading('正在加入购物车');
    await dispatch({
      type: 'cart/addGoodsToCart',
      payload: { productId: p.id, quantity: p.orderNum || 1 },
    });
    setTimeout(() => {
      message.success('添加成功,请前往购物车查看');
      hide();
    }, 500);
  };
  const onConfirmSelect = (p: SearchListType[]) => {
    const obj = p.reduce((a, c) => {
      a[c.value] = c.options.map((op) => op.keyId);
      return a;
    }, {});
    setSearchParams(obj);
    getData(obj);
  };
  useEffect(() => {
    getData(searchParams);
    dispatch({
      type: 'cart/getCartTotalCount',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.query]);
  return (
    <Spin spinning={isLoading} tip="加载中...">
      <div className={styles.goodsListPage}>
        <Search onConfirmSelect={onConfirmSelect} />
        {goodsList.length ? (
          <>
            <div className={styles.goodsList}>
              {goodsList.map((item: GoodsItemType) => {
                return <GoodsItem key={item.id} item={item} addToCart={addGoodsToCart} />;
              })}
            </div>
            <div style={{ textAlign: 'right' }}>
              <Pagination
                current={pageInfo.current}
                pageSize={pageInfo.size}
                total={pageInfo.total}
                onChange={(page: number, pageSize?: number) => {
                  getData({ current: page, size: pageSize, ...searchParams });
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
