import { useRequest } from 'ahooks';
import React from 'react';

import Card from '../../Card';


import s from './index.module.scss';
import { useRunTime } from './useRunTime';

const SiteCard = () => {
  const { runTime } = useRunTime();

  return (
    <Card className={s.card}>
      {/* <div className={s.item}>
        <span className={s.key}>总浏览量</span>
        <span className={s.value}>{data?.data[0].count}次</span>
      </div> */}
      <div className={s.item}>
        <span className={s.key}>运行时间</span>
        <span className={s.value}>{runTime}天</span>
      </div>
    </Card>
  );
};

export default SiteCard;

