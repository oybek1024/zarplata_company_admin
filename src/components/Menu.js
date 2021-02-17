import basic from "../constants/basic";
import IconFinder from "../constants/icons";
import {Menu} from 'antd'
import routes from "../constants/router";
import {useSelector} from 'react-redux'
import guard from "../utils/permissions";
// const { SubMenu } = Menu
import {setMenuKey} from "../services/actions";
import {Link, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import MenuKey from "../utils/menuKey";

function MainMenu(props) {
    const dispatch = useDispatch()
    const location = useLocation()
    const path = location.pathname
    function menuKey() {
        dispatch(setMenuKey(MenuKey(path)))
    }
    useEffect(() => {
        menuKey()
    }, [])
    const menu_key = useSelector((state) => state.basics.menu_key)
    console.log(menu_key)
    return (
        <Menu theme={basic.MENU_THEME} selectedKeys={menu_key} mode='inline'>
            {routes
                .filter(e => guard(e.meta.title) && e.meta.isAuthorited && !e.hidden)
                .map((e, i) => (
                    <Menu.Item key={i + 1} icon={IconFinder(e.meta.icon)}>
                        <Link to={e.path} onClick={() => { dispatch(setMenuKey(MenuKey(e.path))) }}>{e.name}</Link>
                    </Menu.Item>
                ))
            }
        </Menu>
    )
}

export default MainMenu
