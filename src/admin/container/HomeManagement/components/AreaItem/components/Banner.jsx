import { Input, Button } from 'antd'
import styles from './style.module.scss'

const { TextArea } = Input;

const Banner = (props) => {
  console.log(props);
  const { children, changeAttributes, changeChildren } = props

  // 事件处理函数
  const addItemToChildren = () => {
    const newChildren = [...children]
    newChildren.push({
      name: 'Item',
      attributes: { title: '', navIcon: '' },
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
    const item = { ...originItem };
    item.attributes[key] = value;
    const newChildren = [...children];
    newChildren.splice(index, 1, item);
    changeChildren(newChildren);
  }

  return (
    <div className={styles.wrapper} >
      {/* 添加导航标题 */}
      <Button
        type='primary'
        className={styles.button}
        onClick={addItemToChildren}
      >新增列表项</Button>
      {
        children.map(({ attributes: { title, navIcon, link } }, index) => (
          <div className={styles.area} key={index} >
            <div className={styles.delete} onClick={() => deleteItemFromChildren(index)}>X</div>
            <div className={styles['area-row']}>
              <span className={styles.label}>标题</span>
              <Input
                value={title}
                className={styles.content}
                placeholder='请输入标题'
                onChange={(e) => { changeChildrenItem(index, 'title', e.target.value) }}
              />
            </div>
            <div className={styles['area-row']}>
              <span className={styles.label}>图标</span>
              <Input
                value={navIcon}
                className={styles.content}
                placeholder='请输入图标'
                onChange={(e) => { changeChildrenItem(index, 'navIcon', e.target.value) }}
              />
            </div>
            <div className={styles['area-row']}>
              <span className={styles.label}>链接</span>
              <Input
                value={link}
                className={styles.content}
                placeholder='请输入跳转链接'
                onChange={(e) => { changeChildrenItem(index, 'link', e.target.value) }}
              />
            </div>
          </div>
        ))
      }

    </div>
  )
}
export default Banner