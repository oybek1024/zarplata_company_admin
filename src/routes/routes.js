import React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import routes from '../constants/router'
import guard from '../utils/permissions'
import { useSelector } from 'react-redux'

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
  const token = useSelector((state) => state.auth.accessToken)

  const publicRouteList = routes
    .filter(
      (e) =>
        guard(e.meta.title) &&
        (token ? e.meta.isAuthorited : !e.meta.isAuthorited)
    )
    .map((item, id) => {
      return (
        <AppRoute key={id} exact path={item.path} component={item.component} />
      )
    })
  console.log(
    routes.filter(
      (e) =>
        guard(e.meta.title) &&
        (token ? e.meta.isAuthorited : !e.meta.isAuthorited)
    )
  )

  return (
    <Switch>
      {publicRouteList}
      {token ? (
        <Redirect from='*' to='/404' />
      ) : (
        <Redirect from='*' to='/login' />
      )}
    </Switch>
  )
}

export default withRouter(Routes)
