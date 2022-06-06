import React, { useState, forwardRef, useImperativeHandle, createRef, useMemo } from 'react'
import { Button } from 'antd';
import styles from './style.module.scss'
import AreaItem from '../AreaItem';

let refs = []

const AreaList = (props, ref) => {
  const [children, setChildren] = useState(props.children)
  // 采用createRef创建ref，useMemo避免重复创建ref(提高性能)
  useMemo(() => {
    refs = children.map(item => createRef())
  },[children])

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

  // // 点击ok更改schema---子组件调用时，允许构建一个新的children，把你变更的children改成传递过来的children
  // const changeChildrenItem = (index, child) => {
  //   const newChildren = [...children];
  //   newChildren.splice(index, 1, child);
  //   setChildren(newChildren)
  // }

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
      },
      resetSchema: () => {
        // 将schema设置为最开始的初始内容
        setChildren(props.children)
        // children里面的对象内容也要改变，让子组件自己更新子组件的schema
        children.forEach((item, index) => {
          refs[index].current.resetSchema();
        })

      }
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
              ref={refs[index]}
            />
          ))
        }
      </ul>
      <Button type="primary" ghost onClick={addItemToChildren}>新增页面区块</Button>
    </div>
  )
}
export default forwardRef(AreaList)