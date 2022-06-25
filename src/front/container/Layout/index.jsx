import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import { connect } from 'react-redux';

import Card from '../Card';
import LayoutLoading from '../LayoutLoading';
import PageTitle from '../PageTitle';
import s from './index.module.scss';


const Layout = ({
  title,
  className,
  setNavShow,
  loading,
  children,
  classes,
  date,
  isPost = false,
  rows
}) => {


  return (
    <>
      <PageTitle title={title} className={classNames({ [s.postTitle]: isPost })}>
        {isPost && (
          <div>
            <span className={s.articleClass}>{classes}</span>
            <span className={s.articleDate}>
              {dayjs(date).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </div>
        )}
      </PageTitle>
      <Card isStatic={true} className={classNames(s.layoutCard, className)}>
        {loading ? <LayoutLoading rows={rows} /> : children}
      </Card>
    </>
  );
};

export default Layout
