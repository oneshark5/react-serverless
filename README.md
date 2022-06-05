# 初始化
* 删除无用文件
* 安装scss
* 安装normalize.css

# Schema协议
页面设计存储的Schema
通过循环嵌套的结构表述整个页面的结构，不断地丰富schema里的内容，整个页面就可以被越来越的配置化的生成，
低代码：通过拖拽生成一些配置，前台自动渲染这些配置生成页面这种思路去做的。
低代码引擎和页面配置化最核心的内容就是Schema的设计
<!-- 自定义的schema结构 -->
{
  name:'Page',
  attributes:{
     title:'title',
     description:'description'
  }
  children:[
    {
      name:'CourseList',
      attributes:{},
      children:[
        {
          name:'Course',
          attributes:{
            title:'Vue3 系统入门与项目实战',
            description:'课程从 Vue3 基础语法，到基基础语法，到组件原理、动画、代码设计，再到新语法扩展，',
            link:''
          }
        }
      ]
    }
  ]
}

<!-- 对前面的schema结构进行精简 -->
{
  name:'',
  attributes:{}
  children:[
    {
      name:'Banner',
      attributes:{},
      children:[]
    },
    {
      name:'List',
      attributes:{},
      children:[]
    },
    {
      name:'Footer',
      attributes:{},
      children:[]
    },
  ]
}