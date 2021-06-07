// import styles from './index.less';
import React, { useState } from 'react';

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <div>
      <p>商品列表</p>
      <div className='goodsList'>
        <div className='goodsItem'>
        </div>
      </div>
    </div>
  );
}
