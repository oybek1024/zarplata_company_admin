import React, { useEffect } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'
import routes from "../constants/router";
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
  useEffect(() => {
     console.log('Ready')
    return () => {
       console.log("Before unmounting")
    }
  },[])
  
  const publicRouteList = routes.map((item, id) => {
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
