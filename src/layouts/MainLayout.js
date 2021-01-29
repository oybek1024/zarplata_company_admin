import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import RightContent from "../components/RightContent";
import MenuHeader from "../components/MenuHeader";
import basic from "../constants/basic";
import '../assets/styles/layout.css'
import {
  DesktopOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Header, Content, Sider } = Layout
const { SubMenu } = Menu

export default function MainLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div className='App'>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          className='slider'
          collapsible
          theme={basic.MENU_THEME}
          width={250}
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
        >
          <MenuHeader collapsed={collapsed}/>
          {/*<div className='logo'>*/}
          {/*  <Avatar size={36} className='avatar' icon={<UserOutlined />} />*/}
          {/*  { !collapsed ? <h1 className='title'>{ basic.TITLE }</h1> : '' }*/}
          {/*</div>*/}
          <Menu theme={basic.MENU_THEME} defaultSelectedKeys={['1']} mode='inline'>
            <Menu.Item key='1' icon={<PieChartOutlined />}>
              <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item key='2' icon={<DesktopOutlined />}>
              <Link to='/contact'>Contact</Link>
            </Menu.Item>
            <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
              <Menu.Item key='3'>Tom</Menu.Item>
              <Menu.Item key='4'>Bill</Menu.Item>
              <Menu.Item key='5'>Alex</Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
              <Menu.Item key='6'>Team 1</Menu.Item>
              <Menu.Item key='8'>Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key='9' icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='site-layout'>
          <Header className='site-layout-background header' style={{ padding: 0 }} >
            { collapsed ? <MenuUnfoldOutlined onClick={() => { setCollapsed(!collapsed) }} className='menuIcon' /> : <MenuFoldOutlined onClick={() => { setCollapsed(!collapsed) }} className='menuIcon' /> }
            <RightContent/>
          </Header>
          <Content style={{ margin: '0 16px' }}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  )
}
