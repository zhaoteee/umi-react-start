// import type { GetStaticProps } from 'next'
import { Link } from 'umi';
import React, { useState, useEffect, useContext } from 'react';
import request from '@/utils/request';
import styles from './home.less';
import { Input, Pagination } from 'antd';
import Category from '@/components/category';
import PageLoading from '@/components/pageLoading';
import type { StoreContextType } from '@/components/layout';
import { StoreContext } from '@/components/layout';

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
export type PageQueryType = { location: { pathname: string; query: { f?: string; y?: string; t?: string } } };
const Home: React.FC<PageQueryType> = (props) => {
  const { state, dispatch } = useContext<StoreContextType>(StoreContext);
  const [pageLoading, setPageLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<TmplItemType[]>([]);
  const [classification, setClassification] = useState<FenleiType>([]);
  const [color, setColor] = useState<FenleiType>([]);
  const [tag, setTag] = useState<FenleiType>([]);
  useEffect(() => {
    async function init() {
      await request<BaseResType>('/api/static/base', { method: 'get' })
        .then((r) => {
          const res = r.data;
          if (res.code === 0 && res.msg === 'success') {
            const hotList = res.classification.filter((i) => i.isHot);
            setClassification([{ id: 0, name: '不限' }, ...res.classification]);
            setColor([{ id: 0, name: '不限' }, ...res.color]);
            setTag([{ id: 0, name: '不限' }, ...res.tag]);
            dispatch({ type: 'SET_HOTLIST', data: hotList });
            localStorage.setItem('hotList', JSON.stringify(hotList));
            localStorage.setItem('base', JSON.stringify(res.base));
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    init();
  }, [dispatch]);
  const getQueryInfo = (): { classificationId: number | null; colorId: number | null; tagId: number | null } => {
    const { f, y, t } = props.location.query; // 分类 颜色 tag
    const obj = { classificationId: 0, colorId: 0, tagId: 0 };
    if (f) {
      obj.classificationId = Number(f.split(',')[0]);
    }
    if (y) {
      obj.colorId = Number(y.split(',')[0]);
    }
    if (t) {
      obj.tagId = Number(t.split(',')[0]);
    }
    return obj;
  };
  const getData = async (params: any) => {
    setPageLoading(true);
    const p = getQueryInfo();
    if (p.classificationId === 0) p.classificationId = null;
    if (p.colorId === 0) p.colorId = null;
    if (p.tagId === 0) p.tagId = null;
    await request<PageResType>('/api/static/page', {
      method: 'post',
      data: { current, size: pageSize, ...params, ...p },
    })
      .then(({ data }) => {
        if (data.code === 0 && data.msg === 'success') {
          setList(data.data.records);
          setTotal(data.data.total);
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
  const onPageChange = (v: number, pagesize?: number) => {
    setCurrent(v);
    if (pagesize) {
      getData({ current, size: pagesize });
      setPageSize(pagesize);
    } else {
      getData({ current });
    }
  };
  useEffect(() => {
    getData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.query]);
  return (
    <div>
      <div>
        <div className={styles.searchArea}>
          <Search placeholder="搜索词: 支付 模板 商城" enterButton="搜索" size="large" onSearch={onSearchHandle} />
        </div>
        <Category classification={classification} color={color} tag={tag} show={state.showSearch} />
        <div className={styles['site-layout-content']}>
          {list.map((item) => {
            return (
              <div className={styles.item} key={item.id}>
                <Link to={`/detail?id=${item.id}`}>
                  <img width={200} height={400} src={item.img} alt={item.name} />
                </Link>
                <p className={styles.name}>
                  <Link to={`/detail?id=${item.id}`}>{item.name}</Link>
                </p>
              </div>
            );
          })}
        </div>
        <div style={{ paddingTop: '16px', textAlign: 'right' }}>
          <Pagination showTotal={(t) => `总计 ${t} 条`} showQuickJumper current={current} pageSize={pageSize} total={total} onChange={onPageChange} />
        </div>
      </div>
      <PageLoading loading={pageLoading}></PageLoading>
    </div>
  );
};

export default Home;
