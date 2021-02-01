import { lazy } from "react";

const Home = lazy(() => import('../pages/Home/Home'))
const Contact = lazy(() => import('../pages/Contact/Contact'))
const Login = lazy(() => import('../pages/Login/Login'))
const routes = [
    {
        path: '/',
        name: 'home',
        exact: true,
        component: Home,
        meta: { title: 'home', icon: 'PieChartOutlined', isAuthorited: true },
        children: []
    },
    {
        path: '/contact',
        name: 'contact',
        exact: true,
        component: Contact,
        meta: { title: 'contact', icon: 'DesktopOutlined', isAuthorited: true },
        children: []
    },
    {
        path: '/login',
        name: 'login',
        exact: true,
        component: Login,
        meta: { title: 'login', isAuthorited: false },
        children: []
    }
]

export default routes
