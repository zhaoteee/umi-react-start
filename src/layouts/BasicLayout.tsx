import React from 'react';
import { Layout } from 'antd';
import MallHeader from '@/components/MallHeader';
import styles from './BasicLayout.less';

const { Header, Content } = Layout;

const BasicLayout: React.FC<{}> = (props) => {
  const {
    children,
  } = props;
  return (
    <Layout className={styles.layoutWrap}>
      <Header className={styles.layoutHeader}>
        <MallHeader />
      </Header>
      <Content className={styles.layoutContent}>
        {children}
      </Content>
    </Layout>
  );
};

export default BasicLayout;
