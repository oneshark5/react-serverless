export const useLinkList = () => {
  const mobileNavArr = [
    { name: '主页', to: '/' },
    { name: '说说', to: '/say' },
    { name: '相册', to: '/camera' },
    { name: '作品', to: '/show' },
    { name: '关于', to: '/about' },
  ];

  return {
    mobileNavArr
  };
};
