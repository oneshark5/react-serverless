import { Input, Button } from 'antd'
import styles from './style.module.scss'

const { TextArea } = Input;

const Link = (props) => {
  console.log(props);
  const { children, changeAttributes, changeChildren } = props

  // 事件处理函数
  const addItemToChildren = () => {
    const newChildren = [...children]
    newChildren.push({
      name: 'Item',
      attributes: { title: '', navIcon: '', name:'', avatar:'', descr:'', link:'', id:(Math.trunc(Math.random()+Date.now())) },
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
      >新增友链</Button>
      {
        children.map(({ attributes: { title, name, avatar, descr, link, } }, index) => (
          <div className={styles.area} key={index} >
            <div className={styles.delete} onClick={() => deleteItemFromChildren(index)}>X</div>
            <div className={styles['area-row']}>
              <span className={styles.label}>名字</span>
              <Input
                value={name}
                className={styles.content}
                placeholder='请输入名字'
                onChange={(e) => { changeChildrenItem(index, 'name', e.target.value) }}
              />
            </div>
            <div className={styles['area-row']}>
              <span className={styles.label}>头像</span>
              <Input
                value={avatar}
                className={styles.content}
                placeholder='请输入头像'
                onChange={(e) => { changeChildrenItem(index, 'avatar', e.target.value) }}
              />
            </div>
            <div className={styles['area-row']}>
              <span className={styles.label}>描述</span>
              <Input
                value={descr}
                className={styles.content}
                placeholder='请输入描述'
                onChange={(e) => { changeChildrenItem(index, 'descr', e.target.value) }}
              />
            </div>
            <div className={styles['area-row']}>
              <span className={styles.label}>链接</span>
              <Input
                value={link}
                className={styles.content}
                placeholder='请输入链接'
                onChange={(e) => { changeChildrenItem(index, 'link', e.target.value) }}
              />
            </div>
          </div>
        ))
      }

    </div>
  )
}
export default Link