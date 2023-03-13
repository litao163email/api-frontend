export default [
  //用户登录
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { name: 'API列表', icon: 'table', path: '/list', component: './Index' },
  { name: 'API详情', icon: 'table', path: '/details/:id', component: './InterfaceDetails', hideInMenu:true},
  { path: '/manger', icon: 'table',name: 'API管理', component: './Admin/InterfaceInfo' },
  { path: '/analysis', icon: 'table',name: 'API分析', component: './Admin/InterfaceAnalysis' },
  { path: '/', redirect: '/list' },
  { path: '*', layout: false, component: './404' },
];
