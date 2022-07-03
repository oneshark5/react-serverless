import React, { useEffect } from 'react'
import { Button } from 'antd';
import marked from 'marked';
import hljs from 'highlight.js';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChangePageAttributeAction, getChangePageChildAction } from '../../store/action';

const aboutContents = {
  aboutContent: "\n  ### 👋 Hi I'm one🦈 \n\n  -   🏫 一名**在校学生**\n  -   📚 喜欢**学习** 热爱**技术**\n  -   🤔 喜欢 🏀 📸 💪 \n  -   👨‍🏭 希望成为一名**优秀前端工程师**\n  \n  这是我自己写的**个人博客**，感谢你在茫茫互联网中找到了这里～\n  \n\n   "
}


function About() {
  // 获取数据
  const children = useSelector(state => state.common.schema?.children || [])
  const childrenAbout = children?.filter(element => (element.name === 'About'))
  const aboutContent = childrenAbout[0].children[0].aboutContent

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
          <span className="aboutTitle">关于我</span>
        </div>
      </div>
      <div className='aboutContent'>
        <div
          className="meContent markdownStyle"
          dangerouslySetInnerHTML={{
            __html: marked(aboutContent || '').replace(/<pre>/g, "<pre id='hljs'>")
          }}
        ></div>

      </div>
    </>
  )
}
export default About