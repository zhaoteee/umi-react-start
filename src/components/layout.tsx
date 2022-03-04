import { Link, history, useLocation } from 'umi';
import styles from './Layout.less';
import { EllipsisOutlined } from '@ant-design/icons';
import { useContext, useState, useEffect } from 'react';
import { Layout, Menu, Button } from 'antd';
import Login from './login';
import Register from './register';
import Logout from './logout';
import { StoreContext } from '@/pages/app';
import request from '@/utils/request';
import logoImg from '@/assets/images/head-logo.jpg';
import type { BaseType, FenleiType } from '@/pages/home/index';

const { Header, Content, Footer } = Layout;

export type ResType = {
  code: number;
  msg: string;
  user: UserInfoType;
};

export type UserInfoType = { username: string; createTime: string; userId: number };

const LayoutComp: React.FC<{ hot?: FenleiType; isShowSearchMore?: boolean }> = ({ children, hot, isShowSearchMore }) => {
  const location = useLocation();
  const defaultSelectedKeys = [`${location.query.id || ''}`];
  const [hotList, setHotList] = useState(hot || []);
  const [logos, setLogos] = useState(logoImg);
  const [info, setInfo] = useState<UserInfoType>({ username: '', createTime: '', userId: 0 });
  const { state, dispatch } = useContext(StoreContext);
  const loginClick = () => {
    if (state.isLogin) {
      dispatch({ type: 'TOGGLE_LOGOUT', data: !state.isShowLogoutModal });
    } else {
      dispatch({ type: 'TOGGLE_LOGIN', data: !state.isShowLoginModal });
    }
  };
  const changeShowMore = () => {
    dispatch({ type: 'TOGGLE_SHOWSEARCH', data: !state.showSearch });
  };
  const registerClick = () => {
    dispatch({ type: 'TOGGLE_REGISTER', data: !state.isShowRegisterModal });
  };
  const onClickItem = (item: any) => {
    history.push({ pathname: `/index`, query: { id: item.id, name: item.name, type: '1' } });
  };

  useEffect(() => {
    if (state.token) {
      request<{ code: number; msg: string; user: UserInfoType }>('/api/userInfo', { method: 'get' })
        .then(({ data: res }) => {
          if (res && res.code === 0 && res.msg === 'success') {
            setInfo(res.user);
          }
        })
        .catch((e) => {
          console.log(e);
          localStorage.removeItem('isLogin');
          localStorage.removeItem('token');
          dispatch({ type: 'TOGGLE_LOGINACOUNT', data: { isLogin: false, token: '' } });
        });
    }
  }, [state.token]);
  useEffect(() => {
    const base: BaseType[] = JSON.parse(localStorage.getItem('base') || '[]');
    const logo = base.find((i) => i.code === 'logo');
    const elAuthor: HTMLMetaElement | null = document.querySelector('meta[name="author"]');
    const elDescription: HTMLMetaElement | null = document.querySelector('meta[name="description"]');
    const elKeywords: HTMLMetaElement | null = document.querySelector('meta[name="keywords"]');
    const smallLogo: HTMLMetaElement | null = document.querySelector('.header-small-icon');

    const author = base.find((item) => item.code === 'author');
    const desc = base.find((item) => item.code === 'description');
    const kwd = base.find((item) => item.code === 'keywords');
    const title = base.find((item) => item.code === 'title');
    if (logo) {
      setLogos(logo.value);
      smallLogo?.setAttribute('href', logo.value);
    }
    if (author) elAuthor?.setAttribute('content', author.value);
    if (desc) elDescription?.setAttribute('content', desc.value);
    if (kwd) elKeywords?.setAttribute('content', kwd.value);
    if (title) document.title = title.value;
  }, [location]);
  useEffect(() => {
    if (!hot || !hot.length) {
      const newList = JSON.parse(localStorage.getItem('hotList') || '[]');
      setHotList(newList);
    }
  }, [hot]);

  return (
    <Layout>
      <Header className={styles.layoutHeader}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logos} alt="logo" width={50} height={50} />
          </Link>
        </div>
        <div className={styles.navArea}>
          <Menu theme="dark" mode="horizontal" className={styles.myMenu} selectedKeys={defaultSelectedKeys}>
            {hotList.map((item) => {
              return (
                <Menu.Item onClick={() => onClickItem(item)} key={item.id}>
                  {item.name}
                </Menu.Item>
              );
            })}
          </Menu>
          <EllipsisOutlined style={{ display: isShowSearchMore ? 'block' : 'none' }} onClick={changeShowMore} className={styles.more} title="更多搜索" />
        </div>
        <div className={styles.loginArea}>
          <Button key="login" onClick={loginClick} className={styles.fr}>
            {state.isLogin ? info.username : '登录'}
          </Button>
          {state.isLogin ? null : (
            <Button key="zc" onClick={registerClick} className={styles.fr}>
              注册
            </Button>
          )}
        </div>
      </Header>
      <Content className={styles.pageLayoutContent}>
        <div className={styles.pageContent}>{children}</div>
      </Content>
      <Login></Login>
      <Register></Register>
      <Logout></Logout>
      <Footer style={{ textAlign: 'center' }}>
        <p>本站不以盈利为目的，所有资源均来自互联网，如有侵权请联系站长删除</p>
      </Footer>
    </Layout>
  );
};

export default LayoutComp;
