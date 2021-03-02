import { Breadcrumb, Card } from "antd";
import React from "react";
import { ArrowLeftOutlined } from '@ant-design/icons'
// import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import './style.css'
// import MenuKey from "../../utils/menuKey";
// import {setMenuKey} from "../../redux/actions";
const BreadCrumbTemplete = function(props) {
    const routes = props.routes
    // const dispatch = useDispatch()
    const history = useHistory()

    return (
        <div className="breadCrumb">
            <Card style={{ marginBottom: '0px' }}>
                <div style={{ display: 'flex' }}>
                    <ArrowLeftOutlined style={{ fontSize: '24px', marginRight: '24px' }} onClick={ () => { history.go(-1) } }/>
                    <Breadcrumb>
                        {
                            routes.map(e =>
                                <Breadcrumb.Item key={e.name}>
                                    { e.link ? ( <Link to={e.route} style={{ fontSize: '16px' }} replace>{ e.name }</Link> ) : <span style={{ fontSize: '16px' }}>{ e.name }</span> }
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
