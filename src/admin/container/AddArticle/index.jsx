import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import marked from 'marked';
import hljs from 'highlight.js';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { parseJsonByString } from '../../../common/utils';
import { useCallback } from 'react';
import { cloneDeep } from 'lodash';
import request from '../../../common/request'
import { useSchemaData } from '../../hook/useSchemaData';

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


function AddArticle() {
  // 确定About是第几个组件，方便取出
  const childrenCom = useSelector(state => state.common.schema?.children || [])
  let index = 0
  for (let i = 0; i < childrenCom.length; i++) {
    if (childrenCom[i].name === 'ArticleDetail') index = i
  }
  const { schema, changePageAttribute, pageChild = {}, changePageChild } = useSchemaData(index)
  const {children} = pageChild

  const [content, setContent] = useState(children.at(-1).articleContent);
  // const [content, setContent] = useState(data.testContent);
  const navigate = useNavigate()

  const handleContentChange = useCallback((e) => {
    setContent(e.target.innerText)
    // 更改内容
    const item = cloneDeep(pageChild)
    console.log(item);
    // 这里先设置为1，因为引入post的时候，post是自增长的-->自己随机定义id
    item.children.push({
      id:Math.trunc(Math.random()+Date.now()),
      articleContent: e.target.innerText
    })
    changePageChild(item)
    // changePageAttribute('aboutContent', e.target.innerText)
  }, [changePageAttribute])

  const handleSaveBtnClick = () => {
    request.post('/api/schema/save', {
      schema: JSON.stringify(schema)
    },{
      headers: {
        'Content-Type': 'application/json;charset=utf8mb4'
      },
    }).then(() => { })
  }

  const turnToAbout = () => {
    navigate(`/admin/article`)
  }

  return (
    <>
      <div className="aboutEditHeader">
        <div className="aboutReturnBtn" onClick={turnToAbout}>
          返回
        </div>
        <span className="aboutTitle">最近文章</span>
        <div className="aboutUpdateBtn" onClick={handleSaveBtnClick}>
          添加
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
export default AddArticle