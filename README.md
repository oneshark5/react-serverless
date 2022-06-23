# 初始化

- 删除无用文件
- 安装 scss
- 安装 normalize.css

# Schema 协议

页面设计存储的 Schema
通过循环嵌套的结构表述整个页面的结构，不断地丰富 schema 里的内容，整个页面就可以被越来越的配置化的生成，
低代码：通过拖拽生成一些配置，前台自动渲染这些配置生成页面这种思路去做的。
低代码引擎和页面配置化最核心的内容就是 Schema 的设计

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

设置协议

<!-- 对前面的schema结构进行精简 -->
<!-- 首页配置化 -->

```json
{
  name:'Page',
  attributes:{
    title:'鲨鱼小站'
    poem:'',
    backgroundUrl:'',
  },
  children:[
    {
      name:'Banner',
      attributes:{
        title:'鲨鱼小站',
        description:'this is the description area',
        showSmallPic:true,//是否显示logo
        smallPicUrl:'',//logo地址
        backgroundUrl:'',//背景
        backgroundHeight:'100px'//背景高度
      },
      children:[]
    },
    {
      name:'Section',
      attributes:{},
      children:[{
        name:'Item',
        attributes:{
          title:'Vue3 系统入门与项目实战',
          description:'内容描述',
          imageUrl:'',
          link:''

        },
        children:[]
      }]
    },
    {
      name:'Aside',
      attributes:{},
      children:[{
        name:'Item',
        attributes:{
          defaultPageSize:'8',
          total:'20',
        },
        children:[]
      }]
    },
    {
      name:'Footer',
      attributes:{
        record:''
      },
      children:[{
        name:'Item',
        attributes:{
          title:'个人博客系统',
          demo:'源代码',
          demoLink:'',
          tags:'React',
        },
        children:[]
      }]
    },
  ],
},
{
  name:'Articles',
  attributes:{},
  children:[
    {
      name:'Content',
      attributes:{},
      children:[{
        name:'Item',
        attributes:{
          articleTitle:'解决webpack5打包CSS图片路径不正确问题',
          articleCategories:"前端基础",
          createTime:'2022-06-23',
          articleDetail:'内容详情',
          articleTags:"Webpack5,JavaScript",
          publishState:"0",
        },
        children:[]
      }]
    },
    {
      // 预留的评论区
      name:"Message",
      attributes:{},
      children:[]
    }
  ],
}
```

图库地址
头像：`https://shark-serverless-static-files.oss-cn-beijing.aliyuncs.com/images/avatar.jpeg`
背景 1：`https://shark-serverless-static-files.oss-cn-beijing.aliyuncs.com/images/bg.jpeg`
背景 2：`https://shark-serverless-static-files.oss-cn-beijing.aliyuncs.com/images/react.jpeg`
背景图片的计算过程
分辨率：1920\*697
网页宽度为 1280 1920 / 1280 = 1.5
所以高度设置为 697 / 1.5

Aside 思路
在大组件下渲染成组件，形成组件后，各自组件自己引用属性去渲染页面。
