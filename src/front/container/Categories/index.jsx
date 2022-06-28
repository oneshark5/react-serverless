import React from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout'
import ClassBar from './ClassBar';
import { parseJsonByString } from '../../../common/utils'
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

// 获取schema数据
const pageSchema = parseJsonByString(window.localStorage.schema, {})
const { children = [] } = pageSchema;
const childrenCategoory = children.filter(element => (element.name === 'Categories'))
const attributesCategory = childrenCategoory[0].children
console.log(attributesCategory);


export default function Categories() {
  const navigate = useNavigate();

  return (
    <Layout title='分类' className={s.classBox} rows={8}>
      {
        attributesCategory.map(({attributes}, index) => (
          <ClassBar
            className={s.classItem}
            key={index}
            content={attributes.title}
            onClick={() => navigate(`/artDetail`)}
          />
        ))
      }
    </Layout>
  )
}
