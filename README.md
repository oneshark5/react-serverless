

# 技术栈
主要技术：
依赖库：
- react-lazyload  `npm i react-lazyload`


# 初始化
* 删除无用文件
* 安装scss
* 安装normalize.css

# 项目优化
- 图片懒加载
`npm i react-lazyload`
在img遍历的过程中加入Lazyload组件，并准备好替换图片放在placeholder上
```js
{/*代码实现*/}
<div className="good"> 
        {/* lazyload组件，用placeholder存放懒加载时的图片 */}
      <Lazyload placeholder={
        <img width="120%" height="100%"
            src={loading}
        />}>
          <img src={goodItem.img} alt=""/>
      </Lazyload>
      <div className="name">{goodItem.goods}</div>
</div>
```

- 路由懒加载


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

设置协议
<!-- 对前面的schema结构进行精简 -->
<!-- 首页配置化 -->
```json
{
  name:'Page',
  attributes:{
    title:'鲨鱼小站'
  }
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
      name:'List',
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
      name:'Footer',
      attributes:{
        copyright:'',
        record:''
      },
      children:[{
        name:'Item',
        attributes:{
          title:'Vue3 系统入门与项目实战',
          link:''
        },
        children:[]
      }]
    },
  ]
}
```


图库地址
头像：`https://shark-serverless-static-files.oss-cn-beijing.aliyuncs.com/images/avatar.jpeg`
背景1：`https://shark-serverless-static-files.oss-cn-beijing.aliyuncs.com/images/bg.jpeg`
背景2：`https://shark-serverless-static-files.oss-cn-beijing.aliyuncs.com/images/react.jpeg`
背景图片的计算过程
分辨率：1920*697
网页宽度为1280 1920 / 1280 = 1.5
所以高度设置为 697 / 1.5