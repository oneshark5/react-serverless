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

```json
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
```

设置协议

<!-- 对前面的schema结构进行精简 -->
<!-- 首页配置化 -->

⭐ 拖拽：用于导航栏和首页的 Aside 侧边栏 ⭐
大的结构
```json
{
  name:'',
  attributes:{},
  children:[
    {
      name:'About',
      attributes:{
        title:"关于",
        content:"md语法的内容"
      },
      children:[
        {
          content:'md内容'
        }
      ]
    }
  ],
}
```

```json
{
  name:'Page',
  attributes:{
    title:'鲨鱼小站'
    poem:'',
    backgroundUrl:'',
    // ⭐⭐⭐临时使用
    aboutContent:'',
    artContent:''
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
      name:'ArticleDetail',
      attributes:{},
      children:[
        {
          attributes:{},
          children:[
            {
              articleContent:'md文章内容'
            }
          ]
        },
        {
          // 预留的评论区
          name:"Message",
          attributes:{},
          children:[]
        }
      ],
    },
    {
      name:'About',
      attributes:{},
      children:[
        {
          name:'关于',
          attributes:{},
          children:[
            {
              aboutContent:'md内容'
            }
          ]
        }
      ]
    },
    {
      name:'Categories',
      attributes:{
        name:'Item',
        attributes:{
          categoryTitle: "JavaScript 手撕代码",
          _id: "14139e12611f3428060dbba71ed08248",
          _openid: "9bf44da2dbb8473da1fcf4f591cb82ff",
        },
        children:[]
      },
      children:[]
    },
    {
      name:'Say',
      attributes:{
        attributes:{},
        children:[
          {
            date: 1656424439329,
            id: 674044419800,
            sayContent: "不管怎样，都要好好努力💪"
          }
        ]
      },
      children:[]
    },
    {
      name:'Link',
      attributes:{
        attributes:{},
        children:[
          {
            name:'Item',
            attributes:'',
            children:[
              {
                id: Math.trunc(Math.random()+Date.now()),
                avatar:'',
                descr:'描述',
                link:"https://www.oneshark.cn/",
                name:"oneshark",
              }
            ]
          }
        ]
      },
      children:[]
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

飞鸟作品数据

```json
{
  cover: "https://img.lzxjack.top/img/202203292224441.webp"
  descr: "使用React写的博客展示页面。"
  link: "https://github.com/lzxjack/blog-show"
  name: "个人博客页面"
  order: "1"
  _id: "2d44d6c2612a44b90794f8ef729fe486"
  _openid: "9bf44da2dbb8473da1fcf4f591cb82ff"


  cover: "https://img.lzxjack.top/img/202203292224442.webp"
  descr: "使用React+腾讯云开发写的博客后台管理页面。"
  link: "https://react-blog-admin-8fo571wf24c87f9-1304393382.ap-shanghai.app.tcloudbase.com/admin/home"
  name: "个人博客后台管理"
  order: "2"
  _id: "14139e12612a4585078cfaf732694261"
  _openid: "9bf44da2dbb8473da1fcf4f591cb82ff"
}
```
