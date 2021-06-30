import React, { useState } from 'react';
import { Button, Spin, PageHeader } from 'antd';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
import testData from './testData';
// import goodsData from './info';
import styles from './index.less';

const GoodsInfo: React.FC = (props) => {
  console.log(props);
  const [loading] = useState(false);
  return (
    <Spin tip="加载中" spinning={loading}>
      <div className={styles.content}>
        <PageHeader className="site-page-header" backIcon={true} title="商品详情"></PageHeader>
        <div className={styles.top}>
          <div className={styles.top_left}>
            <img src="testData" alt="" />
            <div></div>
          </div>
          <div className={styles.top_right}>
            <p className={styles.right_title}>{testData.seoTitle}</p>
            <span>{testData.kc}</span>
            <span className={styles.right_brandName}>{testData.brandName}</span>
            <span>
              ￥<span className={styles.right_icon}>{testData.dw}</span>/单位
            </span>
            <div>
              {' '}
              <MinusSquareOutlined /> <span>9999</span> <PlusSquareOutlined />{' '}
            </div>
            <Button type="primary">加入购物车</Button>
            <Button type="primary">立即购买</Button>
          </div>
        </div>
        <div>底部</div>
      </div>
    </Spin>
  );
};

export default GoodsInfo;
