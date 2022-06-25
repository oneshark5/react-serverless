import React from 'react'
import Layout from '../Layout'
import AboutMe from './AboutMe'



const data = {
  testContent: `
  ### 👋 欢迎来到 🦈小站！

  -   👀 一名**在校学生**
  -   💻 热爱**前端开发**
  -   👨‍🏭希望成为一名**优秀前端工程师**
  
  这是我自己写的**个人博客**，感谢你在茫茫互联网中找到了这里～
  
  请多多指教！😝😝😝
  
  
  
  📖**联系方式**
  
  - 🐧QQ：455338206
  - ✉️邮箱：oneshark5@163.com
  - 💻GitHub：https://github.com/oneshark5
  `
}

export default function About() {
  return (
    <Layout title='关于'>
      <AboutMe content={data.testContent} />
    </Layout>
  )
}
