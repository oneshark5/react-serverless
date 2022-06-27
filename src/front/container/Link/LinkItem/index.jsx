import classNames from 'classnames';
import React from 'react';

import s from './index.module.scss';

const LinkItem = ({ link, avatar, name, descr }) => {
  const { imgRef, imgUrl } = avatar

  return (
    <div className={s.item}>
      <a href={link} rel='noreferrer' target='_blank' className={s.link}>
        <div ref={imgRef} className={s.left}>
          <img
            src={imgUrl}
            className={classNames({
              [s.avatar]: imgUrl,
              [s.loading]: imgUrl 
            })}
          />
        </div>
        <div className={s.right}>
          <div className={s.title}>{name}</div>
          <div className={s.descr}>{descr}</div>
        </div>
      </a>
    </div>
  );
};

export default LinkItem;
