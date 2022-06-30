import React from 'react'
import { parseJsonByString } from '../../../common/utils'
import Layout from '../Layout'
import AboutMe from './AboutMe'


const About = (props) => {
  const { pageSchema } = props
  const { children = [] } = pageSchema;
  const childrenAbout = children.filter(element => (element.name === 'About'))
  const aboutContent = childrenAbout[0].children[0].aboutContent

  return (
    <Layout title='关于'>
      <AboutMe content={aboutContent} />
    </Layout>
  )
}
export default About