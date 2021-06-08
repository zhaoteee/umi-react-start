// import styles from './index.less';
import React, { useState } from 'react';
import { PlusOutlined, DownOutlined, UpOutlined, CloseSquareFilled } from '@ant-design/icons';
import { cloneDeep } from 'lodash'

import styles from './searchItem.less';

export type OptionsItemType = {
  id: number;
  name: string;
  selected?: boolean;
}

export type SearchItemProps = {
  name: string;
  value: string;
  options: OptionsItemType[],
  onSelect: (name: string, value: string, selectedOptions: OptionsItemType[]) => void
}

const Search: React.FC<SearchItemProps> = (props) => {
  const { name, value, options, onSelect } = props
  const [optionList, setOptionList] = useState(options.map(item => {
    item.selected = false
    return item
  }))
  const [isShowMore, setIsShowMore] = useState(false)
  const [selectMore, setSelectMore] = useState(false)
  const showMore = () => {
    setIsShowMore(!isShowMore)
  }
  const selectPlus = () => {
    setSelectMore(true)
  }
  const cancelSelectMore = () => {
    let list = cloneDeep(optionList)
    setOptionList(list.map(i => {
      i.selected = false
      return i
    }))
    setSelectMore(false)
  }
  const clickItem = (item: OptionsItemType) => {
    let list = cloneDeep(optionList)
    if (item.selected) {
      let current = list.find(i => i.id === item.id)
      current ? current.selected = false : ''
    } else {
      if (!selectMore) {
          list.map(i => {
            i.selected = i.id === item.id
            return i
          })
        } else {
          let current = list.find(i => i.id === item.id)
          current ? current.selected = true : ''
        }
    }
    setOptionList(list)
  }
  const onConfirm = () => {
    onSelect(name, value, optionList.filter(item => item.selected))
  }
  return (
    <div className={styles.attr}>
      <div className={styles.attrKey}>{name}</div>
      <div className={styles.attrValues}>
        <ul className={`${styles.collapse} ${isShowMore ? styles.more : ''} ${selectMore ? styles.selectMore : ''}`}>
          {optionList.map(item => <li
            className={`${item.selected ? styles.selected : ''}`}
            onClick={() => clickItem(item)}
            key={item.id}
          >
            <a>
              {item.name}<CloseSquareFilled className={`${styles.removeIcon} ${item.selected ? styles.showRemoveIcon : ''}`} />
            </a></li>)}
        </ul>
        {selectMore ? <div className={styles.selectMoreBtns}>
          <a
            className={`${optionList.find(item => item.selected) ? styles.btnSelected : styles.btnDisable}`}
            onClick={onConfirm}
          >确定</a>
          <a onClick={cancelSelectMore}>取消</a>
        </div> : null
        }
        <div className={styles.options}>
          {
            !selectMore ? <span><a onClick={selectPlus}><PlusOutlined />多选</a>
              <a onClick={showMore}>
                {isShowMore ? <span>收起<UpOutlined /></span> : <span>更多<DownOutlined /></span>}
              </a></span> : ''
          }
        </div>
      </div>
    </div>
  );
}
export default Search