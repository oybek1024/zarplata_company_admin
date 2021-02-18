// import {Avatar} from "antd";
// import {UserOutlined} from "@ant-design/icons";
import basic from "../constants/basic";
import React from "react";

function MenuHeader (props) {
    return (
        <div className='logo'>
            <div>
                <img src={basic.LOGO} style={{ width: '60%' }}/>
            </div>
            {/*{ !props.collapsed ? <h1 className='title'>{ basic.TITLE }</h1> : '' }*/}
            {/*<Avatar size={36} src={ basic.LOGO } className='avatar' icon={<UserOutlined />} />*/}
            {/*{ !props.collapsed ? <h1 className='title'>{ basic.TITLE }</h1> : '' }*/}
        </div>
    )
}
export default MenuHeader
