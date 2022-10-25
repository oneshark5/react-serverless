import React from 'react'
import { useEffect } from 'react';
import Item from './Item'
import style from './index.module.scss'

export function debounce(fn, time) {
  let timer = null;
  return function (...arg) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, time);
  };
}

export default function ScrollView(props) {
  const { data, scroll, scrolltolower } = props;
  const list = data.list

  useEffect(() => {
    document.addEventListener('scroll', handerScroll)
  }, [list]);

  /* -----自定义事件---- */
  /* 控制滚动条滚动 */
  const handerScroll = (e) => {
    // console.log('⭐测试输出')
    scroll && scroll(e)
    debounce(handerScrolltolower(e), 200)
  }
  /* 判断滚动条是否到底部 */
  // scrollHeight 元素内容高度(包括由于溢出导致的视图中不可见内容。)
  // scrollTop 元素的内容顶部（卷起来的）到它的视口可见内容（的顶部）的距离
  // offsetHeight  获取 div 元素的高度，包含内边距（padding）和边框（border）
  const handerScrolltolower = (e) => {
    // console.log('到底就输出', scrolltolower)
    const { scrollHeight, scrollTop, offsetHeight } = e.target.scrollingElement
    console.log('距数据最低端距离', offsetHeight - scrollTop);
    console.log(scrollHeight);
    console.log(scrollTop);
    console.log(offsetHeight);
    console.log(scrollTop + offsetHeight);
    if (scrollHeight < scrollTop + offsetHeight+10) { /* 到达容器底部位置 */
      scrolltolower && scrolltolower()
    }
  }

  return <div className={style.listBox}>
    {
      list.map((item, index) => (
        <Item key={index} item={item} />
      ))
    }
  </div>

}