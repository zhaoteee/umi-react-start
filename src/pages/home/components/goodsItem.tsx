import React, { useState } from 'react';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import Slider from 'react-slick';

import styles from '../index.less';
import type { GoodsItemType } from '../index';

type GooodsItemProps = {
  item: GoodsItemType;
};

const IndexPage: React.FC<GooodsItemProps> = (props) => {
  const { item } = props;
  const [productImg, setProductImg] = useState(item.listPicUrl);
  const [current, setCurrent] = useState(-1);
  const imgList = [
    'https://yanxuan-item.nosdn.127.net/a8debbec93ce14e944d87cef0f998b85.jpg',
    'https://yanxuan-item.nosdn.127.net/479ab79d9a8ae282c6567bcf0a5de048.jpg',
    'https://yanxuan-item.nosdn.127.net/6bed55c2cb9d38c33685048b4a54812b.jpg',
  ];
  const changeImg = (url: string, idx: number) => {
    setProductImg(url);
    setCurrent(idx);
  };
  return (
    <div key={item.id} className={styles.product}>
      <div className={styles.imgWrap}>
        <img className={styles.productImg} src={productImg} />
      </div>
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
            <img src={url} />
          </div>
        ))}
      </Slider>
      <p className="e1">{item.name}</p>
      <div className="between">
        <span>￥{item.retailPrice}/单位</span>
        <a>加入购物车</a>
      </div>
      <p>网易严选</p>
    </div>
  );
};

export default IndexPage;
