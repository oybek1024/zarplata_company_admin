import basic from "@/constants/basic";
import IconFinder from "@/constants/icons";
import {Menu} from 'antd'
import routes from "@/constants/router";
import {useSelector} from 'react-redux'
import guard from "@/utils/permissions";
import './menu.less'
import { Link } from "react-router-dom";
import React from "react";

function MainMenu(props) {
    const menu_key = useSelector((state) => state.basics.menu_key)
    console.log(menu_key)
    return (
        <Menu theme={basic.MENU_THEME} selectedKeys={menu_key} mode='inline'>
            {routes
                .filter(e => guard(e.meta.title) && e.meta.isAuthorited && !e.hidden)
                .map((e, i) => (
                    <Menu.Item key={i + 1} icon={IconFinder(e.meta.icon)}>
                        <Link to={e.path}>{e.name}</Link>
                    </Menu.Item>
                ))
            }
        </Menu>
    )
}

export default MainMenu
