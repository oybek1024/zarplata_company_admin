import basic from "@/constants/basic";
import IconFinder from "@/constants/icons";
import {Menu} from 'antd'
import routes from "@/constants/router";
import {useSelector} from 'react-redux'
import guard from "@/utils/permissions";
import './menu.less'
import { Link, Redirect } from "react-router-dom";
import React from "react";
const { SubMenu } = Menu
function MainMenu(props) {
    const menu_key = useSelector((state) => state.basics.menu_key)
    console.log(menu_key)

    function menuGenerator (routes) {
        if (routes) {
            return routes.filter(e => guard(e.meta.permission) && !e.hidden).map((e, i) => {
                if (e.children && e.children.length) {
                    return (
                        <SubMenu key={e.meta.title + i} icon={IconFinder(e.meta.icon)} title={e.meta.title}>
                            {
                                menuGenerator(e.children)
                            }
                        </SubMenu>
                    )
                } else {
                    return (
                        <Menu.Item key={e.meta.title + i} icon={IconFinder(e.meta.icon)}>
                            <Link to={e.path}>{e.name}</Link>
                        </Menu.Item>
                    )
                }
            })
        }
    }

    return (
        <Menu theme={basic.MENU_THEME} selectedKeys={menu_key} mode='inline'>
            { menuGenerator(routes) }
        </Menu>
    )
}

export default MainMenu
