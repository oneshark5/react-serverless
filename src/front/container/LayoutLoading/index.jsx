import { Skeleton } from 'antd';
import React from 'react';


const LayoutLoading = ({ rows = 10 }) => (
  <Skeleton paragraph={{ rows }} />
);

export default LayoutLoading;
