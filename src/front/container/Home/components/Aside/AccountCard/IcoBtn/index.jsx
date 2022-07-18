import { Popover } from 'antd';
import React from 'react';

import s from './index.module.scss';

const IcoBtn = ({ isLink, link, content, children }) => {

  return isLink ? (
    <a className={s.socialBtn} href={link} target='_blank' rel='noreferrer'>
      {children}
    </a>
  ) : (
    // 气泡卡片
    <Popover
      trigger='hover'
      className={s.socialBtn}
      content={content}
      overlayClassName={s.card}
    >
      {children}
    </Popover>
  );
};

export default IcoBtn;
