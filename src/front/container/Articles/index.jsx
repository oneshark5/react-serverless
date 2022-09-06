import React, { useState, useContext } from 'react'
import Layout from '../Layout';
import ArtList from './ArtList';
import Search from './Search';
import { demoContext } from '../FrontRouter'

function Articles() {
  const { pageSchema } = useContext(demoContext)
  const { children = [] } = pageSchema;
  const childrenSection = children.filter(element => (element.name === 'Section'))
  var sectionData = childrenSection[0].children
  const [where, setWhere] = useState(sectionData)
  const [page, setPage] = useState(1);

  return (
    <>
      <Layout titlt="所有文章">
        <Search
          page={page}
          setPage={setPage}
          where={where}
          setWhere={setWhere}
        >
        </Search >
        <ArtList articles={where}></ArtList>
        {/* <MyPagination></MyPagination> */}
      </Layout>
    </>
  )
}
export default Articles;