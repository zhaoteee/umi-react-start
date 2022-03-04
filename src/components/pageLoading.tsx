import type { NextPage } from 'next';
import { Spin } from 'antd';

type pageType = { loading: boolean };

const PageLoading: NextPage<pageType> = ({ loading }) => {
  return (
    <div>
      {loading ? (
        <div className="pageLoading">
          <Spin />
        </div>
      ) : null}
    </div>
  );
};
export default PageLoading;
