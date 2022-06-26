import React from 'react';

import s from './index.module.scss';


const ShowItem = ({ cover, link, name, descr }) => {
  return (
    <div style={{ backgroundImage: `url(${cover})` }} className={s.showItem}>
      <a href={link} rel='noreferrer' target='_blank' className={s.link}>
        <div className={s.title}>
          <span>{name}</span>
        </div>
        <div className={s.descr}>{descr}</div>
        <div className={s.mask} />
      </a>
    </div>
  );
};

export default ShowItem;
