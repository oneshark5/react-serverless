import React from 'react'
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {SortableContainer} from 'react-sortable-hoc';
import { getAddPageChildrenAction, getChangePageChildPositionAction } from '../../../../store/action';
import AreaItem from '../AreaItem';
import styles from './style.module.scss'

const SortableList = SortableContainer(({list}) => {
  console.log(list);
  return (
    <ul className={styles.list}>
        {
          list.map((item, index) => (
            <AreaItem key={index} index={index} value={index}/>
          ))
        }
      </ul>
  );
});

// 组件逻辑：找到children，然后向children里添加内容
const AreaList = () => {
  const dispatch = useDispatch()
  // 使用redux，采用useSelector拿到仓库的数据
  const children = useSelector(state => state.common.schema?.children || [])
  console.log(children);

  const addPageChildren = () => {
    dispatch(getAddPageChildrenAction())
  }

  const  onSortEnd = ({oldIndex, newIndex}) => {
    dispatch(getChangePageChildPositionAction(oldIndex, newIndex))
  };
  return (
    <div>
      <SortableList distance={5} lockAxis="y" list={children} onSortEnd={onSortEnd} />
      <Button type="primary" ghost onClick={addPageChildren}>新增页面区块</Button>
    </div>
  )
}
export default AreaList