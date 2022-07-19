import React, { useEffect, useState } from 'react'
import { parseJsonByString } from '../../../common/utils';
import Layout from '../Layout'
import AboutMe from './AboutMe'
import request from '../../../common/request'

const About = () => {
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
    console.log(pageSchema);
    const { children = [] } = pageSchema;
    const childrenAbout = children.filter(element => (element.name === 'About'))
    var aboutContent = childrenAbout[0].children[0].aboutContent
  }
  return (
    <>
      {
        flag &&
        <Layout title='关于'>
          <AboutMe content={aboutContent} />
        </Layout>
      }
    </>
  )
}
export default About

