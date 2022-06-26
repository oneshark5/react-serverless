import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import marked from 'marked';
import hljs from 'highlight.js';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { parseJsonByString } from '../../../common/utils';
import { getChangeSchemaAction, getChangePageAttributeAction } from '../../store/action';
import { useCallback } from 'react';

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
const useStore = () => {
  const dispatch = useDispatch()
  // 使用redux，采用useSelector拿到仓库的数据
  const schema = useSelector((state) => {
    return state.common.schema
  })
  // dispatch
  const changeSchema = (schema) => {
    // 调用dispatch
    dispatch(getChangeSchemaAction(schema))
  }
  const changePageAttribute = (key, value) => {
    dispatch(getChangePageAttributeAction(key, value))
  }
  return { schema, changeSchema, changePageAttribute }
}


function AboutEdit() {
  // 处理数据
  const { schema = {}, changeSchema, changePageAttribute } = useStore()
  const { attributes={} } = schema
  const { title = '', aboutContent } = attributes

  const [content, setContent] = useState(aboutContent);
  const navigate = useNavigate()

  const handleContentChange = useCallback((e) => {
    setContent(e.target.innerText)
    changePageAttribute('aboutContent', e.target.innerText)
  },[changePageAttribute])

  const handleSaveBtnClick = () => {
    window.localStorage.schema = JSON.stringify(schema)
  }
  console.log(schema);

  const turnToAbout = () => {
    navigate(`/admin/about`)
  }

  // 点击更新保存数据

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