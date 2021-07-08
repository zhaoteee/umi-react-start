import React, { useState, useEffect } from 'react';
import { Button, Spin, PageHeader, message, Card, InputNumber } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from '@@/plugin-dva/exports';
import { preFixPath } from '@/utils/util';
import type { Location } from 'umi';
import { useLocation, Link } from 'umi';
import styles from './index.less';
import type { Dispatch } from '@@/plugin-dva/connect';
import { getDetail } from '@/services/info';
import type { InfoItem } from './info.d';

const GoodsInfo: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const [InfoData, setData] = useState<InfoItem>({
    brandId: '',
    brandName: '',
    id: '',
    invoicePrice: '',
    stock: 0,
    supplierId: '',
    title: '',
    unit: '',
    productInfoExtDTO: {
      description: '',
      id: '',
      productId: '',
      productImages: [{ resource: '', sort: 0 }],
    },
    productAttributeDTOs: [{ attributeName: '', attributeValue: '' }],
  });
  const [loading, setLoading] = useState(false);
  const location: Location<{ query: { id: string } }> = useLocation();
  const id = location.query?.id as string;
  const productImage = InfoData.productInfoExtDTO.productImages.map((p) => {
    if (p.resource && p.resource.indexOf('http') < 0) {
      p.resource = preFixPath + p.resource;
    }
    return p.resource;
  });
  console.log(productImage[0]);
  const [productImg, setProductImg] = useState('');
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
      const img = preFixPath + res.data.productInfoExtDTO.productImages[0].resource;
      setProductImg(img);
      setData(data);
      setLoading(false);
    });
  };
  useEffect(() => {
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
  const onchange = (e: any) => {
    if (e > InfoData.stock) {
      message.warning('暂无这么多库存!');
    }
    setMoney(e);
  };

  return (
    <Spin tip="加载中" spinning={loading}>
      <div className={styles.content}>
        <PageHeader className="site-page-header" title="商品详情"></PageHeader>
        <div className={styles.top}>
          <div className={styles.top_left}>
            <div className={styles.top_img}>
              <img src={productImg} alt="" />
            </div>
            <div className={styles.top_smallImg}>
              {imgList.map((url, idx) => (
                <div onClick={() => changeImg(url, idx)} key={url} className={`${current === idx ? styles.current : ''} ${styles.sliderImgItemWrap}`}>
                  <img src={`${url}_100w`} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.top_right}>
            <h1 className={styles.right_title}>{InfoData.title}</h1>
            <p className={styles.right_brandName}>
              品牌 <span className={styles.right_common}>{InfoData.brandName}</span>
            </p>
            <p className={styles.right_stock}>
              库存 <span className={styles.right_common}>{InfoData.stock}</span>
            </p>
            <div className={styles.right_money}>
              价格 <span className={styles.right_icon}>￥{InfoData.invoicePrice}</span> /<span>{InfoData.unit}</span>
            </div>
            <div className={styles.right_symbol}>
              <span style={{ marginRight: '30px' }}>数量</span>
              <InputNumber defaultValue={1} min={1} onChange={onchange} />
            </div>
            <Button danger onClick={() => addToCart()}>
              加入购物车
            </Button>
            <Link to={`/mall/cart/confirm?id=${id}&quantity=${totalMoney}`}>
              <Button type="primary">
                <ShoppingCartOutlined />
                立即购买
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.attr}>
          <Card title="商品属性" className={styles.proIn}>
            {InfoData.productAttributeDTOs.map((it, idx) => (
              <div key={idx} className={styles.proAttr}>
                <span>{it.attributeName}</span>: <span>{it.attributeValue}</span>
              </div>
            ))}
          </Card>
          <Card title="商品详情">
            <div style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: InfoData.productInfoExtDTO.description }}></div>
          </Card>
        </div>
      </div>
    </Spin>
  );
};

export default GoodsInfo;
