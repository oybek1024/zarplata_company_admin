import React from 'react'
import BreadCrumbTemplete from "../../components/breadcrumb/BreadCrumbTemplete";
import 'react-phone-number-input/style.css'
import { PictureOutlined } from '@ant-design/icons'
import {Button, Card, Form, Input, Row, Col, message, Upload, Progress, notification, Tabs} from "antd";
import { useHistory } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import './style.less'
// import {isLoadingOverlay} from "@/redux/actions";
import axios_init from "@/utils/axios_init";
import axios from "axios";
// import { useDispatch } from 'react-redux'

const routes = [
    {
        name: 'featured',
        route: '/featured',
        link: true
    },
    {
        name: 'create.featured',
        route: '/featured/create',
        link: false
    }
]
const { TabPane } = Tabs

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
}

export default function CelebrityCreate() {
    // const history = useHistory()
    const { t } = useTranslation()
    const [image, setImage]  = React.useState(null)
    const [loading, setLoading]  = React.useState(false)
    const [imageUrl, setimageUrl]  = React.useState(null)
    const [progress, setProgress] = React.useState(0)
    const history = useHistory()

    const uploadButton = function (type) {
        if (type === 'image') {
            return (
                <div>
                    <PictureOutlined style={{ fontSize: '50px', color: '#D75246' }}/>
                    <div style={{ marginTop: 8 }}>{ t('image.upload') }</div>
                </div>
            )
        }
    }
    const uploadImage = function (value) {
        setLoading(true)
        const image = new FormData
        image.append('file', value.file)
        axios.post(`${process.env.REACT_APP_BASE_URL}/image-upload`, image, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: e => {
                setProgress(Math.floor((e.loaded * 100) / e.total))
            }
        }).then(res => {
            setImage(res.data.filename)
            getBase64(value.file, image => {
                setimageUrl(image)
            })
        }).finally(() => {
            setLoading(false)
        }).catch(err => {
            if (err.status === 401) {
                localStorage.removeItem('token')
                history.push('/login')
            }
        })
    }

    const onFinish = (values) => {
        let _data = {}
        _data.image = image
        _data.name = {
            uz: values.name_uz,
            ru: values.name_ru ? values.name_ru : values.name_uz,
            en: values.name_en ? values.name_en : values.name_uz,
        }
        _data.description = {
            uz: values.description_uz,
            ru: values.description_ru ? values.description_ru : values.description_uz,
            en: values.description_en ? values.description_en : values.description_uz,
        }
        _data.order_no = parseInt(values.order_no)
        console.log(_data)
        if (_data.image) {
            // console.log(values)
            axios_init.post('/featured', _data).then(res => {
                notification.success('You request received')
                history.push('/featured')
            })
        }
    }
    return (
        <div>
            <BreadCrumbTemplete routes={routes}/>
            <Card title={t('create.featured')}>
                <Form
                    name='normal_login'
                    layout="vertical"
                    className='login-form'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Row>
                        <Col span={24}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={t('uzbek')} key="1" forceRender>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                style={{ margin: '10px 10px' }}
                                                name='name_uz'
                                                label={t('name')}
                                                rules={[{ required: true, message: t('required.field') }]}
                                            >
                                                <Input
                                                    size="medium"
                                                    placeholder={t('name')}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                style={{ margin: '10px 10px' }}
                                                name='description_uz'
                                                label={t('description')}
                                                rules={[{ required: true, message: t('required.field') }]}
                                            >
                                                <Input
                                                    size="medium"
                                                    placeholder={t('description')}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab={t('russian')} key="2" forceRender>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                style={{ margin: '10px 10px' }}
                                                name='name_ru'
                                                label={t('name')}
                                            >
                                                <Input
                                                    size="medium"
                                                    placeholder={t('name')}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                style={{ margin: '10px 10px' }}
                                                name='description_ru'
                                                label={t('description')}
                                            >
                                                <Input
                                                    size="medium"
                                                    placeholder={t('description')}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab={t('english')} key="3" forceRender>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item
                                                style={{ margin: '10px 10px' }}
                                                name='name_en'
                                                label={t('name')}
                                            >
                                                <Input
                                                    size="medium"
                                                    placeholder={t('name')}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                style={{ margin: '10px 10px' }}
                                                name='description_en'
                                                label={t('description')}
                                            >
                                                <Input
                                                    size="medium"
                                                    placeholder={t('description')}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </Tabs>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='order_no'
                                label={ t('order.no') }
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: t('required.field') }]}
                            >
                                <Input type='number' size="medium" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='image_url'
                                label={ t('image.upload') }
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: t('required.field') }]}
                            >
                                <Upload
                                    listType="picture-card"
                                    className="avatar-uploader customUploader"
                                    showUploadList={false}
                                    customRequest={uploadImage}
                                    beforeUpload={beforeUpload}
                                >
                                    {
                                        loading ? (
                                            <Progress
                                                strokeColor={{
                                                    from: '#108ee9',
                                                    to: '#87d068',
                                                }}
                                                percent={progress}
                                                status="active"
                                            />
                                        ) : (imageUrl ? <img src={imageUrl} alt="avatar" className="upload_image" style={{ width: '100%' }} /> : uploadButton('image'))
                                    }
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <div style={{ marginLeft: '10px', position: 'absolute', right: '0' }}>
                            <Button
                                type='default'
                                className='login-form-button'
                                size='large'
                                onClick={() => { history.push('/category') }}
                            >
                                { t('cancel') }
                            </Button>
                            <Button
                                style={{ marginLeft: '10px'}}
                                type='primary'
                                htmlType='submit'
                                className='login-form-button'
                                size='large'
                            >
                                { t('save') }
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
