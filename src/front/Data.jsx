import request from '../common/request'
import React, { useState, useEffect } from 'react'
import { parseJsonByString } from '../common/utils'
import App from './App'

function Data() {
  const [pageSchema, setPageSchema] = useState({})
  const [flag, setFlag] = useState(false)
  //这里取的首屏结束的时间点,我们需要的首屏时间段：应该是fpEntry.startTime
  // function firstPaintTime() {
  //   if (window.PerformancePaintTiming) {
  //     const fpEntry = performance.getEntriesByType('paint')[0];
  //     console.log(fpEntry);
  //     return (fpEntry.startTime + performance.timeOrigin) / 1000;
  //   }
  // }
  // firstPaintTime()
  
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