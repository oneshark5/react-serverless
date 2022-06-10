import { Input, Button } from 'antd'
import styles from '../style.module.scss'

const List = (props) => {
  console.log(props);
  const { children = [], changeChildren } = props // 给一个空对象，避免外部传的时候边界没处理

  const addItemToChildren = () => {
    const newChildren = [...children]
    newChildren.push({
      name: 'Item',
      attributes: { title: '', description: '', imageUrl: '', link: '' },
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
      >新增列表项</Button>

      {/* 页面有几个区块由外部schema里的children决定，由children循环生成 */}
      {
        children.map(({ attributes: {title, description, imageUrl, link} }, index) => (
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
              <span className={styles.label}>描述</span>
              <Input
                value={description}
                className={styles.content}
                placeholder='请输入描述'
                onChange={(e) => { changeChildrenItem(index, 'description', e.target.value) }}
              />
            </div>

            <div className={styles['area-row']}>
              <span className={styles.label}>图片</span>
              <Input
                value={imageUrl}
                className={styles.content}
                placeholder='请输入图片地址'
                onChange={(e) => { changeChildrenItem(index, 'imageUrl', e.target.value) }}
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
export default List