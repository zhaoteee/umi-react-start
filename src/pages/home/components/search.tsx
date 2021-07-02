// import styles from './index.less';
import React, { useEffect, useState } from 'react';
import SearchItem from './searchItem';
import { getProductAgg } from '@/services/home';
import type { OptionsItemType } from './searchItem';

import styles from './search.less';

type SearchProps = {
  onConfirmSelect: (p: SearchListType[]) => void;
};
export type SearchListType = {
  name: string;
  value: string;
  options: OptionsItemType[];
};
const selectedList: SearchListType[] = [];
const Search: React.FC<SearchProps> = (props) => {
  const [serachList, setSearchList] = useState<SearchListType[]>([]);
  useEffect(() => {
    getProductAgg().then((res) => {
      const { aggSupplier = [], aggBrand = [], aggCategory = [] } = res.data || {};
      const list = [
        { name: '品牌方', value: 'supplierIds', options: aggSupplier },
        { name: '品牌', value: 'brandIds', options: aggBrand },
        { name: '分类', value: 'categoryIds', options: aggCategory },
      ];
      setSearchList(list);
    });
  }, []);

  const { onConfirmSelect } = props;

  const onSelect = (name: string, value: string, selectedOptions: OptionsItemType[]) => {
    const idx = selectedList.findIndex((i) => i.value === value);
    if (idx > -1) {
      selectedList.splice(idx, 1, { name, value, options: selectedOptions });
    } else {
      selectedList.push({ name, value, options: selectedOptions });
    }
    onConfirmSelect(selectedList);
  };
  return (
    <div className={styles.searchArea}>
      {serachList.map((item) => (
        <SearchItem key={item.value} name={item.name} value={item.value} options={item.options} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default Search;
