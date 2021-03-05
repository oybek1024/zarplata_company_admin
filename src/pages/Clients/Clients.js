import React from 'react'
import BreadCrumbTemplete from "../../components/breadcrumb/BreadCrumbTemplete";
import {Table, Space, Tag, Card, Button} from 'antd'
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import axios_init from "@/utils/axios_init";
// import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { isLoadingOverlay } from "@/redux/actions";
export default function Contact() {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [items, setItems] = React.useState([])
    const routes = [
        {
            name: 'clients',
            route: '/clients',
            link: false
        }
    ]
    const columns = [
        {
            title: t('first.name'),
            dataIndex: 'first_name',
            key: 'first_name',
            render: text => <strong>{text}</strong>,
        },
        {
            title: t('last.name'),
            dataIndex: 'last_name',
            key: 'last_name'
        },
        {
            title: t('phone.number'),
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: t('email'),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('bio'),
            dataIndex: 'bio',
            key: 'bio',
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <a>Delete</a>
        //     )
        // }
    ];
    const getData = function () {
        dispatch(isLoadingOverlay(true))
        axios_init.get('/client').then(res => {
            setItems(res.clients)
        }).finally(() => {
            dispatch(isLoadingOverlay(false))
        })
    }
    React.useEffect(() => {
        getData()
    }, [])
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
            <Card title={t('clients')}>
                <Table columns={columns} dataSource={items} rowKey={ (record) => record.id } scroll={{ x: 100 }}/>
            </Card>
        </div>
    )
}
