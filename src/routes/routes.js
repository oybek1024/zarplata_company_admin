import React, {useEffect, useState} from 'react'
import {Redirect, Route, Switch, withRouter, useLocation} from 'react-router-dom'
import routes from '../constants/router'
import guard from '../utils/permissions'
import nprogress from 'nprogress'
import {useSelector} from 'react-redux'
import MenuKey from "@/utils/menuKey"
import {setMenuKey} from "@/redux/actions";
import {useDispatch} from "react-redux";

const Routes = () => {
    const [renderingRoutes, setRenderingRoutes] = useState([])
    const [publicRouteList, setPublicRouteList] = useState([])

    React.useState(nprogress.start());
    const dispatch = useDispatch()
    const location = useLocation()
    useEffect(() => {
      dispatch(setMenuKey(MenuKey(location.pathname)))
      generatedRoutes(routes)
    }, [])


    useEffect(() => {
      nprogress.done();
      return () => nprogress.start();
    })


    const token = useSelector((state) => state.auth.accessToken)
    function generatedRoutes(rout) {
        rout.filter(e => guard(e.meta.permission)).forEach((e, i) => {
            if (e.children && e.children.length) {
                generatedRoutes(e.children)
            } else {
                setPublicRouteList(old => [...old, (<AppRoute key={e} exact path={e.path} component={e.component}/>)])
                setRenderingRoutes(old => [...old, e])
            }
        })
    }

    const AppRoute = ({component: Component, ...rest}) => (
        <Route
            {...rest}
            render={(props) => (
                // <Layout>
                <Component {...props} />
                // </Layout>
            )}
        />
    )
  console.log(publicRouteList)
    return (
        <Switch>
            {publicRouteList}
            {token ? (
                <Redirect from='*' to='/404'/>
            ) : (
                <Redirect from='*' to='/login'/>
            )}
        </Switch>
    )
}

export default withRouter(Routes)
