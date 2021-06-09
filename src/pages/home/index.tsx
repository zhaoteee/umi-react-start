// import styles from './index.less';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'umi';
import type { Location } from 'umi';
import { Pagination, PageHeader, Spin } from 'antd';
import Search from './components/search';
import type { OptionsItemType } from './components/searchItem';

import goodsList from './testList';

import styles from './index.less';

const IndexPage: React.FC<{}> = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const loaction: Location = useLocation();
  const getData = (v: any) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  const onConfirmSelect = (name: string, value: string, selectedOptions: OptionsItemType[]) => {
    let params = { name, value, selectedOptions }
    getData(params)
  }
  useEffect(() => {
    getData(loaction.query)
  }, [loaction.query]);
  return (
    <Spin spinning={isLoading} tip='加载中...'>
      <div className={styles.goodsListPage}>
        <PageHeader
          className="site-page-header"
          backIcon={false}
          title="商品列表"
        />
        <Search onConfirmSelect={onConfirmSelect} />
        <div className={styles.goodsList}>
          { goodsList.map((item, idx) => {
            return <div key={idx} className={styles.product}>
              <div className={styles.imgWrap}>
                <img
                  className={styles.productImg}
                  src={item.listPicUrl} alt="" />
              </div>
              <p className='e1'>{item.name}</p>
              <div className='between'>
                <span>￥{item.retailPrice}/单位</span>
                <a>加入购物车</a>
              </div>
              <p>网易严选</p>
            </div>
          }) }
        </div>
        <div style={{textAlign: 'right'}}>
          <Pagination defaultCurrent={6} total={500} />
        </div>
      </div>
    </Spin>
  );
}

export default IndexPage