import React, { useState, useEffect } from 'react';
import { Button, Spin, PageHeader, message } from 'antd';
import { LeftCircleFilled, RightCircleFilled, PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
// import testData from './testData';
import { useDispatch } from '@@/plugin-dva/exports';
import Slider from 'react-slick';
import { preFixPath } from '@/utils/util';
import type { Location } from 'umi';
import { useLocation } from 'umi';
import styles from './index.less';
import type { Dispatch } from '@@/plugin-dva/connect';
import { getDetail } from '@/services/info';
import type { InfoItem } from './info.d';

const GoodsInfo: React.FC = (props) => {
  const dispatch: Dispatch = useDispatch();
  const [InfoData, setData] = useState<InfoItem>({
    brandId: '',
    brandName: '',
    categoryId: '',
    centerProductId: '',
    code: '',
    createDate: '',
    id: '',
    invoicePrice: '',
    marketPrice: 0,
    salePrice: 0,
    salesNum: 0,
    stock: 0,
    subTitle: '',
    supplierId: '',
    supplierShopName: '',
    title: '',
    unit: '',
    productInfoExtDTO: {
      description: '',
      id: '',
      productId: '',
      productImages: [{ resource: '', sort: 0 }],
    },
    productAttributeDTOs: [],
  });
  const [loading, setLoading] = useState(false);
  const location: Location = useLocation();
  const { id } = props.location.query;
  const productImage = InfoData.productInfoExtDTO.productImages.map((p) => {
    if (p.resource && p.resource.indexOf('http') < 0) {
      p.resource = preFixPath + p.resource;
    }
    return p.resource;
  });
  console.log(productImage[0]);
  const [productImg, setProductImg] = useState(productImage[0]);
  const imgList = productImage;
  const [current, setCurrent] = useState(-1);
  const changeImg = (url: string, idx: number) => {
    setProductImg(url);
    setCurrent(idx);
  };

  const [totalMoney, setMoney] = useState(0);
  const addToCart = async () => {
    const hide = message.loading('正在加入购物车');
    await dispatch({
      type: 'cart/addGoodsToCart',
      payload: { productId: id, quantity: totalMoney },
    });
    setTimeout(() => {
      message.success('添加成功，请前往购物车查看');
      hide();
    }, 500);
  };
  const getDetailData = () => {
    setLoading(true);
    getDetail(id).then((res) => {
      console.log(res.data, '数据');
      const { brandId, brandName, stock, invoicePrice, title, productInfoExtDTO, productAttributeDTOs } = res.data;
      const data = {
        ...res.data,
        brandId,
        brandName,
        stock,
        invoicePrice,
        title,
        productInfoExtDTO,
        productAttributeDTOs,
      };
      setData(data);
      setLoading(false);
    });
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
  useEffect(() => {
    // const { userToken, origin = '' } = location.query as HomeQueryType;
    const userToken =
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMzA0ODg3Mjg1MSIsInRpbWUiOjE2MjUxMDE4MzA5NjIsImlzcyI6InNlY3VyaXR5IiwiaWF0IjoxNjI1MTAxODMwLCJleHAiOjE2MjUyMjE4MzB9.hXIu3K947eQluvLfENbphoBbBiZrF3eQfD8smKiKeJzTqpj6GU6dET47eRyX9BJIfbWA_0Wx4isqs8GEiIQcTg';
    if (userToken) {
      localStorage.setItem('token', userToken);
    }
    if (origin) {
      localStorage.setItem('origin', origin);
    }
    getDetailData();
  }, [location.query]);
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
              slidesToShow={imgList.length >= 5 ? 5 : imgList.length}
              slidesToScroll={imgList.length >= 5 ? 5 : imgList.length}
              variableWidth={true}
            >
              {imgList.map((url, idx) => (
                <div onClick={() => changeImg(url, idx)} key={url} className={`${current === idx ? styles.current : ''} ${styles.sliderImgItemWrap}`}>
                  <img src={url} />
                </div>
              ))}
            </Slider>
          </div>
          <div className={styles.top_right}>
            <p className={styles.right_title}>{InfoData.title}</p>
            <span>库存: {InfoData.stock}</span>
            <p className={styles.right_brandName}>{InfoData.brandName}</p>
            <div>
              <span className={styles.right_icon}>￥{InfoData.invoicePrice}</span>/ <span>{InfoData.unit}</span>
            </div>
            <div className={styles.right_symbol}>
              <MinusSquareOutlined onClick={() => toReduce(totalMoney)} style={{ fontSize: '23px' }} /> <span> {totalMoney} </span>{' '}
              <PlusSquareOutlined onClick={() => add(totalMoney)} style={{ fontSize: '23px' }} />
            </div>
            <Button type="primary" onClick={() => addToCart()}>
              加入购物车
            </Button>
            <Button type="primary">立即购买</Button>
          </div>
        </div>
        <div className={styles.attr}>
          {InfoData.productAttributeDTOs.map((it, idx) => (
            <div key={idx} className={styles.proAttr}>
              <span>
                商品属性区:
                <span>{it.attributeName}</span>:<span>{it.attributeValue}</span>
              </span>
            </div>
          ))}
          <div>
            <p>商品详情区:</p>
            <div dangerouslySetInnerHTML={{ __html: InfoData.productInfoExtDTO.description }}></div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default GoodsInfo;
