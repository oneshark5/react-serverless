import React from 'react'
import Layout from '../Layout'
import LinkItem from './LinkItem'
import s from './index.module.scss';

const data = [
  {
    avatar: "https://img.lzxjack.top/img/202203311655126.webp",
    descr: "青石落晚巷 故人未还乡",
    link: "https://www.nesxc.com/",
    name: "小N同学",
    _id: "14139e12611f4027060f9f3c611eb99c",
    _openid: "9bf44da2dbb8473da1fcf4f591cb82ff",
  }
]

export default function Link() {
  return (
    <Layout title='友链' className={s.box}>
      {data.map((item) => (
        <LinkItem
          key={item._id}
          link={item.link}
          avatar={item.avatar}
          name={item.name}
          descr={item.descr}
        />
      ))}
    </Layout>
  )
}
