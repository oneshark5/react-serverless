import React, { useState, forwardRef, useImperativeHandle, createRef, useMemo, useEffect } from 'react'
import { Button } from 'antd';
import styles from './style.module.scss'
import AreaItem from '../AreaItem';
import { ReactSortable } from "react-sortablejs";

let refs = []

const AreaList = (props, ref) => {
  const [children, setChildren] = useState(props.children)

  // 当感知到父组件发生变化时，就更新
  useEffect(() => {
    setChildren(props.children)
  },[props.children])


  // 采用createRef创建ref，useMemo避免重复创建ref(提高性能)
  useMemo(() => {
    refs = children.map(item => createRef())
  },[children])

  const addItemToChildren = () => {
    const newChildren = [...children]
    newChildren.push({})
    setChildren(newChildren)
  }
  const changeAreaItem = (index, item) => {
    const newChildren = [...children]
    newChildren.splice(index, 1, item)
    setChildren(newChildren)
  }

  const removeItemFromChildren = (index) => {
    const newChildren = [...children]
    newChildren.splice(index, 1)
    setChildren(newChildren)
  }
  // 最外层的 schema 中的 children 通过 子组件的ref，调用子组件的 方法获取
  // children 的获取，是通过ref，调用子组件的方法获取。

  // 返回children给父组件，children由子组件拼接---一层层传递
  useImperativeHandle(ref, () => {
    return {
      getSchema: () => {
        const schema = []
        children.forEach((item, index) => {
          schema.push(refs[index].current.getSchema())
        })
        return schema
      }
    }
  })
  

  return (
    <div>
      <ul className={styles.list}>
      <ReactSortable list={children} setList={setChildren}>
        {
          children.map((item, index) => (
            <AreaItem 
              key={index} index={index} 
              item={item}
              removeItemFromChildren={removeItemFromChildren}
              changeAreaItem={changeAreaItem}
              ref={refs[index]}
            />
          ))
        }
      </ReactSortable>
      </ul>
      <Button type="primary" ghost onClick={addItemToChildren}>新增页面区块</Button>
    </div>
  )
}
export default forwardRef(AreaList)