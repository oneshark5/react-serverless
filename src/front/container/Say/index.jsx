import React from 'react'
import Layout from '../Layout'
import SayPop from './SayPop'

const data = [
  {
    content: "还是老老实实用对象存储作图床吧，jsDelivr+Github太不稳定了😢😢",
    date: 1654086837795,
    _id: Date.now(),
    _openid: "dbee9976b3c14448a06f2006a4795cf2",
  },
  {
    content: "还是老老实实用对象存储作图床吧，jsDelivr+Github太不稳定了😢😢",
    date: 1654086837795,
    _id: "6d85a2b962975cb6081d30fb18dd83e2",
    _openid: "dbee9976b3c1448a06f2006a4795cf2",
  },

]

export default function Say() {
  return (
    <Layout title='记录'>
      {
        data.map(({ _id, content, date }) => (
        <SayPop key={_id} content={content} date={date} />
      ))
      }
    </Layout>
  )
}
