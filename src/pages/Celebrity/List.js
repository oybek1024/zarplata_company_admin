import React from 'react'
import BreadCrumbTemplete from "../../components/breadcrumb/BreadCrumbTemplete";
import {Button, Card, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";

export default function Contact() {
    const routes = [
        {
            name: 'Home',
            route: '/',
            link: true
        },
        {
            name: 'Celebrity',
            route: '/celebrity',
            link: false
        }
    ]
    const columns = [
        {
            title: 'First name',
            dataIndex: 'first_name',
            key: 'first_name',
            render: text => <strong>{text}</strong>,
        },
        {
            title: 'Last name',
            dataIndex: 'last_name',
            key: 'last_name'
        },
        {
            title: 'Phone number',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Bio',
            dataIndex: 'bio',
            key: 'bio',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <a>Delete</a>
            )
        }
    ]
    const items = [
        {
            id: 'xxsadw1',
            first_name: 'Oybek',
            last_name: 'Mukhiddinov',
            phone_number: '+998996062053',
            email: 'mukhiddinov.oybek1024@gmail.com',
            bio: 'Front End and Backend'
        }
    ]
    const ExtraButton = function () {
        return (
            <Button type="primary" icon={<PlusOutlined />}>
                Create
            </Button>
        )
    }

    return (
        <div>
            <BreadCrumbTemplete routes={routes}/>
            <Card title="Celebrity" extra={<ExtraButton/>}>
                <Table columns={columns} dataSource={items} rowKey={ (record) => record.id } scroll={{ x: 100 }}/>
            </Card>
        </div>
    )
}
