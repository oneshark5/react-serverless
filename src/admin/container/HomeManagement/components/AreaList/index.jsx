import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { getAddPageChildrenAction } from '../../store/action';
import AreaItem from '../AreaItem';
import styles from './style.module.scss'


// 组件逻辑：找到children，然后向children里添加内容
const AreaList = () => {
  const dispatch = useDispatch()
  // 使用redux，采用useSelector拿到仓库的数据
  const children = useSelector(state => state.homeManagement.schema?.children || [])

  const addPageChildren = () => {
    dispatch(getAddPageChildrenAction())
  }
  return (
    <div>
      <ul className={styles.list}>
        {
          children.map((item, index) => (
            <AreaItem
              key={index} index={index}
            />
          ))
        }
      </ul>
      <Button type="primary" ghost onClick={addPageChildren}>新增页面区块</Button>
    </div>
  )
}
export default AreaList