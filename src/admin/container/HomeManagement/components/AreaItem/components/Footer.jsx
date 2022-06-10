import { Input, Button } from 'antd'
import styles from './style.module.scss'

const Footer = (props) => {
  console.log(props);
  const {
    attributes = {}, changeAttributes, children = [], changeChildren
  } = props
  const { copyright, record } = attributes;

  const addItemToChildren = () => {
    const newChildren = [...children]
    newChildren.push({
      name: 'Item',
      attributes: { title: '', link: '' },
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
      <div className={styles['attribute-row']}>
        <span className={styles.label}>版权信息</span>
        <Input
          value={copyright}
          className={styles.content}
          placeholder='请输入版权信息'
          onChange={(e) => { changeAttributes({ copyright: e.target.value }) }}
        />
      </div>
      <div className={styles['attribute-row']}>
        <span className={styles.label}>备案信息</span>
        <Input
          value={record}
          className={styles.content}
          placeholder='请输入备案信息'
          onChange={(e) => { changeAttributes({ record: e.target.value }) }}
        />
      </div>
      <Button
        type='primary'
        className={styles.button}
        onClick={addItemToChildren}
      >新增列表项</Button>

      {
        children.map(({ attributes: { title, link } }, index) => (
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
export default Footer