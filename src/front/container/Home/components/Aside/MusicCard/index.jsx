import React from 'react';
import Card from '../../Card';
import s from './index.module.scss';

const MusicCard = () => {

  return (
    <Card className={s.card}>
      <div>
      <iframe frameBorder="no" border="0" 
        marginWidth="0" marginHeight="0" 
        width="298px" height="52px" 
        src="//music.163.com/outchain/player?type=0&id=3136952023&auto=1&height=32"
        className={s.musicItem}
      />
      </div>
    </Card >
  );
};

export default MusicCard;

