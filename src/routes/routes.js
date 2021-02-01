import React from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import routes from "../constants/router";
import guard from "../utils/permissions";
const token = false
const AppRoute = ({component: Component, layout: Layout, ...rest}) => (
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
  // useEffect(() => {
  //    console.log('Ready')
  //   return () => {
  //      console.log("Before unmounting")
  //   }
  // },[])
  
  const publicRouteList = routes
      .filter(e => guard(e.meta.title) && (token ? e.meta.isAuthorited : !e.meta.isAuthorited))
      .map((item, id) => {
    return (
      <AppRoute
        key={id}
        exact
        path={item.path}
        component={item.component}
      />
    )
  })

  return (
    <Switch>
      {publicRouteList}
        {
            token ? (<Redirect from='*' to='/404' />) : (<Redirect from='*' to='/login' />)
        }
    </Switch>
  )
}

export default withRouter(Routes)
