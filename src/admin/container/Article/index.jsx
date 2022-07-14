import React, { useEffect } from 'react'
import { Button } from 'antd';
import marked from 'marked';
import hljs from 'highlight.js';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Article() {
  // 获取数据
  const children = useSelector(state => state.common.schema?.children || [])
  const childrenArticle = children.filter(element => (element.name === 'ArticleDetail'))

  const articleContent = childrenArticle[0].children.at(-1).articleContent

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
    navigate(`/admin/AddArticle`)
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
          <span className="aboutTitle">关于我</span>
        </div>
      </div>
      <div className='aboutContent'>
        <div
          className="meContent markdownStyle"
          dangerouslySetInnerHTML={{
            __html: marked(articleContent || '').replace(/<pre>/g, "<pre id='hljs'>")
          }}
        ></div>

      </div>
    </>
  )
}
export default Article