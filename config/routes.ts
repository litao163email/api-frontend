export default [
  //用户登录
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { name: 'API列表', icon: 'table', path: '/list', component: './Index' },
  { name: 'API详情', icon: 'table', path: '/list/details/:id', component: './InterfaceDetails', hideInMenu:true},
  { path: '/list/manger', icon: 'table',name: 'API管理', component: './Admin/InterfaceInfo' },
  { path: '/list/analysis', icon: 'table',name: 'API分析', component: './Admin/InterfaceAnalysis' },
  // {
  //   name: 'API管理系统',
  //   path: '/admin',
  //   icon: 'crown',
  //   // access: 'canAdmin',
  //   routes: [
  //     { path: '/list/manger', name: 'API管理', component: './Admin/InterfaceInfo' },
  //     { path: '/list/analysis', name: 'API分析', component: './Admin/InterfaceAnalysis' },
  //   ],
  // },
  { path: '/', redirect: '/list' },
  { path: '*', layout: false, component: './404' },
];
