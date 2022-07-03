import classNames from 'classnames';
import React from 'react';

import styles from './index.module.scss';


// 解构和插槽
const PageTitle = ({ title, desc, className, children }) => {
  return (
    <div className={classNames(styles.box, className)}>
      <div className={styles.title}>{title}</div>
      {desc && <div className={styles.desc}>{desc}</div>}
      {children}
    </div>
  );
};

export default PageTitle;
