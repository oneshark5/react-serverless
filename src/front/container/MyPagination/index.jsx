import './pagination.custom.scss';

import { Pagination } from 'antd';
import React from 'react';

import s from './index.module.scss';

const MyPagination = ({
  current,
  defaultPageSize = 8,
  total = 0,
  setPage,
  scrollToTop = 0,
  autoScroll = false,
}) => {
  return (
    <>
      {total > defaultPageSize ? (
        <div id='myPagination' className={s.pageBox}>
          <Pagination
            current={current}
            total={total}
            defaultPageSize={defaultPageSize}
            showSizeChanger={false}
            showTitle={false}
            onChange={(page) => {
              setPage?.(page);
              autoScroll && window.scrollTo(0, scrollToTop);
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default MyPagination
