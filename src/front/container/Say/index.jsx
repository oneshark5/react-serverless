import React from 'react'
import Layout from '../Layout'
import SayPop from './SayPop'

export default function Say(props) {
  const { pageSchema } = props
  const { children = [] } = pageSchema;
  const childrenSay = children.filter(element => (element.name === 'Say'))
  const sayContents = childrenSay[0].children

  return (
    <Layout title='关于你呀👼'>
      {
        sayContents.map(({ id, sayContent, date }) => (
        <SayPop key={id} content={sayContent} date={date} />
      ))
      }
    </Layout>
  )
}
