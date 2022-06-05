import React, { useState } from 'react'
import { Button, Modal, Select } from 'antd';
import styles from './style.module.scss'

const { Option } = Select// 选择组件，下拉列表选择器

const AreaItem = (props) => {
  const { index, item, removeItemFromChildren, changeChildrenItem } = props
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 定义状态，接收父组件传来的schema
  const [tempSchema, setTempSchema] = useState(item)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    changeChildrenItem(index, tempSchema)
  };
  const handleModalCancel = () => {
    setTempSchema(item)
    setIsModalVisible(false);
  };
  const handleSelectorChange = (value) => {
    const schema = { name:value, attributes:{}, children:[] }
    setTempSchema(schema)
  }

  return (
    <div>
      <li className={styles.item} >
        <span className={styles.content} onClick={showModal}>当前区块内容为空</span>
        <span className={styles.delete}>
          <Button type="primary"
            onClick={() => removeItemFromChildren(index)}
            danger size='small'>
            删除
          </Button>
        </span>
        <Modal title="选择组件" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
          <Select value={tempSchema.name} className={styles.selector} style={{width: "100%"}}
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
export default AreaItem