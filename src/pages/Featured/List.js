import React from 'react'
import BreadCrumbTemplete from "../../components/breadcrumb/BreadCrumbTemplete";
import {Button, Card, Table, Tag, Modal, Select, message } from "antd";
import {PlusOutlined, PullRequestOutlined} from "@ant-design/icons";
import { useHistory } from 'react-router-dom'
import {isLoadingOverlay} from "@/redux/actions";
import axios_init from "@/utils/axios_init";
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux'
export default function Contact() {
    const dispatch = useDispatch()
    const { Option } = Select
    const { t } = useTranslation()
    const history = useHistory()
    const [items, setItems] = React.useState([])
    const [celebrity, setCelebrity] = React.useState([])
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
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button onClick={ () => { openModal(text.id) }} type="primary" icon={ <PullRequestOutlined /> } />
            )
        }
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
    const getCelebrity = function () {
        axios_init.get('/celebrity', {
            page: 1,
            limit: 1000
        }).then(res => {
            console.log(res)
            setCelebrity(res.celebrities)
        })
    }
    React.useEffect(() => {
        getData()
        getCelebrity()
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
    const [visible, setVisible] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [featuredId, setFeaturedId] = React.useState(null)
    const [selectedCelebritys, setSelectedCelebritys] = React.useState([])
    const hideModal = () => {
        setVisible(false)
    }
    const selectCelebrity = (e) => {
        setSelectedCelebritys([...e])
    }
    const openModal = (id) => {
        setFeaturedId(id)
        // setLoadButton(true)
        axios_init.get(`/featured-celebrities/${id}`).then(res => {
            if (!res.celebrities) setSelectedCelebritys([])
            else setSelectedCelebritys(res.celebrities.map(e => e.id))
            setVisible(true)
        })
    }
    const assignCelebrity = function () {
        if (selectedCelebritys.length !== 0) {
            setLoading(true)
            axios_init.post(`/featured/${featuredId}/add-celebrity`, {
                celebrity_ids: selectedCelebritys
            }).then(res => {
                message.success('Celebrity assigned successfully')
                hideModal()
                setLoading(false)
            })
        } else {
            hideModal()
        }
        console.log(selectedCelebritys)
        console.log('submit')
    }
    const CelebrityAssign = function () {
        return (
            <Modal
                title={ t('add.celebrity') }
                visible={visible}
                maskClosable={false}
                onCancel={hideModal}
                footer={[
                    <Button key="back" onClick={ () => { hideModal() } }>
                        { t('cancel') }
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={ () => { assignCelebrity() } }>
                        { t('save') }
                    </Button>
                ]}
            >
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={ selectCelebrity }
                    value={selectedCelebritys}
                >
                    {
                        [...celebrity].map(e => <Option key={e.id} value={e.id}>{ e.first_name + ' ' + e.last_name }</Option> )
                    }
                </Select>
            </Modal>
        )
    }


    return (
        <div>
            <BreadCrumbTemplete routes={routes}/>
            <Card title={t('featured')} extra={<ExtraButton/>}>
                <CelebrityAssign />
                <Table columns={columns} dataSource={items} rowKey={ (record) => record.id } scroll={{ x: 100 }}/>
            </Card>
        </div>
    )
}
