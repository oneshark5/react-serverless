import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { parseJsonByString } from '../../../common/utils';
import Layout from '../Layout'
import ClassBar from './ClassBar';
import s from './index.module.scss';
import request from '../../../common/request'

const Categories = () => {
  const [pageSchema, setPageSchema] = useState({})
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    request.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data;
      if (data) {
        setPageSchema(parseJsonByString(data[0].schema))
        setFlag(true)
      }
    })
  }, [])
  if (flag) {
    const { children = [] } = pageSchema;
    const childrenCategoory = children.filter(element => (element.name === 'Categories'))
    var attributesCategory = childrenCategoory[0].children
  }

  const navigate = useNavigate();

  return (
    <>
      {
        flag &&
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
      }
    </>
  )
}
export default Categories