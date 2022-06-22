import { Input, Button } from 'antd'
import styles from './style.module.scss'

const Aside = (props) => {

  const { children = [], changeChildren } = props // 给一个空对象，避免外部传的时候边界没处理

  const addItemToChildren = () => {
    const newChildren = [...children]
    newChildren.push({
      name: 'Item',
      attributes: {defaultPageSize: '', total: '', },
      children: []
    })
    changeChildren(newChildren)
  }

  const deleteItemFromChildren = (index) => {
    const newChildren = [...children]
    newChildren.splice(index, 1)
    changeChildren(newChildren)
  }

  // 内容变化时，改变里面的属性---该方法存在一些问题⭐⭐⭐---添加了个分号解决了。。。😅
  const changeChildrenItem = (index, key, value) => {
    const originItem = children[index];
    const item = {...originItem};
    item.attributes[key] = value;
    const newChildren = [...children];
    newChildren.splice(index, 1, item);
    changeChildren(newChildren);
  }

  return (
    <div className={styles.wrapper}>
      <Button
        type='primary'
        className={styles.button}
        onClick={addItemToChildren}
      >新增功能</Button>
      

      {/* 页面有几个区块由外部schema里的children决定，由children循环生成 */}
      {
        children.map(({ attributes: {defaultPageSize, total, } }, index) => (
          <div className={styles.area} key={index} >
            <div className={styles.delete} onClick={() => deleteItemFromChildren(index)}>X</div>
            <div className={styles['area-row']}>
              <span className={styles.label}>当前</span>
              <Input
                value={defaultPageSize}
                className={styles.content}
                placeholder='请输入组件名称'
                onChange={(e) => { changeChildrenItem(index, 'defaultPageSize', e.target.value) }}
              />
            </div>
            <div className={styles['area-row']}>
              <span className={styles.label}>总数</span>
              <Input
                value={total}
                className={styles.content}
                placeholder='请输入高度'
                onChange={(e) => { changeChildrenItem(index, 'total', e.target.value) }}
              />
            </div>
          </div>
        ))
      }

    </div>
  )
}
export default Aside