import React from 'react'
import BreadCrumbTemplete from "../../components/breadcrumb/BreadCrumbTemplete";
import {Button, Card, Table, Tag } from "antd";
import {PlusOutlined} from "@ant-design/icons";
import { useHistory } from 'react-router-dom'
import {isLoadingOverlay} from "@/redux/actions";
import axios_init from "@/utils/axios_init";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux'
export default function Contact() {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const history = useHistory()
    const [items, setItems] = React.useState([])
    const routes = [
        {
            name: 'featured',
            route: '/featured',
            link: false
        }
    ]
    const columns = [
        {
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
            render: text => {
                return <p>{ text.uz } - {text.ru} - {text.en}</p>
            },
        },
        {
            title: t('description'),
            dataIndex: 'description',
            key: 'description',
            render: text => {
                return <p>{ text.uz } - {text.ru} - {text.en}</p>
            },
        },
        {
            title: t('order_no'),
            dataIndex: 'order_no',
            key: 'order_no'
        },
        {
            title: t('status'),
            dataIndex: 'is_active',
            key: 'is_active',
            render: text => {
                if (text) return <Tag color="#108ee9">{t('active')}</Tag>
                else return <Tag color="#f50">{ t('inactive')} }</Tag>
            },
        }
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (text, record) => (
        //         <a>Delete</a>
        //     )
        // }
    ]

    const getData = function () {
        dispatch(isLoadingOverlay(true))
        axios_init.get('/featured').then(res => {
            console.log(res)
            setItems(res.features)
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
                history.push('/featured/create')
            }} type="primary" icon={<PlusOutlined />}>
                Create
            </Button>
        )
    }

    return (
        <div>
            <BreadCrumbTemplete routes={routes}/>
            <Card title={t('featured')} extra={<ExtraButton/>}>
                <Table columns={columns} dataSource={items} rowKey={ (record) => record.id } scroll={{ x: 100 }}/>
            </Card>
        </div>
    )
}
