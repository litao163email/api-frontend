export default [
  //用户登录
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    name: '管理页',
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { name: '管理API', icon: 'table', path: '/list/manger', component: './InterfaceInfo' },
  { path: '/', redirect: '/list/manger' },
  { path: '*', layout: false, component: './404' },
];
