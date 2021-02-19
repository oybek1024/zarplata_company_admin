import React from 'react'
import BreadCrumbTemplete from "../../components/breadcrumb/BreadCrumbTemplete";

export default function Contact() {
    const routes = [
        {
            name: 'Home',
            route: '/',
            link: true
        },
        {
            name: 'Celebrity',
            route: '/celebrity',
            link: false
        }
    ]


    return (
        <div>
            <BreadCrumbTemplete routes={routes}/>

        </div>
    )
}
