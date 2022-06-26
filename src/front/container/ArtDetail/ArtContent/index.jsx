import React from 'react';
import MarkDown from '../../MarkDown';

const ArtContent = ({ content, className }) => {
  
  return (
    <div className={className}>
      <MarkDown content={content || ''} />
    </div>
  );
};

export default ArtContent;
