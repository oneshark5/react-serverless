import React, { useEffect, useState } from 'react'
import { listData } from '../utils/mock'
import ScrollView from './ScrollView';




const fetchData = (page) => {
  return new Promise((resolve) => {
    resolve({
      ...listData,
      page,
      list: listData.list.slice(5 * (page - 1), 5 * page)
    })
  })
}

const Camera = () => {
  console.log('----获取数据-----')
  const [data, setData] = useState({ list: [], page: 0, pageCount: 1 }) /* 记录列表数据 */
  /* 请求数据 */
  const getData = async () => {
    if (data.page === data.pageCount) return console.log('没有数据了～')
    const res = await fetchData(data.page + 1)
    const payload = {
      ...res,
      list: res.page === 1 ? res.list : data.list.concat(res.list)
    }
    // console.log(payload, 'payloadpayloadpayload')
    if (res.code === 0) setData(payload)
  }
  /* 滚动到底部触发 🦈到底后,子组件 回调函数然后再次请求数据 */
  const handerScrolltolower = () => {
    console.log('scroll已经到底部')
    getData()
  }

  /* 初始化请求数据 */
  useEffect(() => {
    getData()
  }, [])


  return <ScrollView
      data={data}  /* Item 渲染的单元组件 */
      scroll={() => { }}
      scrolltolower={handerScrolltolower}
    />
}
export default Camera