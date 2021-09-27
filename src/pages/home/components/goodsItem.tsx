import React, { useState } from 'react';
import { Link } from 'umi';
import { preFixPath } from '@/utils/util';
import { Button } from 'antd';

import styles from '../index.less';
import type { GoodsItemType } from '../index';

type GooodsItemProps = {
  item: GoodsItemType;
  addToCart: (p: GoodsItemType) => void;
};

const GoodsItem: React.FC<GooodsItemProps> = (props) => {
  const { item, addToCart } = props;
  const productImage = (item.productInfoExtDTO.productImageDTOList || []).map((p) => {
    if (p.resource && p.resource.indexOf('http') < 0) {
      p.resource = preFixPath + p.resource;
    }
    return p.resource;
  });
  const [productImg, setProductImg] = useState(productImage[0]);
  const [current, setCurrent] = useState(-1);
  // 暂时最多5张商品图片
  const imgList = productImage.slice(0, 5);
  const changeImg = (url: string, idx: number) => {
    setProductImg(url);
    setCurrent(idx);
  };
  return (
    <div key={item.id} className={styles.product}>
      <Link to={`/mall/goodsInfo?id=${item.id}`} target="_blank">
        <div className={styles.imgWrap}>
          <img className={styles.productImg} src={productImg} />
        </div>
      </Link>
      <div className={styles.sliderIcon}>
        {imgList.map((url, idx) => (
          <div onClick={() => changeImg(url, idx)} key={idx} className={`${current === idx ? styles.current : ''} ${styles.sliderImgItemWrap}`}>
            <img src={`${url}_100w`} />
          </div>
        ))}
      </div>

      <Link to={`/mall/goodsInfo?id=${item.id}`} target="_blank" className={styles.goodsTitle}>
        <p className="e2">{item.title || '--'}</p>
      </Link>
      <p className={styles.productStore}>{item.supplierShopName}</p>
      <div className={`between ${styles.footerInfo}`}>
        <div className={styles.goodsPrice}>
          <span className={styles.priceIcon}>￥</span>
          {item.invoicePrice}
          <span className={styles.priceUnit}> / {item.unit}</span>
        </div>
        <Button type="primary" onClick={() => addToCart(item)}>
          加入购物车
        </Button>
      </div>
    </div>
  );
};

export default GoodsItem;
