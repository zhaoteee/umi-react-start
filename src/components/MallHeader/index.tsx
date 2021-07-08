import React, { useState } from 'react';
import { Input } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import type { ConnectState, CartModelState } from '@/models/connect';
import type { HomeQueryType } from '@/pages/home/index';
import { connect, Link, history, useLocation } from 'umi';
import type { Location } from 'umi';
import logo from '@/assets/images/logo.png';
import cartIcon from '@/assets/images/cart-icon.png';

import styles from './index.less';

const { Search } = Input;
export type MallHeaderType = {
  cart: CartModelState;
};

const MallHeader: React.FC<MallHeaderType> = (props) => {
  const loaction: Location = useLocation();
  const { keyword = '' } = loaction.query as HomeQueryType;
  const [val, setVal] = useState(keyword);
  const onSearch = (v: string) => {
    if (v) {
      history.replace(`/mall?keyword=${decodeURIComponent(v)}`);
    } else {
      history.push(`/mall`);
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };
  const { cart } = props;
  return (
    <div className="between">
      <div className="fleft">
        <div className={styles.title}>
          <Link to="/">
            <img src={logo} alt="采购商城" />
          </Link>
        </div>
        <div className="fleft">
          <Search className={styles.serachInput} allowClear enterButton="搜索" value={val} onChange={onChange} onSearch={onSearch} placeholder="请输入商品名称" />
        </div>
      </div>
      <div className={styles.orderInfo}>
        <Link className={styles.mycart} to="/mall/cart">
          <img style={{ width: '16px', marginRight: '4px' }} src={cartIcon} alt="购物车" />
          购物车({cart.total})
        </Link>
        <Link className={styles.myorder} to="/mall/order">
          <ProfileOutlined style={{ marginRight: '4px' }} />
          我的订单
        </Link>
      </div>
    </div>
  );
};

export default connect(({ cart }: ConnectState) => ({
  cart,
}))(MallHeader);
