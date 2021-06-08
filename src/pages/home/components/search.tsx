// import styles from './index.less';
import React, { useState } from 'react';
import SearchItem from './searchItem';
import type { OptionsItemType } from './searchItem';

import styles from './search.less';

export default function Search() {
  const serachList = [
    {
      name: '品牌方',
      value: 'supplierId',
      options: [
        { name: 'ZARA', id: 1 },{ name: 'PCR商城', id: 2 },{ name: '车空间配件商城', id: 3 },{ name: 'CARTELO/卡帝乐鳄鱼', id: 4 },
        { name: 'Skechers/斯凯奇', id: 5 },{ name: 'Cardanro/卡丹路', id: 6 },{ name: 'Skechers/斯凯奇', id: 7 },{ name: 'Skechers/斯凯奇', id: 8 },
        { name: 'ZARA', id: 9 },{ name: 'ZARA', id: 10 },{ name: 'ZARA', id: 11 },{ name: 'ZARA', id: 12 },
      ]
    },
    {
      name: '品牌',
      value: 'brandId',
      options: [
        { name: '朝阳CHAOYANG', id: 1 },{ name: '好运', id: 2 },{ name: '嘉实多', id: 3 },{ name: '威狮', id: 4 },
        { name: '壳牌', id: 5 },{ name: '钢盾', id: 6 },
      ]
    },
    {
      name: '分类',
      value: 'categoryId',
      options: [
        { name: '机油', id: 1 },{ name: '刹车油', id: 2 }
      ]
    },
  ]
  const onSelect = (name: string, value: string, selectedOptions: OptionsItemType[]) => {
    console.log(name, value, selectedOptions)
  }
  return (
    <div className={styles.searchArea}>
      { serachList.map(item => <SearchItem
          key={item.value}
          name={item.name}
          value={item.value}
          options={item.options}
          onSelect={onSelect}
          />) }
    </div>
  );
}
