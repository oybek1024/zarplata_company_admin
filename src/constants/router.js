import { lazy } from 'react'
const Home = lazy(() => import('../pages/Home/Home'))
const Contact = lazy(() => import('../pages/Contact/Contact'))
const NotFound = lazy(() => import('../pages/statuses/404'))
const routes = [
  {
    path: '/admin',
    name: 'home',
    exact: true,
    component: Home,
    meta: { title: 'home', icon: 'PieChartOutlined', isAuthorited: true },
    children: [],
  },
  {
    path: '/admin/contact',
    name: 'contact',
    exact: true,
    component: Contact,
    meta: { title: 'contact', icon: 'DesktopOutlined', isAuthorited: true },
    children: [],
  },
  // {
  //     path: '/login',
  //     name: 'login',
  //     exact: true,
  //     component: Login,
  //     meta: { title: 'login', isAuthorited: false },
  //     children: []
  // },
  {
    path: '/admin/404',
    name: '404',
    exact: true,
    component: NotFound,
    hidden: true,
    meta: { title: '404', isAuthorited: true },
    children: [],
  },
]

export default routes
