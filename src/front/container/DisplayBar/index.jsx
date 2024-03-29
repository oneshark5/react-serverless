import React from 'react';

// import DisplayBarLoading from './DisplayBarLoading';
import s from './index.module.scss';

const DisplayBar = ({ content = '', right = '' }) => {
  const handleRoute = () => {
    
  }
  return (
    <div className={s.displayBar} onClick={handleRoute}>
      <div className={s.content}>{content}</div>
      <div className={s.rightContent}>
        <div className={s.rightBar}>{right}</div>
      </div>
    </div>
  );
};

export default DisplayBar

