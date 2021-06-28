// import styles from './index.less';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'umi';
import { Pagination, PageHeader, Spin } from 'antd';
import Search from './components/search';
import GoodsItem from './components/goodsItem';

import type { Location } from 'umi';
import type { OptionsItemType } from './components/searchItem';
import goodsList from './testList';
import styles from './index.less';

export type GoodsItemType = {
  id: string;
  listPicUrl: string;
  name: string;
  retailPrice: string;
};
export type HomeQuery = Location['query'] & { userToken: string; origin: string };

const IndexPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loaction: Location = useLocation();
  const getData = (v: unknown) => {
    console.log(v);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const onConfirmSelect = (name: string, value: string, selectedOptions: OptionsItemType[]) => {
    const params = { name, value, selectedOptions };
    getData(params);
  };
  useEffect(() => {
    const { userToken, origin } = loaction.query as HomeQuery;
    if (userToken) {
      localStorage.setItem('token', userToken);
    }
    if (origin) {
      localStorage.setItem('origin', origin);
    }
    getData(loaction.query);
  }, [loaction.query]);
  return (
    <Spin spinning={isLoading} tip="加载中...">
      <div className={styles.goodsListPage}>
        <PageHeader className="site-page-header" backIcon={false} title="商品列表" />
        <Search onConfirmSelect={onConfirmSelect} />
        <div className={styles.goodsList}>
          {goodsList.map((item: GoodsItemType) => {
            return <GoodsItem item={item}></GoodsItem>;
          })}
        </div>
        <div style={{ textAlign: 'right' }}>
          <Pagination defaultCurrent={6} total={500} />
        </div>
      </div>
    </Spin>
  );
};

export default IndexPage;
