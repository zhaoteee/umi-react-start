// import styles from './index.less';
import React, { useState } from 'react';
import { PlusOutlined, DownOutlined, UpOutlined, CloseSquareFilled } from '@ant-design/icons';
import { cloneDeep } from 'lodash';

import styles from './searchItem.less';

export type OptionsItemType = {
  keyId: number;
  valueName: string;
  selected?: boolean;
};

export type SearchItemProps = {
  name: string;
  value: string;
  options: OptionsItemType[];
  onSelect: (name: string, value: string, selectedOptions: OptionsItemType[]) => void;
};

const Search: React.FC<SearchItemProps> = (props) => {
  const { name, value, options, onSelect } = props;
  const [optionList, setOptionList] = useState(
    options.map((item) => {
      item.selected = false;
      return item;
    }),
  );
  const [isShowMore, setIsShowMore] = useState(false);
  const [selectMore, setSelectMore] = useState(false);
  const showMore = () => {
    setIsShowMore(!isShowMore);
  };
  const selectPlus = () => {
    setSelectMore(true);
  };
  const cancelSelectMore = () => {
    // 取消多选状态 所有选项selected置为false 触发搜索
    const list = cloneDeep(optionList);
    setOptionList(
      list.map((i) => {
        i.selected = false;
        return i;
      }),
    );
    setSelectMore(false);
    onSelect(
      name,
      value,
      optionList.filter((item) => item.selected),
    );
  };
  const clickItem = (item: OptionsItemType) => {
    const list = cloneDeep(optionList);
    if (item.selected) {
      // 点击已选择的取消选中状态
      const current = list.find((i) => i.keyId === item.keyId);
      if (current) current.selected = false;
    } else if (!selectMore) {
      // 单选状态
      list.map((i) => {
        i.selected = i.keyId === item.keyId;
        return i;
      });
    } else {
      // 多选状态 selected直接置为true
      const current = list.find((i) => i.keyId === item.keyId);
      if (current) current.selected = true;
    }
    // 单选时直接触发搜索
    if (!selectMore) {
      onSelect(
        name,
        value,
        list.filter((op) => op.selected),
      );
    }
    setOptionList(list);
  };
  const onConfirm = () => {
    // 如果无选中 点击确定不触发搜索
    if (!optionList.find((i) => i.selected)) return;
    onSelect(
      name,
      value,
      optionList.filter((item) => item.selected),
    );
  };
  return (
    <div className={styles.attr}>
      <div className={styles.attrKey}>{name}</div>
      <div className={styles.attrValues}>
        <ul className={`${styles.collapse} ${isShowMore ? styles.more : ''} ${selectMore ? styles.selectMore : ''}`}>
          {optionList.map((item) => (
            <li className={`${item.selected ? styles.selected : ''}`} onClick={() => clickItem(item)} key={item.keyId}>
              <a>
                {item.valueName}
                <CloseSquareFilled className={`${styles.removeIcon} ${item.selected ? styles.showRemoveIcon : ''}`} />
              </a>
            </li>
          ))}
        </ul>
        {selectMore ? (
          <div className={styles.selectMoreBtns}>
            <a className={`${optionList.find((item) => item.selected) ? styles.btnSelected : styles.btnDisable}`} onClick={onConfirm}>
              确定
            </a>
            <a onClick={cancelSelectMore}>取消</a>
          </div>
        ) : null}
        <div className={`${styles.options} ${selectMore ? styles.selectedMoreOptions : ''}`}>
          {!selectMore ? (
            <span>
              <a onClick={selectPlus}>
                <PlusOutlined />
                多选
              </a>
              <a onClick={showMore}>
                {isShowMore ? (
                  <span>
                    收起
                    <UpOutlined />
                  </span>
                ) : (
                  <span>
                    更多
                    <DownOutlined />
                  </span>
                )}
              </a>
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
export default Search;
