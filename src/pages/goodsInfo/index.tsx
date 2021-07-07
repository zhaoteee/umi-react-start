import React, { useState, useEffect } from 'react';
import { Button, Spin, PageHeader, message, Card } from 'antd';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';
// import testData from './testData';
import { useDispatch } from '@@/plugin-dva/exports';
// import Slider from 'react-slick';
import { preFixPath } from '@/utils/util';
import type { Location } from 'umi';
import { useLocation, Link } from 'umi';
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
  const [totalMoney, setMoney] = useState(1);
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
  useEffect(() => {
    const { userToken, origin = '' } = location.query as HomeQueryType;
    if (userToken) {
      localStorage.setItem('token', userToken);
    }
    if (origin) {
      localStorage.setItem('origin', origin);
    }
    console.log('222');
    getDetailData();
  }, [location.query]);
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
            {imgList.map((url, idx) => (
              <span onClick={() => changeImg(url, idx)} key={url} className={`${current === idx ? styles.current : ''} ${styles.sliderImgItemWrap}`}>
                <img src={`${url}_100w`} />
              </span>
            ))}
          </div>
          <div className={styles.top_right}>
            <p className={styles.right_title}>{InfoData.title}</p>
            <p className={styles.right_brandName}>品牌: {InfoData.brandName}</p>
            <span>库存: {InfoData.stock}</span>
            <div>
              <span className={styles.right_icon}>￥{InfoData.invoicePrice}</span>/ <span>{InfoData.unit}</span>
            </div>
            <div className={styles.right_symbol}>
              <MinusSquareOutlined onClick={() => toReduce(totalMoney)} style={{ fontSize: '30px' }} /> <span> {totalMoney} </span>{' '}
              <PlusSquareOutlined onClick={() => add(totalMoney)} style={{ fontSize: '30px' }} />
            </div>
            <Button type="primary" onClick={() => addToCart()}>
              加入购物车
            </Button>
            <Link to={`/mall/cart/confirm?id=${id}&quantity=${totalMoney}`}>
              <Button type="primary" danger>
                立即购买
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.attr}>
          {InfoData.productAttributeDTOs.map((it, idx) => (
            <div key={idx} className={styles.proAttr}>
              <Card title="商品属性区">
                <p>
                  <span>{it.attributeName}</span>: <span>{it.attributeValue}</span>
                </p>
              </Card>
            </div>
          ))}
          <Card title="商品详情区">
            <div style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: InfoData.productInfoExtDTO.description }}></div>
          </Card>
        </div>
      </div>
    </Spin>
  );
};

export default GoodsInfo;
