import { lazy } from 'react'
const Home = lazy(() => import('../pages/Home/Home'))
const Contact = lazy(() => import('../pages/Contact/Contact'))
const NotFound = lazy(() => import('../pages/statuses/404'))

const routes = [
  {
    path: '/',
    name: 'home',
    exact: true,
    component: Home,
    meta: { title: 'home', icon: 'PieChartOutlined', isAuthorited: true },
    children: [],
  },
  {
    path: '/contact',
    name: 'contact',
    exact: true,
    component: Contact,
    meta: { title: 'contact', icon: 'DesktopOutlined', isAuthorited: true },
    children: [],
  },
  {
    path: '/404',
    name: '404',
    exact: true,
    component: NotFound,
    hidden: true,
    meta: { title: '404', isAuthorited: true },
    children: [],
  },
]

export default routes
