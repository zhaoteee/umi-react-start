import React, { useState } from 'react';
import { Button, Spin, PageHeader, message } from 'antd';
import { LeftCircleFilled, RightCircleFilled, PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
import testData from './testData';
import { useDispatch } from '@@/plugin-dva/exports';
import Slider from 'react-slick';
// import { preFixPath } from '@/utils/util';
// import goodsData from './info';
import styles from './index.less';
import type { Dispatch } from '@@/plugin-dva/connect';

const GoodsInfo: React.FC = (props) => {
  const dispatch: Dispatch = useDispatch();
  console.log(props);
  const [loading] = useState(false);
  const [productImg, setProductImg] = useState(testData.imgUrls[0]);
  const [current, setCurrent] = useState(-1);
  const changeImg = (url: string, idx: number) => {
    setProductImg(url);
    setCurrent(idx);
  };
  const [totalMoney, setMoney] = useState(1);
  const addToCart = async (item: any) => {
    const hide = message.loading('正在加入购物车');
    await dispatch({
      type: 'cart/addGoodsToCart',
      payload: { productId: item.id, quantity: 1 },
    });
    setTimeout(() => {
      message.success('添加成功，请前往购物车查看');
      hide();
    }, 500);
  };
  const toReduce = (s: any) => {
    if (totalMoney === 0) {
      message.warning('已经没有可减的的了!');
      return;
    }
    setMoney((s -= 1));
  };
  const add = (s: any) => {
    setMoney((s += 1));
  };
  return (
    <Spin tip="加载中" spinning={loading}>
      <div className={styles.content}>
        <PageHeader className="site-page-header" backIcon={true} title="商品详情"></PageHeader>
        <div className={styles.top}>
          <div className={styles.top_left}>
            <div className={styles.top_img}>
              <img src={productImg} alt="" />
            </div>
            <Slider
              className={styles.sliderIcon}
              prevArrow={<LeftCircleFilled />}
              nextArrow={<RightCircleFilled />}
              dots={false}
              infinite={false}
              speed={300}
              slidesToShow={testData.imgUrls.length >= 5 ? 5 : testData.imgUrls.length}
              slidesToScroll={testData.imgUrls.length >= 5 ? 5 : testData.imgUrls.length}
              variableWidth={true}
            >
              {testData.imgUrls.map((url, idx) => (
                <div onClick={() => changeImg(url, idx)} key={url} className={`${current === idx ? styles.current : ''} ${styles.sliderImgItemWrap}`}>
                  <img src={url} />
                </div>
              ))}
            </Slider>
          </div>
          <div className={styles.top_right}>
            <p className={styles.right_title}>{testData.seoTitle}</p>
            <span>库存: {testData.kc}</span>
            <p className={styles.right_brandName}>{testData.brandName}</p>
            <div>
              <span className={styles.right_icon}>￥{testData.dw}</span>/单位
            </div>
            <div className={styles.right_symbol}>
              <MinusSquareOutlined onClick={() => toReduce(totalMoney)} style={{ fontSize: '23px' }} /> <span> {totalMoney} </span>{' '}
              <PlusSquareOutlined onClick={() => add(totalMoney)} style={{ fontSize: '23px' }} />
            </div>
            <Button type="primary" onClick={() => addToCart(testData)}>
              加入购物车
            </Button>
            <Button type="primary">立即购买</Button>
          </div>
        </div>
        <div>底部</div>
      </div>
    </Spin>
  );
};

export default GoodsInfo;
