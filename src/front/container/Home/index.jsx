import React, { useEffect, useRef } from 'react'
import Banner from './components/Banner'
import Courses from './components/Courses'
import Footer from './components/Footer'
import { parseJsonByString } from '../../../common/utils'

let listData = parseJsonByString(window.localStorage.homeData, [])

export const useDocumentTitle = (title, keepAlive = true) => {
	// 获取当前最新的 document.title 值
	const oldTitle = useRef(document.title).current;
	useEffect(()=>{
		// 根据传入的 title 更新 document.title
		document.title = title
	}, [title])
	useEffect(() => {
		return () => {
			if(!keepAlive){
				// 如果在组件销毁的时候不保留传入的 title,则需要手动卸载传入的 title
				document.title = oldTitle
			}
		}
	}, [keepAlive, oldTitle])
}

const Home = () => {
  useDocumentTitle(window.localStorage.title || 'oneshark')
  return (
    <div>
      <Banner/>
      <Courses/>
      <Footer/>
      {
        listData.map(item => {
          return <div className='wrapper'>area</div>
        })
      }
    </div>
  )
}
export default Home