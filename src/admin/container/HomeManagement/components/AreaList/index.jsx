import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'antd';
import styles from './style.module.scss'
import AreaItem from '../AreaItem';

const AreaList = (props, ref) => {
  const [children, setChildren] = useState(props.children)

  const addItemToChildren = () => {
    const newChildren = [...children]
    newChildren.push({})
    setChildren(newChildren)
  }
  const removeItemFromChildren = (index) => {
    const newChildren = [...children]
    newChildren.splice(index, 1)
    setChildren(newChildren)
  }

  // 点击ok更改schema---子组件调用时，允许构建一个新的children，把你变更的children改成传递过来的children
  const changeChildrenItem = (index, child) => {
    const newChildren = [...children];
    newChildren.splice(index, 1, child);
    setChildren(newChildren)
  }

  useImperativeHandle(ref, () => {
    return {
      children
    }
  })

  return (
    <div>
      <ul className={styles.list}>
        {
          children.map((item, index) => (
            <AreaItem 
              key={index} index={index} 
              item={item}
              removeItemFromChildren={removeItemFromChildren}
              changeChildrenItem={changeChildrenItem}
            />
          ))
        }
      </ul>
      <Button type="primary" ghost onClick={addItemToChildren}>新增页面区块</Button>
    </div>
  )
}
export default forwardRef(AreaList)