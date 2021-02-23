import React, { useEffect } from 'react'
import { Redirect, Route, Switch, withRouter, useLocation } from 'react-router-dom'
import routes from '../constants/router'
import guard from '../utils/permissions'
import nprogress from 'nprogress'
import { useSelector } from 'react-redux'
import MenuKey from "@/utils/menuKey"
import { setMenuKey } from "@/redux/actions";
import { useDispatch } from "react-redux";

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


  React.useState(nprogress.start());
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    dispatch(setMenuKey(MenuKey(location.pathname)))
    nprogress.done();
    return () => nprogress.start();
  })

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
