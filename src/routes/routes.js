import React, {useEffect, useState} from 'react'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import routes from '../constants/router'
import guard from '../utils/permissions'
import nprogress from 'nprogress'
import {useSelector} from 'react-redux'
import { useTranslation } from 'react-i18next'

const Routes = () => {
    const [publicRouteList, setPublicRouteList] = useState([])
    const [isGenerated, setIsGenerated] = useState(false)

    React.useState(nprogress.start())


    useEffect(() => {
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
                setPublicRouteList(old => [...old, (<AppRoute key={e} exact path={e.path} component={e.component}/>)])
                generatedRoutes(e.children)
            } else {
                setPublicRouteList(old => [...old, (<AppRoute key={e} exact path={e.path} component={e.component}/>)])
                // setRenderingRoutes(old => [...old, e])
                setIsGenerated(true)
            }
        })
    }

    const AppRoute = ({component: Component, ...rest}) => (
        <Route {...rest} render= {(props) => ( <Component {...props} /> )} />
    )

    console.log(publicRouteList)
    console.log("Token: ", token)

    return (
        <>
            {isGenerated ? (
                <Switch>
                    {publicRouteList}
                    { token ? (<Redirect from='/' to='/celebrity'/>) : undefined}
                    { token ? (
                        // undefined
                        <Redirect from='*' to='/404'/>
                    ) : (
                        <Redirect from='*' to='/login'/>
                    )}
                </Switch>
            ) : (
                undefined
            )}
        </>
    )
}

export default withRouter(Routes)
