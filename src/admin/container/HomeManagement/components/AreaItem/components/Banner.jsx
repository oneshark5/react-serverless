import { Input, Switch } from 'antd'
import styles from './style.module.scss'

/* 
handleTitleChange/handleDescriptionChange
这两个事件处理函数
当title和description改变时，选择框里是tempSchema临时变量，当点击ok的时候改变临时变量里的内容
临时变量在父组件AreaItem中handleSelectorChange；
在父组件AreaItem中定义一个新方法，传递给子组件，子组件调用handleSelectorChange；方法改变临时变量
*/

const { TextArea } = Input;

const Banner = (props) => {
  console.log(props);
  const { attributes = {}, changeAttributes } = props // 给一个空对象，避免外部传的时候边界没处理
  const { title, description, showSmallPic,
    smallPicUrl, backgroundUrl, backgroundHeight } = attributes

  const handleShowSmallPicChange = (checked) => {
    // (checked) => { changeAttributes('showSmallPic', checked) }
    if(!checked){
      changeAttributes({
        showSmallPic:checked,
        smallPicUrl:''
      })
    }else{
      changeAttributes({
        showSmallPic:checked
      })
    }
  }
  
  return (
    <div className={styles.wrapper} >
      <div className={styles['attribute-row']}>
        <span className={styles.label}>页面标题</span>
        <Input
          value={title}
          className={styles.content}
          placeholder='请输入页面标题'
          onChange={(e) => { changeAttributes({title: e.target.value})}}
        />
      </div>
      <div className={styles['attribute-row']}>
        <span className={styles.label}>页面描述</span>
        <TextArea
          value={description}
          className={styles.content}
          rows={2}
          placeholder='请输入页面描述'
          onChange={(e) => { changeAttributes({description: e.target.value}) }}
        />
      </div>

      <div className={styles['attribute-row']}>
        <span className={styles.label}>展示小图</span>
        <Switch checked={showSmallPic} onChange={handleShowSmallPicChange} />
      </div>
      {/* 判断是否显示小图 */}
      {
        showSmallPic ? (
          <div className={styles['attribute-row']}>
            <span className={styles.label}>小图链接</span>
            <Input
              value={smallPicUrl}
              className={styles.content}
              placeholder='请输入小图片Url地址'
              onChange={(e) => { changeAttributes({smallPicUrl: e.target.value}) }}
            />
          </div>
        ) : null
      }

      <div className={styles['attribute-row']}>
        <span className={styles.label}>背景链接</span>
        <Input
          value={backgroundUrl}
          className={styles.content}
          placeholder='请输入背景图的Url地址'
          onChange={(e) => { changeAttributes({backgroundUrl: e.target.value}) }}
        />
      </div>
      <div className={styles['attribute-row']}>
        <span className={styles.label}>背景高度</span>
        <Input
          type="number"
          value={backgroundHeight}
          className={styles.content}
          placeholder='请输入背景图高度的像素值'
          onChange={(e) => { changeAttributes({backgroundHeight: e.target.value}) }}
        />
      </div>
    </div>
  )
}
export default Banner