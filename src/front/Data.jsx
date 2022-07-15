import request from '../common/request'
import React, { useState, useEffect } from 'react'
import { parseJsonByString } from '../common/utils'
import App from './App'

function Data() {
  const [pageSchema, setPageSchema] = useState({})
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    request.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data;
      if(data){
        setPageSchema(parseJsonByString(data[0].schema))
        setFlag(true)
      } 
    })
  }, [])
  
  return (
    <>
      {
        flag && <App pageSchema={pageSchema} />
      }
    </>
  )
}
export default Data