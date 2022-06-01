import React from 'react'
import Banner from './components/Banner'
import Courses from './components/Courses'
import Footer from './components/Footer'
import { parseJsonByString } from '../../../common/utils'

let listData = parseJsonByString(window.localStorage.homeData, [])

const Home = () => {
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