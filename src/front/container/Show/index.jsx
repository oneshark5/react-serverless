import React from 'react'
import Layout from '../Layout'
import ShowItem from './ShowItem'
import s from './index.module.scss';

const data = [
  {
    cover: "https://img.lzxjack.top/img/202203292224441.webp",
    descr: "使用React写的博客展示页面。",
    link: "https://github.com/lzxjack/blog-show",
    name: "个人博客页面",
    order: "1",
    _id: "2d44d6c261244b90794f8ef729fe486",
    _openid: "9bf44da2dbb8473da1fcf4f591cb82ff",
  },
  {
    cover: "https://img.lzxjack.top/img/202203292224442.webp",
    descr: "使用React+腾讯云开发写的博客后台管理页面。",
    link: "https://react-blog-admin-8fo571wf24c87f9-1304393382.ap-shanghai.app.tcloudbase.com/admin/home",
    name: "个人博客后台管理",
    order: "2",
    _id: "14139e1212a4585078cfaf732694261",
    _openid: "9bf44da2dbb8473da1fcf4f591cb82ff",
  },
  {
    cover: "https://img.lzxjack.top/img/202203292224441.webp",
    descr: "使用React写的博客展示页面。",
    link: "https://github.com/lzxjack/blog-show",
    name: "个人博客页面",
    order: "1",
    _id: "2d44d6c2612a4b90794f8ef729fe486",
    _openid: "9bf44da2dbb8473da1fcf4f591cb82ff",
  },
]

export default function Resume() {
  return (
    <Layout title='作品' className={s.showBox}>
      {data.map((item) => (
        <ShowItem
          key={item._id}
          cover={item.cover}
          link={item.link}
          name={item.name}
          descr={item.descr}
        />
      ))}
    </Layout>
  )
}
