import React from 'react'
import BreadCrumbTemplete from "../../components/breadcrumb/BreadCrumbTemplete";
import {Button, Card, Table} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import { useHistory } from 'react-router-dom'
import {isLoadingOverlay} from "@/redux/actions";
import axios_init from "@/utils/axios_init";
import { useDispatch } from 'react-redux'
export default function Contact() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [items, setItems] = React.useState([])
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
            title: 'Country code',
            dataIndex: 'country_code',
            key: 'country_code'
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

    const getData = function () {
        dispatch(isLoadingOverlay(true))
        axios_init.get('/celebrity').then(res => {
            console.log(res)
            setItems(res.celebrities)
        }).finally(() => {
            dispatch(isLoadingOverlay(false))
        })
    }
    React.useEffect(() => {
        getData()
    }, [])


    const ExtraButton = function () {
        return (
            <Button onClick={ () => {
                history.push('/celebrity/create')
            }} type="primary" icon={<PlusOutlined />}>
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
