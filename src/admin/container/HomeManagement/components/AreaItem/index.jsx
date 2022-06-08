import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Select } from 'antd';
import { SortableElement } from 'react-sortable-hoc';
import { getChangePageChildAction, getDeletePageChildAction } from '../../store/action';
import styles from './style.module.scss'

const { Option } = Select// 选择组件，下拉列表选择器
// 定义一个变量做临时存储---放在外层的原因：内部每次渲染时都会重新生成该变量；本身和render没有关系，放在里面会降低性能。

// store中存取数据（把使用store的逻辑放在一起）
const useStore = (index) => {
  const dispatch = useDispatch()
  // 使用redux，采用useSelector拿到仓库的数据---获取children里面的内容（子节点）
  const pageChild = useSelector(state => state.homeManagement.schema.children?.[index] || {})
  const changePageChild = (tempPageChild) => {dispatch(getChangePageChildAction(index, tempPageChild))}
  const removePageChild = () => { dispatch(getDeletePageChildAction(index)) }
  return { pageChild, changePageChild, removePageChild }
}


const AreaItem = (props) => {
  const { value: index } = props;
  // 等价于
  // const index = props.value
  const { pageChild, changePageChild, removePageChild } = useStore(index)

  const [isModalVisible, setIsModalVisible] = useState(false);// 控制弹框是否可见
  const [tempPageChild, setTempPageChild] = useState(pageChild)//临时变量控制着内部弹窗组件选择框的内容

  const showModal = () => {
    setIsModalVisible(true);
  };
  // 点击ok时，schema设置为temp
  const handleModalOk = () => {
    setIsModalVisible(false);
    changePageChild(tempPageChild)
  };
  // 取消时：选择框为空，列表里是默认值---取消时，temp设置为schema
  const handleModalCancel = () => {
    setIsModalVisible(false);
    setTempPageChild(pageChild)
  };
  // 内容变更，设计temp
  const handleSelectorChange = (value) => {
    const newSchema = { name: value, attributes: {}, children: [] }
    setTempPageChild(newSchema)
  }

  return (
    <div>
      <li className={styles.item} >
        <span className={styles.content}
          onClick={showModal}
        >{pageChild.name ? pageChild.name + ' 组件' : '当前区块内容为空'}</span>
        <span className={styles.delete}>
          <Button type="primary"
            onClick={removePageChild}
            danger size='small'>
            删除
          </Button>
        </span>
        <Modal title="选择组件" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
          <Select value={tempPageChild.name} className={styles.selector} style={{ width: "100%" }}
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
export default SortableElement(AreaItem)