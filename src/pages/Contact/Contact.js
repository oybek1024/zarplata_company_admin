import React from 'react'
import { useParams } from 'react-router-dom'
import ContentMain from "../content/ContentMain";

export default function Contact() {
  const params = useParams()
  console.log(params)
  const routes = [
    {
      name: 'Home',
      route: '/',
      link: true
    },
    {
      name: 'Contact',
      link: true,
      route: '/contact'
    }
  ]


  return (
      <div>
        <ContentMain routes={routes}/>
      </div>
  )
}
