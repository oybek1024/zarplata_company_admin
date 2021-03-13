import React from 'react'
import BreadCrumbTemplete from "../../components/breadcrumb/BreadCrumbTemplete";
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { DollarCircleOutlined, CheckCircleOutlined, PictureOutlined, VideoCameraOutlined } from '@ant-design/icons'
import {Button, Card, Form, Input, Row, Col, message, Upload, Progress, notification} from "antd";
import { useHistory } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import './style.less'
// import {isLoadingOverlay} from "@/redux/actions";
import axios_init from "@/utils/axios_init";
import axios from "axios";
// import { useDispatch } from 'react-redux'

const routes = [
    {
        name: 'celebrity',
        route: '/celebrity',
        link: true
    },
    {
        name: 'celebrity.create',
        route: '/celebrity/create',
        link: false
    }
]

export default function CelebrityCreate() {
    // const history = useHistory()
    const [phone, setPhone]  = React.useState(null)
    const [image, setImage]  = React.useState(null)
    const [video, setVideo]  = React.useState(null)
    const [loading, setLoading]  = React.useState(false)
    const [video_loading, setVideoLoading]  = React.useState(false)
    const [imageUrl, setimageUrl]  = React.useState(null)
    const [videoUrl, setVideoUrl]  = React.useState(null)
    const [progress, setProgress] = React.useState(0)
    const [video_progress, set_video_progress] = React.useState(0)
    const history = useHistory()
    const { t } = useTranslation()
    const uploadButton = function (type) {
        if (type === 'image') {
            return (
                <div>
                    <PictureOutlined style={{ fontSize: '50px', color: '#D75246' }}/>
                    <div style={{ marginTop: 8 }}>{ t('image.upload') }</div>
                </div>
            )
        } else if (type === 'video') {
            return (
                <div>
                    <VideoCameraOutlined style={{ fontSize: '50px', color: '#D75246' }}/>
                    <div style={{ marginTop: 8 }}>{ t('video.upload') }</div>
                </div>
            )
        } else if (type === 'success') {
            return (
                <div>
                    <CheckCircleOutlined style={{ fontSize: '50px', color: '#14c909' }}/>
                    <div style={{ marginTop: 8 }}>{ t('video.upload.successfully') }</div>
                </div>
            )
        }
    }
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
    function beforeUploadVideo(file) {
        const isJpgOrPng = file.type === 'video/mp4';
        if (!isJpgOrPng) {
            message.error('You can only upload Video file!');
        }
        return isJpgOrPng;
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
    const uploadVideo = function (value) {
        const image = new FormData
        image.append('file', value.file)
        setVideoLoading(true)
        axios.post(`${process.env.REACT_APP_BASE_URL}/image-upload`, image, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: e => {
                set_video_progress(Math.floor((e.loaded * 100) / e.total))
            }
        }).then(res => {
            setVideo(res.data.filename)
            setVideoUrl(true)
        }).finally(() => {
            setVideoLoading(false)
        }).catch(err => {
            if (err.status === 401) {
                localStorage.removeItem('token')
                history.push('/login')
            }
        })
    }

    const onFinish = (values) => {
        let _data = values
        _data.profile_photo = image
        _data.demo_video = video
        _data.country_code = formatPhoneNumberIntl(phone).split(' ')[0].slice(1)
        _data.service_fee = parseInt(values.service_fee)
        _data.phone_number = formatPhoneNumberIntl(phone).split(' ').slice(1).join('')
        delete _data.image_url
        delete _data.video_url
        console.log(_data)
        if (_data.demo_video && _data.profile_photo) {
            axios_init.post('/celebrity', _data).then(res => {
                notification.success('You request received')
                history.push('/celebrity')
            })
        }
    }
    return (
        <div>
            <BreadCrumbTemplete routes={routes}/>
            <Card title={t('celebrity.create')}>
                <Form
                    name='normal_login'
                    layout="vertical"
                    className='login-form'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                style={{ margin: '10px 10px' }}
                                name='first_name'
                                label={ t('first.name') }
                                rules={[{ required: true, message: t('required.field') }]}
                            >
                                <Input
                                    size="medium"
                                    placeholder={ t('first.name') }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='last_name'
                                label={ t('last.name') }
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message:  t('required.field') }]}
                            >
                                <Input
                                    size="medium"
                                    placeholder={ t('last.name') }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                style={{ margin: '10px 10px' }}
                                name='phone_number'
                                label={ t('phone.number') }
                                hasFeedback={phone && isValidPhoneNumber(phone) ? true : false}
                                validateStatus="success"
                                rules={[{ required: true, message: t('required.field') }]}
                            >
                                <PhoneInput
                                    className="ant-input"
                                    placeholder={ t('phone.number') }
                                    defaultCountry="UZ"
                                    international
                                    value={phone}
                                    onChange={setPhone}
                                    error={'Phone number required'}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='email'
                                label={ t('email') }
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: t('required.field') }, { type: 'email', message: 'Syntax Error Email' }]}
                            >
                                <Input size="medium" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                style={{ margin: '10px 10px' }}
                                name='username'
                                label={ t('username') }
                                rules={[{ required: true, message: t('required.field') }]}
                            >
                                <Input size="medium"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='password'
                                label={ t('password') }
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: t('required.field') }]}
                            >
                                <Input.Password type='password' size="medium" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='service_fee'
                                label={ t('price') }
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: t('required.field') }]}
                            >
                                <Input type='number' size="medium" prefix={<DollarCircleOutlined className='site-form-item-icon' />} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='bio'
                                label={ t('bio') }
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: t('required.field') }]}
                            >
                                <Input size="medium" />
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
                        <Col span={12}>
                            <Form.Item
                                name='video_url'
                                label={ t('video.upload') }
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: t('required.field') }]}
                            >
                                <Upload
                                    listType="picture-card"
                                    className="avatar-uploader customUploader"
                                    showUploadList={false}
                                    customRequest={uploadVideo}
                                    beforeUpload={beforeUploadVideo}
                                >
                                    {
                                        video_loading ? (
                                            <Progress
                                                strokeColor={{
                                                    from: '#108ee9',
                                                    to: '#87d068',
                                                }}
                                                percent={video_progress}
                                                status="active"
                                            />
                                        ) : (videoUrl ? uploadButton('success') : uploadButton('video'))
                                    }
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <div style={{ marginLeft: '10px', marginRight: '10px', position: 'absolute', right: '0' }}>
                            <Button
                                type='default'
                                className='login-form-button'
                                size='large'
                                onClick={() => { history.push('/celebrity') }}
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
