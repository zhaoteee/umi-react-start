// import { PageLoading } from '@ant-design/pro-layout';

// export default PageLoading;

import React from 'react';
// import { Spin } from 'antd';

const PageLoading: React.FC<{
  tip?: string;
}> = () => {
  return <div style={{ paddingTop: 100, textAlign: 'center' }}>{/* <Spin size="large" tip={props.tip} /> */}</div>;
};
export default PageLoading;
