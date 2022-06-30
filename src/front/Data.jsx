import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { parseJsonByString } from '../common/utils'
import App from './App'

function Data() {
  const [pageSchema, setPageSchema] = useState({})
  useEffect(() => {
    axios.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data?.data;
      data && setPageSchema(parseJsonByString(data[0].schema))
    })
  }, [])
  console.log('数据', pageSchema);
  return (
    <>
      <App pageSchema={pageSchema} />
    </>
  )
}
export default Data