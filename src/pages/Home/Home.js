import React from 'react'
import BreadCrumbTemplete from "../../components/breadcrumb/BreadCrumbTemplete"
import './style.css'
import { Card, Tabs, Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'


const ExtraButton = function () {
    return (
        <Button type="primary" icon={<DownloadOutlined />}>
            Download
        </Button>
    )
}


export default function Home() {
    const { TabPane } = Tabs
    const routes = [
        {
            name: 'Home',
            route: '/',
            link: true
        },
        {
            name: 'Contacts',
            link: true,
            route: '/contact'
        },
        {
            name: 'About',
            link: false,
            route: '/contact'
        }
    ]
    return (
        <div>
          <BreadCrumbTemplete routes={routes}/>
          <div className="home">
                  <Tabs defaultActiveKey="1">
                      <TabPane tab="Home" key="1"/>
                      <TabPane tab="Contact" key="2"/>
                      <TabPane tab="About" key="3"/>
                      <TabPane tab="Pricing" key="4"/>
                      <TabPane tab="Support" key="5"/>
                      <TabPane tab="Address" key="6"/>
                  </Tabs>
              <Card title="Home Page" extra={<ExtraButton/>}/>
              <Card>
                  <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                      salom
                  </div>
              </Card>
          </div>
        </div>
    )
}
