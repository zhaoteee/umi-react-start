// import styles from './index.less';
import React, { useState } from 'react';
import goodsList from './testList';

import styles from './index.less';


export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(false)
  console.log(goodsList)
  return (
    <div>
      <p>商品列表</p>
      <div className={styles.goodsList}>
        { goodsList.map((item, idx) => {
          return <div key={idx} className={styles.product}>
            <div>
              <img
                style={{maxWidth: '100%', maxHeight: '210px'}}
                src={item.listPicUrl} alt="" />
            </div>
            <p>{item.name}</p>
          </div>
        }) }
      </div>
    </div>
  );
}
