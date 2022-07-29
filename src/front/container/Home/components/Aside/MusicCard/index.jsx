import React from 'react';
import Card from '../../Card';
import s from './index.module.scss';

const MusicCard = () => {

  return (
    <Card className={s.card}>
      <div>
      <iframe frameborder="no" border="0" 
        marginwidth="0" marginheight="0" 
        width="298px" height="52px" 
        src="//music.163.com/outchain/player?type=0&id=3136952023&auto=1&height=32"
        className={s.musicItem}
      />
      </div>
    </Card >
  );
};

export default MusicCard;

