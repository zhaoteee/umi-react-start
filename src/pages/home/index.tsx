// import type { GetStaticProps } from 'next'
import { Link } from 'umi';
import Layout from '@/components/layout';
import React, { useState, useEffect, useContext } from 'react';
import request from '@/utils/request';
import styles from './home.less';
import { Input } from 'antd';
import Category from '@/components/category';
import PageLoading from '@/components/pageLoading';
import type { StoreContextType } from '@/pages/app';
import { StoreContext } from '@/pages/app';

const { Search } = Input;

export type infoType = { distributorName: string };
export type FenleiType = { id: number; name: string; isHot?: boolean }[];
export type BaseType = { code: string; id: number; name: string; value: string; type: string };
export type BaseResType = {
  code: number;
  msg: string;
  classification: FenleiType;
  color: FenleiType;
  tag: FenleiType;
  base: BaseType[];
};
export type TmplItemType = { id: number; img: string; name: string };
export type PageResType = {
  code: number;
  msg: string;
  data: { current: number; size: number; total: number; records: TmplItemType[] };
};
export type PageQueryType = { location: { pathname: string; query: { type: number; name: string; id: number } } };
const Home: React.FC<PageQueryType> = (props) => {
  const { state } = useContext<StoreContextType>(StoreContext);
  const [pageLoading, setPageLoading] = useState(false);
  const [list, setList] = useState<TmplItemType[]>([]);
  const [classification, setClassification] = useState<FenleiType>([]);
  const [color, setColor] = useState<FenleiType>([]);
  const [tag, setTag] = useState<FenleiType>([]);
  const [hot, setHot] = useState<FenleiType>([]);
  useEffect(() => {
    async function init() {
      await request<BaseResType>('/api/static/base', { method: 'get' })
        .then((r) => {
          const res = r.data;
          if (res.code === 0 && res.msg === 'success') {
            const hotList = res.classification.filter((i) => i.isHot);
            setClassification(res.classification);
            setColor(res.color);
            setTag(res.tag);
            setHot(hotList);
            localStorage.setItem('hotList', JSON.stringify(hotList));
            localStorage.setItem('base', JSON.stringify(res.base));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    init();
  }, []);

  const getData = async (params: any) => {
    setPageLoading(true);
    await request<PageResType>('/api/static/page', {
      method: 'post',
      data: { current: 1, size: 20, classificationId: props.location.query.id, ...params },
    })
      .then(({ data }) => {
        if (data.code === 0 && data.msg === 'success') {
          setList(data.data.records);
        }
      })
      .catch((e) => {
        console.log(e);
      });
    setPageLoading(false);
  };
  const onSearchHandle = async (v: string) => {
    await getData({ name: v || '' });
  };
  useEffect(() => {
    getData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.query]);
  return (
    <Layout hot={hot} isShowSearchMore={true}>
      <div>
        <div className={styles.searchArea}>
          <Search placeholder="搜索词: 支付 模板 商城 帝国cms" enterButton="搜索" size="large" onSearch={onSearchHandle} />
        </div>
        <Category classification={classification} color={color} tag={tag} show={state.showSearch} />
        <div className={styles['site-layout-content']}>
          {list.map((item) => {
            return (
              <div className={styles.item} key={item.id}>
                <img width={200} height={400} src={item.img} alt={item.name} />
                <p className={styles.name}>
                  <Link to={`/detail?id=${item.id}`}>{item.name}</Link>
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <PageLoading loading={pageLoading}></PageLoading>
    </Layout>
  );
};

export default Home;
