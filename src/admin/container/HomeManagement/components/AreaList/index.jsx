import React, { useState } from 'react'
import { Button } from 'antd';
import styles from './style.module.scss'
import { parseJsonByString } from '../../../../../common/utils';

let listData = parseJsonByString(window.localStorage.homeData, )

const AreaList = () => {
  const [list, setLIst] = useState(listData)
  const handleAddBtnClick = () => {
    const newList = [...list]
    newList.push({})
    setLIst(newList)
  }
  const handleDelBtnClick = (index) => {
    const newList = [...list]
    newList.splice(index, 1)
    setLIst(newList)
  }


  return (
    <div>
      <ul className={styles.list}>
        {
          list.map((item, index) => (
            <li key={index} className={styles.item}>
              <span className={styles.content}>当前区块内容为空</span>
              <span className={styles.delete}>
              <Button type="primary" onClick={() => handleDelBtnClick(index)} danger size='small'>
                删除
              </Button>
              </span>
            </li>
          ))
        }
      </ul>
      <Button type="primary" ghost onClick={handleAddBtnClick}>新增页面区块</Button>
    </div>
  )
}
export default AreaList