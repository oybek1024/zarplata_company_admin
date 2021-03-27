import { lazy } from 'react'


const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   isSub: false,
  //   component: lazy(() => import('@/pages/Home/Home')),
  //   meta: { title: 'home', icon: 'PieChartOutlined', permission: 'home' },
  //   children: [],
  // },
  {
    path: '/celebrity',
    name: 'celebrity',
    isSub: false,
    component: lazy(() => import('@/pages/Celebrity/List')),
    meta: { title: 'celebrity', icon: 'UserOutlined', permission: 'celebrity' },
    children: [
      {
        path: '/celebrity/create',
        name: 'CelebrityCreate',
        component: lazy(() => import('@/pages/Celebrity/Create')),
        meta: { title: 'celebrity', icon: 'UserOutlined', permission: 'celebrity' },
        children: []
      },
      {
        path: '/celebrity/edit',
        name: 'CelebrityEdit',
        component: lazy(() => import('@/pages/Celebrity/Create')),
        meta: { title: 'celebrity', icon: 'UserOutlined', permission: 'celebrity' },
        children: []
      }
    ],
  },
  {
    path: '/category',
    name: 'category',
    isSub: false,
    component: lazy(() => import('@/pages/Category/List')),
    meta: { title: 'category', icon: 'AppstoreOutlined', permission: 'category' },
    children: [
      {
        path: '/category/create',
        name: 'CategoryCreate',
        component: lazy(() => import('@/pages/Category/Create')),
        meta: { title: 'category', icon: 'AppstoreOutlined', permission: 'category' },
        children: []
      }
    ],
  },
  {
    path: '/featured',
    name: 'featured',
    isSub: false,
    component: lazy(() => import('@/pages/Featured/List')),
    meta: { title: 'featured', icon: 'AppstoreOutlined', permission: 'featured' },
    children: [
      {
        path: '/featured/create',
        name: 'FeaturedCreate',
        component: lazy(() => import('@/pages/Featured/Create')),
        meta: { title: 'featured', icon: 'AppstoreOutlined', permission: 'featured' },
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
