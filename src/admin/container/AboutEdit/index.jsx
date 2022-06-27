import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import marked from 'marked';
import hljs from 'highlight.js';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { parseJsonByString } from '../../../common/utils';
import { getChangeSchemaAction, getChangePageAttributeAction, getChangePageChildAction } from '../../store/action';
import { useCallback } from 'react';
import { cloneDeep } from 'lodash';

// 自己定义个内容用于测试
const data = {
  testContent: `
  ### 👋 Hi I'm one🦈 

  -   🏫 一名**在校学生**
  -   📚 喜欢**学习** 热爱**技术**
  -   🤔 喜欢 🏀 📸 💪 
  -   👨‍🏭 希望成为一名**优秀前端工程师**
  
  这是我自己写的**个人博客**，感谢你在茫茫互联网中找到了这里～
  
  请多多指教！😝😝😝
  
  
  📖**联系方式**
  
  - 🐧QQ：455338206
  - ✉️邮箱：oneshark5@163.com
  - 💻GitHub：https://github.com/oneshark5
  `
}

// store中存取数据（把使用store的逻辑放在一起）
const useStore = (index) => {
  const dispatch = useDispatch()
  // 使用redux，采用useSelector拿到仓库的数据
  const schema = useSelector((state) => {
    return state.common.schema
  })
  const pageChild = useSelector(state => state.common.schema.children?.[index] || {})
  const changePageChild = (tempPageChild) => {dispatch(getChangePageChildAction(index, tempPageChild))}
  const changePageAttribute = (key, value) => {
    dispatch(getChangePageAttributeAction(key, value))
  }
  return { schema, pageChild, changePageAttribute, changePageChild }
}


function AboutEdit() {
  // 确定About是第几个组件，方便取出
  const childrenCom = useSelector(state => state.common.schema?.children || [])
  let index = 0
  for (let i = 0; i < childrenCom.length; i++) {
    if (childrenCom[i].name === 'About') index = i
  }
  const { schema, changePageAttribute, pageChild = {}, changePageChild } = useStore(index)
  const {children} = pageChild

  // 处理数据
  // ⭐临时
  // const { attributes = {}, children=[] } = schema
  // const { title = '', aboutContent } = attributes

  const [content, setContent] = useState(children[0].aboutContent);
  const navigate = useNavigate()

  // 改变的是一级schema下的attributes属性
  const handleContentChange = useCallback((e) => {
    setContent(e.target.innerText)
    // 更改内容
    const item = cloneDeep(pageChild)
    console.log(item);
    item.children.splice(0, 1, {
      aboutContent: e.target.innerText
    })
    changePageChild(item)
    // changePageAttribute('aboutContent', e.target.innerText)
  }, [changePageAttribute])

  const handleSaveBtnClick = () => {
    window.localStorage.schema = JSON.stringify(schema)
  }
  console.log(schema);

  const turnToAbout = () => {
    navigate(`/admin/about`)
  }

  return (
    <>
      <div className="aboutEditHeader">
        <div className="aboutReturnBtn" onClick={turnToAbout}>
          返回
        </div>
        <span className="aboutTitle">关于我</span>
        <div className="aboutUpdateBtn" onClick={handleSaveBtnClick}>
          更新
        </div>
      </div>

      <div className="editBox">
        <div
          className="inputRegion aboutInput"
          contentEditable="plaintext-only"
          suppressContentEditableWarning
          onInput={handleContentChange}
        >
          {content}
        </div>

        <div
          className="showRegion aboutShow markdownStyle"
          dangerouslySetInnerHTML={{
            __html: marked(content).replace(/<pre>/g, "<pre id='hljs'>"),
          }}
        ></div>
      </div>
    </>
  )
}
export default AboutEdit