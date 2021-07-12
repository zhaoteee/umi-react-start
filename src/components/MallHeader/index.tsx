import React, { useState } from 'react';
import { Input } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import type { ConnectState, CartModelState } from '@/models/connect';
import type { HomeQueryType } from '@/pages/home/index';
import { connect, Link, history, useLocation } from 'umi';
import type { Location } from 'umi';
import logo from '@/assets/images/logo.png';

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
          <svg t="1625724881103" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7769" width="200" height="200">
            <path d="M352 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="7770" fill="#FF0036"></path>
            <path d="M800 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="7771" fill="#FF0036"></path>
            <path
              d="M913.6 241.56a47.84 47.84 0 0 0-37.12-17.56H267.78l-12.26-69.56A32 32 0 0 0 224 128H96a32 32 0 0 0 0 64h101.16l91.32 517.56A32 32 0 0 0 320 736h512a32 32 0 0 0 0-64H346.84l-11.28-64h483.32A48.14 48.14 0 0 0 866 569.42l57.6-288a48 48 0 0 0-10-39.86z"
              p-id="7772"
              fill="#FF0036"
            ></path>
          </svg>
          购物车({cart.total})
        </Link>
        <Link className={styles.myorder} to="/mall/order">
          <MenuOutlined style={{ fontSize: '14px', marginRight: '2px' }} />
          我的订单
        </Link>
      </div>
    </div>
  );
};

export default connect(({ cart }: ConnectState) => ({
  cart,
}))(MallHeader);
