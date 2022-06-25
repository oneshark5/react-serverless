import React, { useEffect } from 'react'
import { Button } from 'antd';
import marked from 'marked';
import hljs from 'highlight.js';
import './index.css';

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

function About() {
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

  };

  return (
    <>
      <div className='aboutType'>
        <div className='meType'>
          <div className='editAboutBtn'>
            <Button type="primary">编辑</Button>
          </div>
          <span className="aboutTitle">关于我</span>
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
export default About