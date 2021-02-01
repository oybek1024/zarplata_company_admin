import basic from "../constants/basic";
import IconFinder from "../constants/icons";
import {Menu} from 'antd'
import routes from "../constants/router";
import guard from "../utils/permissions";
// const { SubMenu } = Menu
import {Link} from "react-router-dom";
import React from "react";

function MainMenu(props) {
    return (
        <Menu theme={basic.MENU_THEME} defaultSelectedKeys={['1']} mode='inline'>
            { routes
                .filter(e => guard(e.meta.title) && e.meta.isAuthorited)
                .map((e, i) => (
                <Menu.Item key={i + 1} icon={IconFinder(e.meta.icon)}>
                    <Link to={e.path}>{e.name}</Link>
                </Menu.Item>
            ) )
            }
        </Menu>
    )
}

export default MainMenu
