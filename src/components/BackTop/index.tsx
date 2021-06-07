// import styles from './index.less';
import { BackTop } from 'antd';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import styles from './index.less';

export default function IndexPage() {
  return (
    <BackTop className={styles.backTop}>
      <VerticalAlignTopOutlined />
    </BackTop>
  );
}
