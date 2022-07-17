import { Input, Button } from 'antd'
import AsideItem from './AsideItem'
import styles from '../style.module.scss'
import { SortableContainer } from 'react-sortable-hoc';
import { useDispatch, useSelector } from 'react-redux';
import { getChangeAsideChildPositionAction } from '../../../../../../store/action';

const SortableList = SortableContainer(({ list, changeChildren }) => {
  console.log(list);
  return (
    <ul className={styles.list}>
      {
        list.map((item, index) => (
          <AsideItem key={index} index={index} value={item} num={index}
            changeChildren={changeChildren} children={list}
          />
        ))
      }
    </ul>
  );
});

const Asides = (props) => {
  const dispatch = useDispatch()

  // 从仓库拿数据
  const asideChildren = useSelector(state => state.common.schema?.children)
  const datachildren = asideChildren.filter(item => item.name === 'Asides')
  console.log(datachildren[0].children);
  const children = datachildren[0].children

  const { changeChildren } = props

  const addItemToChildren = () => {
    const newChildren = [...children]
    newChildren.push({
      name: 'Item',
      attributes: { title: '', heightCard: '', description: '', imageUrl: '', tags: '', icon: '', link: '', },
      children: []
    })
    changeChildren(newChildren)
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex, newIndex);
    dispatch(getChangeAsideChildPositionAction(oldIndex, newIndex))
  };

  return (
    <div className={styles.wrapper}>
      <Button
        type='primary'
        className={styles.button}
        onClick={addItemToChildren}
      >新增侧边栏</Button>

      <SortableList distance={20} lockAxis="y" list={children} onSortEnd={onSortEnd}
        changeChildren={changeChildren}
      />

      {/* <AsideItem children={children} changeChildren={changeChildren}/> */}
    </div>
  )
}
export default Asides