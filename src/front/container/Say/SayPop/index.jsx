import dayjs from 'dayjs';
import React from 'react';

import { myAvatar70 } from '../../utils/constant';

import s from './index.module.scss';

const SayPop = ({ content, date }) => (
  <div className={s.sayItem}>
    <div className={s.avatarBox}>
      <img src={myAvatar70} className={s.avatar} alt="头像" />
    </div>

    <div className={s.contentBox}>
      <div className={s.content}>
        {content}
        <span className={s.date}>{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</span>
      </div>
    </div>
  </div>
);

export default SayPop;
