import React, {useState} from 'react'
import {Button, Layout, notification} from 'antd'
import RightContent from '@/components/RightContent'
import MenuHeader from '@/components/MenuHeader'
import MainMenu from '@/components/menu/Menu'
import basic from '@/constants/basic'
import './MainLayout.css'
import '../components/menu/Menu'
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons'
import {useSelector} from 'react-redux'
import ContentMain from "@/pages/content/ContentMain";
import VerticalBar from "@/pages/chart/Chart";

const {Header, Content, Sider} = Layout

// ***********************WEBSOCKET****************************************
const token = localStorage.getItem('token')
// if (token) {
//   const websocket = new WebSocket(`wss://websocket.muno.uz/ws?Authorization=${token}`)
//   websocket.onopen = () => {
//     console.log('Muno socket connecting.....')
//   }
//   websocket.onmessage = (e) => {
//     console.log('WebSocket message received: ', e)
//     notification.warning({
//       message: 'WebSocket Received'
//     })
//   }
// }
// ***********************WEBSOCKET****************************************


export default function MainLayout({children}) {
    const [collapsed, setCollapsed] = useState(false)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }
    return (
        <div className={`App `}>
            <Layout>
                <Header>
                    <img src={basic.LOGO}/>
                </Header>
                <Layout>
                    <Sider
                        collapsed={collapsed}
                        onCollapse={() => setCollapsed(!collapsed)}
                    >
                        <div
                            style={{
                                display: 'flex',
                                height: '90vh',
                                flexDirection:'column',
                                justifyContent:'space-between'
                            }}
                        >
                            <MainMenu/>
                            <Button block style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '50px !important',
                            }} onClick={toggleCollapsed} >
                                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                            </Button>
                        </div>
                    </Sider>
                    <Content style={{ margin: '0 16px' }} className="mainBox">{children}</Content>
                </Layout>
            </Layout>
        </div>
    )
}
