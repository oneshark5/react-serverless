import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Select } from 'antd';
import { SortableElement } from 'react-sortable-hoc';
import { cloneDeep } from 'lodash' 
import { getChangePageChildAction, getDeletePageChildAction } from '../../../../store/action';
import Banner from './components/Banner';
import Section from './components/Section';
import Aside from './components/Aside';
import About from './components/About';
import ArticleDetail from './components/ArticleDetail';
import Footer from './components/Footer';
import styles from './style.module.scss'


const { Option } = Select// 选择组件，下拉列表选择器
// 定义一个变量做临时存储---放在外层的原因：内部每次渲染时都会重新生成该变量；本身和render没有关系，放在里面会降低性能。

const map = {Banner, Section, Aside,ArticleDetail, About, Footer }

// store中存取数据（把使用store的逻辑放在一起）
const useStore = (index) => {
  const dispatch = useDispatch()
  // 使用redux，采用useSelector拿到仓库的数据---获取children里面的内容（子节点）
  const pageChild = useSelector(state => state.common.schema.children?.[index] || {})
  const changePageChild = (tempPageChild) => {dispatch(getChangePageChildAction(index, tempPageChild))}
  const removePageChild = () => { dispatch(getDeletePageChildAction(index)) }
  return { pageChild, changePageChild, removePageChild }
}


const AreaItem = (props) => {
  const { value: index } = props;
  // 等价于
  // const index = props.value
  const { pageChild, changePageChild, removePageChild } = useStore(index)
  console.log(pageChild);

  const [isModalVisible, setIsModalVisible] = useState(false);// 控制弹框是否可见
  const [tempPageChild, setTempPageChild] = useState(cloneDeep(pageChild))//临时变量控制着内部弹窗组件选择框的内容


  useEffect(() => {
    setTempPageChild(cloneDeep(pageChild))
  },[pageChild])

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
    setTempPageChild(cloneDeep(pageChild))
  };
  // 内容变更，设计temp
  const handleSelectorChange = (value) => {
    const newSchema = { name: value, attributes: {}, children: [] }
    setTempPageChild(newSchema)
  }

  // 改变attributes属性：多属性同时变更
  const changeTempPageChildAttributes = (kvObj) => {
    const newTempPageChild = { ...tempPageChild }// 采用lodash就可以改变tempPageChild某个attributes对应的值
    for(let key in kvObj){
      newTempPageChild.attributes[key] = kvObj[key]
    }
    setTempPageChild(newTempPageChild)
  }

  // 改变children属性：
  const changeTempPageChildren = (children) => {
    const newTempPageChild = {...tempPageChild}// 采用lodash就可以改变tempPageChild某个attributes对应的值
    newTempPageChild.children = children
    setTempPageChild(newTempPageChild)
  }

  const getComponent = () => {
    const { name } = tempPageChild
    const Component = map[name]

    return Component ? (
      <Component {...tempPageChild} changeAttributes={changeTempPageChildAttributes} changeChildren={changeTempPageChildren} />
    ) : null
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
        <Modal 
          title="选择组件" 
          visible={isModalVisible} 
          onOk={handleModalOk} 
          onCancel={handleModalCancel}
          bodyStyle={{maxHeight:500, overflowY:'scroll'}}
        >
          <Select value={tempPageChild.name} className={styles.selector} style={{ width: "100%" }}
            onChange={handleSelectorChange}
          >
            <Option value='Banner'>Banner 组件</Option>
            <Option value='Section'>Section 组件</Option>
            <Option value='Aside'>Aside 组件</Option>
            <Option value='ArticleDetail'>ArticleDetail 组件</Option>
            <Option value='About'>About 组件</Option>
            <Option value='Footer'>Footer 组件</Option>
          </Select>

          { getComponent() }
        </Modal>
      </li>
    </div>
  )
}
export default SortableElement(AreaItem)