import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Modal, Select } from 'antd';
import styles from './style.module.scss'

const { Option } = Select// 选择组件，下拉列表选择器
// 定义一个变量做临时存储---放在外层的原因：内部每次渲染时都会重新生成该变量；本身和render没有关系，放在里面会降低性能。
let prevSchema = {}

const AreaItem = (props, ref) => {
  const { index, item, removeItemFromChildren } = props
  const [isModalVisible, setIsModalVisible] = useState(false);// 控制弹框是否可见
  // 定义状态，接收父组件传来的schema
  const [schema, setSchema] = useState(item)

  useImperativeHandle(ref, () => {
    return {
      getSchema: () => {
        return schema
      },
      resetSchema: () => {
        setSchema(item); // 设置初始schema
        prevSchema = {}; // 重置，把prevSchema置为空
      }
    }
  })

  const showModal = () => {
    setIsModalVisible(true);
  };

  // 修改内容交给AreaItem来处理
  const handleModalOk = () => {
    setIsModalVisible(false);
    prevSchema = {}
  };
  const handleModalCancel = () => {
    setSchema(prevSchema)
    setIsModalVisible(false);
    prevSchema = {}// 设置完之后变成一个空对象
  };
  const handleSelectorChange = (value) => {
    prevSchema = { ...schema }
    const newSchema = { name:value, attributes:{}, children:[] }
    setSchema(newSchema)
  }

  return (
    <div>
      <li className={styles.item} >
        <span className={styles.content} 
          onClick={showModal}
        >{ schema.name ? schema.name + ' 组件' : '当前区块内容为空' }</span>
        <span className={styles.delete}>
          <Button type="primary"
            onClick={() => removeItemFromChildren(index)}
            danger size='small'>
            删除
          </Button>
        </span>
        <Modal title="选择组件" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
          <Select value={schema.name} className={styles.selector} style={{width: "100%"}}
            onChange={handleSelectorChange}
          >
            <Option value='Banner'>Banner 组件</Option>
            <Option value='List'>List 组件</Option>
            <Option value='Footer'>Footer 组件</Option>
          </Select>
        </Modal>
      </li>
    </div>
  )
}
export default forwardRef(AreaItem)