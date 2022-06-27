import React from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout'
import ClassBar from './ClassBar';
import s from './index.module.scss';

const data = [
  {
    class: "JavaScript 手撕代码",
    count: 12,
    _id: "14139e12611f3428060dbba71ed08248",
    _openid: "9bf44da2dbb8473da1fcf4f591cb82ff",
  },
  {
    class: "前端基础",
    count: 29,
    _id: "8937eaa9611f34c1057f523a643b60d4",
    _openid: "9bf44da2dbb8473da1fcf4f591cb82ff",
  },
]

export default function Categories() {
  const navigate = useNavigate();

  return (
    <Layout title='分类' className={s.classBox} rows={8}>
      {data.map((item) => (
        <ClassBar
          className={s.classItem}
          key={item._id}
          content={item.class}
          num={item.count}
          onClick={() => navigate(`/artDetail`)}
        />
      ))}
    </Layout>
  )
}
