import { Input, Button } from 'antd'
import commonStyles from '../style.module.scss'
import styles from './style.module.scss'

const List = (props) => {
  console.log(props);
  const { children = [], changeChildren } = props // 给一个空对象，避免外部传的时候边界没处理

  const addItemToChildren = () => {
    const newChildren = [...children]
    newChildren.push({})
    changeChildren(newChildren)
  }

  const deleteItemFromChildren = (index) => {
    const newChildren = [...children]
    newChildren.splice(index, 1)
    changeChildren(newChildren)
  }

  return (
    <div className={commonStyles.wrapper}>
      <Button 
      type='primary' 
      className={styles.button}
      onClick={addItemToChildren}
      >新增列表项</Button>

      {/* 页面有几个区块由外部schema里的children决定，由children循环生成 */}
      {
        children.map((item, index) => (
          <div className={styles.area} key={index} >
          <div className={styles.delete} onClick={() => deleteItemFromChildren(index)}>X</div>
            <div className={styles.row}>
              <span className={styles.label}>标题</span>
              <Input
                // value={title}
                className={styles.content}
                placeholder='请输入标题'
              // onChange={(e) => { changeAttributes({ title: e.target.value }) }}
              />
            </div>

            <div className={styles.row}>
              <span className={styles.label}>描述</span>
              <Input
                // value={title}
                className={styles.content}
                placeholder='请输入描述'
              // onChange={(e) => { changeAttributes({ title: e.target.value }) }}
              />
            </div>

            <div className={styles.row}>
              <span className={styles.label}>图片</span>
              <Input
                // value={title}
                className={styles.content}
                placeholder='请输入图片地址'
              // onChange={(e) => { changeAttributes({ title: e.target.value }) }}
              />
            </div>

            <div className={styles.row}>
              <span className={styles.label}>链接</span>
              <Input
                // value={title}
                className={styles.content}
                placeholder='请输入跳转链接'
              // onChange={(e) => { changeAttributes({ title: e.target.value }) }}
              />
            </div>
          </div>
        ))
      }


    </div>
  )
}
export default List