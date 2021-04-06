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
        </div>
    )
}
export default MenuHeader
