import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

type SearchProps = {
  onConfirmSearch: (keyword: string) => void;
};
const search: React.FC<SearchProps> = (props) => {
  const { onConfirmSearch } = props;
  const onSearch = (val: string) => {
    onConfirmSearch(val);
  };
  return <Search placeholder="搜索订单中的商品" allowClear enterButton onSearch={onSearch} />;
};
export default search;
