import React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import { lazy } from 'react'

// const MainLayout = lazy(() => import('../layouts/MainLayout'))
const Home = lazy(() => import('../pages/Home/Home'))
const Contact = lazy(() => import('../pages/Contact/Contact'))

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      // <Layout>
        <Component {...props} />
      // </Layout>
    )}
  />
)

const Routes = () => {
  const publicRoutes = [
    {
      path: '/',
      exact: true,
    //   layout: MainLayout,
      component: Home,
    },
    {
      path: '/contact',
      exact: true,
    //   layout: MainLayout,
      component: Contact,
    },
  ]

  const publicRouteList = publicRoutes.map((item, id) => {
    return (
      <AppRoute
        key={id}
        exact
        path={item.path}
        layout={item.layout}
        component={item.component}
      />
    )
  })

  return (
    <Switch>
      {publicRouteList}
      <Redirect from='*' to='/404' />
    </Switch>
  )
}

export default withRouter(Routes)
