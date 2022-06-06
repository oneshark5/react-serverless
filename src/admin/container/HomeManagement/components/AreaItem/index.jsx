import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import { Button, Modal, Select } from 'antd';
import styles from './style.module.scss'

const { Option } = Select// 选择组件，下拉列表选择器
// 定义一个变量做临时存储---放在外层的原因：内部每次渲染时都会重新生成该变量；本身和render没有关系，放在里面会降低性能。


const AreaItem = (props, ref) => {
  const { index, item, changeAreaItem, removeItemFromChildren } = props
  const [isModalVisible, setIsModalVisible] = useState(false);// 控制弹框是否可见
  // 定义状态，接收父组件传来的schema
  const [schema, setSchema] = useState(item)
  const [temp, setTemp] = useState(item)//临时变量控制着内部弹窗组件选择框的内容

  useEffect(() => {
    setSchema(props.item)
    setTemp(props.item)
  },[props.item])

  useImperativeHandle(ref, () => {
    return {
      getSchema: () => {
        return schema
      }
    }
  })

  const showModal = () => {
    setIsModalVisible(true);
  };

  // 修改内容交给AreaItem来处理
  // 点击确定：选择框和列表内容的schema一致
  const handleModalOk = () => {
    setIsModalVisible(false);
    setSchema(temp)
    changeAreaItem(index, temp)
  };
  // 取消时：选择框为空，列表里是默认值
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setTemp(schema)
  };
  const handleSelectorChange = (value) => {
    const newSchema = { name:value, attributes:{}, children:[] }
    setTemp(newSchema)
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
          <Select value={temp.name} className={styles.selector} style={{width: "100%"}}
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