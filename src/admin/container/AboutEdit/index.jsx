import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import marked from 'marked';
import hljs from 'highlight.js';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { parseJsonByString } from '../../../common/utils';
import { useCallback } from 'react';
import { cloneDeep } from 'lodash';
import request from '../../../common/request'
import { useSchemaData } from '../../hook/useSchemaData'


function AboutEdit() {
  // 确定About是第几个组件，方便取出
  const childrenCom = useSelector(state => state.common.schema?.children || [])
  let index = 0
  for (let i = 0; i < childrenCom.length; i++) {
    if (childrenCom[i].name === 'About') index = i
  }
  const { schema, changePageAttribute, pageChild = {}, changePageChild } = useSchemaData(index)
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
    item.children.splice(0, 1, {
      aboutContent: e.target.innerText
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