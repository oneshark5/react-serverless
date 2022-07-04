import React from 'react'

import s from './index.module.scss';
import dayjs from 'dayjs';
import DisplayBar from '../../DisplayBar';

const ArtList = ({articles}) => {

  console.log(articles);
  

  return (
    <>
      {
        articles?.length ? (
          articles?.map((item) => 
            <DisplayBar
              key={item._id}
              content={item.title}
              right={dayjs(item.date).format('YYYY-MM-DD')}
            />
          )
        ) : (
          <div className={s.none}>暂时无相应文章 ~</div>
        )
      }
    </>
  )
}
export default ArtList