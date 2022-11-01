import React from 'react'

import s from './index.module.scss';
import dayjs from 'dayjs';
import DisplayBar from '../../DisplayBar';
import { useNavigate } from 'react-router-dom';

const ArtList = ({ articles }) => {
  const navigate = useNavigate()
  const handleRoute = (id) => {
    navigate(`/artDetail?id=${id}`);
  }
  
  return (
    <>
      {
        articles?.length ? (
          articles?.map((item) =>
            <div
              key={item.attributes.id}
              onClick={() => handleRoute(item.attributes.id)}
            >
              <DisplayBar
                // key={item.attributes.id}
                content={item.attributes.title}
                right={dayjs(item.attributes.createTime).format('YYYY-MM-DD')}
              />
            </div>
          )
        ) : (
          <div className={s.none}>暂时无相应文章 ~</div>
        )
      }
    </>
  )
}
export default ArtList