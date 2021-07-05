import React, { useState } from 'react';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { Link } from 'umi';
import Slider from 'react-slick';
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
  const imgList = productImage;
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
      <Slider
        className={styles.sliderIcon}
        prevArrow={<LeftCircleFilled />}
        nextArrow={<RightCircleFilled />}
        dots={false}
        infinite={false}
        speed={300}
        slidesToShow={imgList.length >= 5 ? 5 : imgList.length}
        slidesToScroll={imgList.length >= 5 ? 5 : imgList.length}
        variableWidth={true}
      >
        {imgList.map((url, idx) => (
          <div onClick={() => changeImg(url, idx)} key={url} style={{ width: 35 }} className={`${current === idx ? styles.current : ''} ${styles.sliderImgItemWrap}`}>
            <img src={`${url}_100w`} />
          </div>
        ))}
      </Slider>
      <Link to={`/mall/goodsInfo?id=${item.id}`} className={styles.goodsTitle}>
        <p className="e1">{item.title || '--'}</p>
      </Link>
      <div className="between">
        <span>
          ￥{item.salePrice}/{item.unit}
        </span>
        <a onClick={() => addToCart(item)}>加入购物车</a>
      </div>
      <p className={styles.productStore}>{item.supplierShopName}</p>
    </div>
  );
};

export default GoodsItem;
