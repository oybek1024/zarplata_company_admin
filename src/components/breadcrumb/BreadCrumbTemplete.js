import { Breadcrumb, Card } from "antd";
import React from "react";
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import './style.css'
import MenuKey from "../../utils/menuKey";
import {setMenuKey} from "../../services/actions";
const BreadCrumbTemplete = function(props) {
    const routes = props.routes
    const dispatch = useDispatch()
    return (
        <div className="breadCrumb">
            <Card style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex' }}>
                    <ArrowLeftOutlined style={{ fontSize: '24px', marginRight: '24px' }}/>
                    <Breadcrumb>
                        {
                            routes.map(e =>
                                <Breadcrumb.Item key={e.name} onClick={() => { dispatch(setMenuKey(MenuKey(e.route))) }}>
                                    { e.link ? ( <Link to={e.route} replace>{ e.name }</Link> ) : e.name }
                                </Breadcrumb.Item>
                            )
                        }
                    </Breadcrumb>
                </div>
            </Card>
        </div>
    )
}

export default BreadCrumbTemplete
