import React from 'react'
import style from './index.module.scss'

export default function Item({ item }) {
  return (
    <div className={style.item} >
      <img className="item_image"
        src={item.giftImage}
        width='280px'
        height='190px'
      />
    </div>
  )
}