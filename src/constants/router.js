import { lazy } from 'react'


const routes = [
  {
    path: '/',
    name: 'home',
    isSub: false,
    component: lazy(() => import('@/pages/Home/Home')),
    meta: { title: 'home', icon: 'PieChartOutlined', permission: 'home' },
    children: [],
  },
  {
    path: '/celebrity',
    name: 'celebrity',
    isSub: false,
    component: lazy(() => import('@/pages/Celebrity/List')),
    meta: { title: 'celebrity', icon: 'UserOutlined', permission: 'celebrity' },
    children: [
      // {
      //   path: '/celebrity/list',
      //   name: 'CelebrityList',
      //   exact: true,
      //   component: lazy(() => import('@/pages/Celebrity/List')),
      //   meta: { title: 'celebrity', icon: 'UserOutlined', permission: 'celebrity' },
      //   children: []
      // },
      {
        path: '/celebrity/create',
        name: 'CelebrityCreate',
        component: lazy(() => import('@/pages/Celebrity/CreateWithUpdate')),
        meta: { title: 'celebrity', icon: 'UserOutlined', permission: 'celebrity' },
        children: []
      }
    ],
  },
  {
    path: '/clients',
    name: 'clients',
    isSub: false,
    component: lazy(() => import('@/pages/Clients/Clients')),
    meta: { title: 'clients', icon: 'UserOutlined', permission: 'clients' },
    children: [],
  },
  {
    path: '/404',
    name: '404',
    component: lazy(() => import('@/pages/statuses/404')),
    hidden: true,
    meta: { title: '404', permission: '404' },
    children: [],
  },
]

export default routes
