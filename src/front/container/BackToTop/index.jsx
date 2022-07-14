import './index.custom.scss';

import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { BackTop } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { setNavShow } from '../../redux/action';

import styles from './index.module.scss';

const BackToTop = ({ setNavShow }) => {
  const backTop = () => {
    setNavShow?.(true);
  };

  return (
    <BackTop className={styles.antBackTop} duration={700} visibilityHeight={300} onClick={backTop} >
      <div className={styles.backTop}>
        <VerticalAlignTopOutlined />
      </div>
    </BackTop>
  );
};

export default connect(() => ({}), {
  setNavShow
})(BackToTop);
