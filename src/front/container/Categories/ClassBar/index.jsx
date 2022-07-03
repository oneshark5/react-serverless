import classNames from 'classnames';
import React, { MouseEventHandler } from 'react';

import s from './index.module.scss';


const ClassBar = ({ content, num, onClick, className }) => {
  return (
    <div className={classNames(s.classBar, className)} onClick={onClick}>
      {content}
      <div className={s.classNum}>{num}</div>
    </div>
  );
};

export default ClassBar;
