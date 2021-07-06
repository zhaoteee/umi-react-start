import React, { useState } from 'react';
import { Link } from 'umi';
import { preFixPath } from '@/utils/util';

import styles from '../index.less';
import type { GoodsItemType } from '../index';

type GooodsItemProps = {
  item: GoodsItemType;
  addToCart: (p: GoodsItemType) => void;
};

const GoodsItem: React.FC<GooodsItemProps> = (props) => {
  const { item, addToCart } = props;
  const productImage = item.productInfoExtDTO.productImageDTOList.map((p) => {
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
      <Link to={`/mall/goodsInfo?id=${item.id}`}>
        <div className={styles.imgWrap}>
          <img className={styles.productImg} src={productImg} />
        </div>
      </Link>
      <div className={styles.sliderIcon}>
        {imgList.map((url, idx) => (
          <div onClick={() => changeImg(url, idx)} key={url} className={`${current === idx ? styles.current : ''} ${styles.sliderImgItemWrap}`}>
            <img src={`${url}_100w`} />
          </div>
        ))}
      </div>
      <Link to={`/mall/goodsInfo?id=${item.id}`} className={styles.goodsTitle}>
        <p className="e1">{item.title || '--'}</p>
      </Link>
      <div className="between">
        <span>
          ￥{item.invoicePrice}/{item.unit}
        </span>
        <a onClick={() => addToCart(item)}>加入购物车</a>
      </div>
      <p className={styles.productStore}>{item.supplierShopName}</p>
    </div>
  );
};

export default GoodsItem;
