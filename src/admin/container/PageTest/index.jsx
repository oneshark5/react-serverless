import React, { useEffect } from 'react'
import { Button } from 'antd';
import marked from 'marked';
import hljs from 'highlight.js';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// 自己定义个内容用于测试
const data = {
  testContent: `
  ### 👋 Hi I'm one🦈 
  `
}

// store中存取数据（把使用store的逻辑放在一起）
const useStore = (index) => {
  const dispatch = useDispatch()
  // 使用redux，采用useSelector拿到仓库的数据---获取children里面的内容（子节点）
  const pageChild = useSelector(state => state.common.schema.children?.[index] || {})
  return { pageChild }
}


function PageTest() {
  // 确定About是第几个组件，方便取出
  const children = useSelector(state => state.common.schema?.children || [])

  let index = 0
  for(let i=0; i<children.length; i++){
    if(children[i].name === 'About') index = i
  }

  const { pageChild } = useStore(index)
  console.log(pageChild);


  const navigate = useNavigate()
  // 配制marked和highlight
  useEffect(() => {
    // 配置highlight
    hljs.configure({
      tabReplace: '',
      classPrefix: 'hljs-',
      languages: ['CSS', 'HTML', 'JavaScript', 'Python', 'TypeScript', 'Markdown'],
    });
    // 配置marked
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: code => hljs.highlightAuto(code).value,
      gfm: true, //默认为true。 允许 Git Hub标准的markdown.
      tables: true, //默认为true。 允许支持表格语法。该选项要求 gfm 为true。
      breaks: true, //默认为false。 允许回车换行。该选项要求 gfm 为true。
    });
  }, []);
  // 转到编辑页面
  const turnToAboutEdit = isMe => {
    navigate(`/admin/aboutEdit`)
  };

  return (
    <>
      <div className='aboutType'>
        <div className='meType'>
          <div className='editAboutBtn'
            onClick={() => {
              turnToAboutEdit()
            }}
          >
            <Button type="primary">编辑</Button>
          </div>
          <span className="aboutTitle">最近文章</span>
        </div>
      </div>
      <div className='aboutContent'>
        <div
          className="meContent markdownStyle"
          dangerouslySetInnerHTML={{
            __html: marked(data.testContent || '').replace(/<pre>/g, "<pre id='hljs'>")
          }}
        ></div>

      </div>
    </>
  )
}
export default PageTest