// import styles from './index.less';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'umi';
import type { Location } from 'umi';
import { Pagination } from 'antd';

import goodsList from './testList';

import styles from './index.less';

const getData = (v: any) => {
  console.log(v)
}
export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(false)
  const loaction: Location = useLocation();
  useEffect(() => {
    getData(loaction.query)
  }, [loaction.query]);
  return (
    <div className={styles.goodsListPage}>
      <p>商品列表</p>
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
  );
}
