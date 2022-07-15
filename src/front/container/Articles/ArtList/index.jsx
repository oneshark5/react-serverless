import React from 'react'

import s from './index.module.scss';
import dayjs from 'dayjs';
import DisplayBar from '../../DisplayBar';

const ArtList = ({articles}) => {

  return (
    <>
      {
        articles?.length ? (
          articles?.map((item) => 
            <DisplayBar
              key={item.attributes.id}
              content={item.attributes.title}
              right={dayjs(item.attributes.createTime).format('YYYY-MM-DD')}
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