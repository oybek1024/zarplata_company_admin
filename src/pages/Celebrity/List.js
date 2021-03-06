import React, { useState } from 'react'
import ContentMain from '../content/ContentMain'
import { Button, Card, Table } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { isLoadingOverlay } from '@/redux/actions'
import axios_init from '@/utils/axios_init'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import axios from 'axios'

export default function Contact() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const history = useHistory()
  const [items, setItems] = useState([])
  const [itemUser, setItemUser] = useState([])
  const routes = [
    {
      name: t('celebrity'),
      route: '/celebrity',
      link: false,
    },
  ]
  const columns = [
    {
      title: t('first.name'),
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: t('last.name'),
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: t('country.code'),
      dataIndex: 'country_code',
      key: 'country_code',
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
    {
      title: t('action'),
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              editItem(text, record)
            }}
            type='default'
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => {
              handleDelete(text.id)
            }}
            type='default'
            icon={<DeleteOutlined />}
            style={{ marginLeft: '2px', color: 'red' }}
          />
        </>
      ),
    },
  ]
  const getData = function () {
    // dispatch(isLoadingOverlay(true))
    axios_init
      .get('/celebrity')
      .then((res) => {
        console.log(res)
        setItems(res.celebrities)
      })
      .finally(() => {
        // dispatch(isLoadingOverlay(false))
      })
  }

  const handleDelete = (id) => {
    axios_init
      .remove(`/celebrity/${id}`)
      .then((res) => {
        getData()
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const editItem = function (text, record) {
    console.log('Text:', text)
    console.log('Record:', record)
    history.push(`/celebrity/edit?id=${text.id}`)
  }
  React.useEffect(() => {
    getData()
  }, [])

  const ExtraButton = function () {
    return (
      <Button
        onClick={() => {
          history.push('/celebrity/create')
        }}
        type='primary'
        icon={<PlusOutlined />}
      >
        {t('create')}
      </Button>
    )
  }

  return (
    <div>
      <ContentMain routes={routes} />
      <Card title={t('celebrity')} extra={<ExtraButton />}>
        <Table
          columns={columns}
          dataSource={items}
          rowKey={(record) => record.id}
          scroll={{ x: 100 }}
        />
      </Card>
    </div>
  )
}
