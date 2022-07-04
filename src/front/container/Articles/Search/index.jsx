import React, { useRef } from 'react'
import { ArrowRightOutlined, RedoOutlined } from '@ant-design/icons';
import { useKeyPress, useMemoizedFn, useSafeState } from 'ahooks';
import s from './index.module.scss';

// 可以手写防抖节流实现
function Search() {
  const inputRef = useRef(null);
  const [input, setInput] = useSafeState('');
  const search = useMemoizedFn(() => {

  })
  const reset = useMemoizedFn(() => {
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