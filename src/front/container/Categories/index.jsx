import React from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout'
import ClassBar from './ClassBar';
import s from './index.module.scss';

const Categories = (props) => {
  const { pageSchema } = props
  const { children = [] } = pageSchema;
  const childrenCategoory = children.filter(element => (element.name === 'Categories'))
  const attributesCategory = childrenCategoory[0].children

  const navigate = useNavigate();

  return (
    <Layout title='分类' className={s.classBox} rows={8}>
      {
        attributesCategory.map(({ attributes }, index) => (
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
export default Categories