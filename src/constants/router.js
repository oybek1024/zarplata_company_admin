import { lazy } from "react";

const Home = lazy(() => import('../pages/Home/Home'))
const Contact = lazy(() => import('../pages/Contact/Contact'))

const routes = [
    {
        path: '/',
        name: 'home',
        icon: 'PieChartOutlined',
        exact: true,
        component: Home,
        children: []
    },
    {
        path: '/contact',
        name: 'contact',
        icon: 'DesktopOutlined',
        exact: true,
        component: Contact,
        children: []
    }
]

export default routes
