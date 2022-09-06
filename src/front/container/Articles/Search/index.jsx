import React, { useRef } from 'react'
import { ArrowRightOutlined, RedoOutlined } from '@ant-design/icons';
import { useKeyPress, useMemoizedFn, useSafeState } from 'ahooks';
// import { message } from 'antd';
import s from './index.module.scss';

// 可以手写防抖节流实现
const Search = ({where, setWhere}) => {
  console.log('where⭐',where);
  const inputRef = useRef(null);
  const [input, setInput] = useSafeState('');

  const search = useMemoizedFn(() => {
    if (!input) {
      // message.info('请输入关键词再搜索!');
      alert('请输入关键词再搜索!')
      return;
    }
    let regex = new RegExp(input, 'gi')
    const changeTitle = where.filter(item => regex.test(item.attributes.title))
    console.log(changeTitle);
    setWhere(changeTitle)
  })
  const reset = useMemoizedFn(() => {

  });

  useKeyPress(13, search, {
    target: inputRef
  });

  useKeyPress(27, reset, {
    target: inputRef
  });

  return (
    <div className={s.searchBox}>
      <input 
        ref={inputRef}
        autoFocus
        type='text'
        placeholder='搜索文章标题...'
        className={s.search}
        value={input}
        onChange={e => setInput?.(e.target.value)}
      />
      {/* 搜索按钮 */}
      <div className={s.searchBtn} onClick={search}>
        <ArrowRightOutlined />
      </div>
      {/* 重置按钮 */}
      <div className={s.searchBtn} onClick={reset}>
        <RedoOutlined />
      </div>
    </div>
  )
}
export default Search