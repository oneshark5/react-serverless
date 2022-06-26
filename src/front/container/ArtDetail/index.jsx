import React from 'react'
import Layout from '../Layout'
import ArtContent from './ArtContent'



const data = {
  testContent: `
  ## 2. BOM和DOM

  ### 基础知识点
  
  * BOM
    浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的方法和接口。
  
    * location
  
      提供了当前窗口中加载文档的信息，以及通常的导航功能。
  
    * history 对象
      history对象主要用来操作浏览器URL的历史记录，可以通过参数向前，向后，或者向指定URL跳转
  
      - history.go() -- 前进或后退指定的页面数 history.go(num);
      - history.back() -- 后退一页
      - history.forward() -- 前进一页
  
    * Navigator
      navigator 对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂。
  
      - navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
      - navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie
  
    * screen
      保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像素高度
  
  * DOM
    DOM 指的是文档对象模型，它指的是把文档当做一个对象，这个对象主要定义了处理网页内容的方法和接口。==DOM 表示由多层节点构成的文档，通过它开发者可以添加、删除和修改页面的各个部分。
    ## 3. BOM和DOM

    ### 基础知识点
    
    * BOM
      浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的方法和接口。
    
      * location
    
        提供了当前窗口中加载文档的信息，以及通常的导航功能。
    
      * history 对象
        history对象主要用来操作浏览器URL的历史记录，可以通过参数向前，向后，或者向指定URL跳转
    
        - history.go() -- 前进或后退指定的页面数 history.go(num);
        - history.back() -- 后退一页
        - history.forward() -- 前进一页
    
      * Navigator
        navigator 对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂。
    
        - navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
        - navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie
    
      * screen
        保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像素高度
    
    * DOM
      DOM 指的是文档对象模型，它指的是把文档当做一个对象，这个对象主要定义了处理网页内容的方法和接口。==DOM 表示由多层节点构成的文档，通过它开发者可以添加、删除和修改页面的各个部分。
      
  `
}

export default function ArtDetail() {
  return (
    <Layout title='Web Workers：在后台线程执行指定脚本'  >
      <ArtContent content={data.testContent} />
    </Layout>
  )
}
