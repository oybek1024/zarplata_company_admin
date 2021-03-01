import React from 'react'
import BreadCrumbTemplete from "../../components/breadcrumb/BreadCrumbTemplete";
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { DollarCircleOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import {Button, Card, Form, Input, Row, Col, message, Upload, Progress, notification} from "antd";
import { useHistory } from 'react-router-dom'
import './style.less'
// import {isLoadingOverlay} from "@/redux/actions";
import axios_init from "@/utils/axios_init";
import axios from "axios";
// import { useDispatch } from 'react-redux'

const routes = [
    {
        name: 'Home',
        route: '/',
        link: true
    },
    {
        name: 'Celebrity',
        route: '/celebrity',
        link: true
    },
    {
        name: 'Celebrity Create',
        route: '/celebrity/create',
        link: false
    }
]

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

export default function CelebrityCreate() {
    // const history = useHistory()
    const [phone, setPhone]  = React.useState(null)
    const [image, setImage]  = React.useState(null)
    const [video, setVideo]  = React.useState(null)
    const [loading, setLoading]  = React.useState(false)
    const [imageUrl, setimageUrl]  = React.useState(null)
    const [progress, setProgress] = React.useState(0)
    const [video_progress, set_video_progress] = React.useState(0)
    const history = useHistory()
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    const uploadImage = function (value) {
        const image = new FormData
        image.append('file', value.file)
        axios.post(`${process.env.REACT_APP_BASE_URL}/image-upload`, image, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: e => {
                console.log(e)
                setProgress(Math.floor((e.loaded * 100) / e.total))
            }
        }).then(res => {
            console.log(res)
            setImage(res.data.filename)
            // getBase64(value.file, image => {
            //     console.log(image)
            // })
        })
        console.log(value)
    }
    const uploadVideo = function (value) {
        const image = new FormData
        image.append('file', value.file)
        axios.post(`${process.env.REACT_APP_BASE_URL}/image-upload`, image, {
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: e => {
                console.log(e)
                set_video_progress(Math.floor((e.loaded * 100) / e.total))
            }
        }).then(res => {
            console.log(res)
            setVideo(res.data.filename)
            // getBase64(value.file, image => {
            //     console.log(image)
            // })
        })
        console.log(value)
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
            <Card title="Celebrity create">
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
                                label='First Name'
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input
                                    size="medium"
                                    placeholder='First Name'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='last_name'
                                label='Last Name'
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input
                                    size="medium"
                                    placeholder='Last Name'
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                style={{ margin: '10px 10px' }}
                                name='phone_number'
                                label='Phone Number'
                                hasFeedback={phone && isValidPhoneNumber(phone) ? true : false}
                                validateStatus="success"
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <PhoneInput
                                    className="ant-input"
                                    placeholder="Phone"
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
                                label='Email'
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: 'Please input your Username!' }, { type: 'email', message: 'Syntax Error Email' }]}
                            >
                                <Input size="medium" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                style={{ margin: '10px 10px' }}
                                name='username'
                                label='Username'
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input size="medium"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='password'
                                label='Password'
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input.Password type='password' size="medium" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='service_fee'
                                label='Price'
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input type='number' size="medium" prefix={<DollarCircleOutlined className='site-form-item-icon' />} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='bio'
                                label='Biography'
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Input size="medium" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='image_url'
                                label='Image Upload'
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Upload
                                    listType="picture-card"
                                    className="avatar-uploader customUploader"
                                    showUploadList={false}
                                    customRequest={uploadImage}
                                    beforeUpload={beforeUpload}
                                >
                                    <Progress
                                        strokeColor={{
                                            from: '#108ee9',
                                            to: '#87d068',
                                        }}
                                        percent={progress}
                                        status="active"
                                    />
                                    {/*{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}*/}
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name='video_url'
                                label='Video Upload'
                                style={{ margin: '10px 10px' }}
                                rules={[{ required: true, message: 'Please input your Username!' }]}
                            >
                                <Upload
                                    listType="picture-card"
                                    className="avatar-uploader customUploader"
                                    showUploadList={false}
                                    customRequest={uploadVideo}
                                    beforeUpload={beforeUploadVideo}
                                >
                                    <Progress
                                        strokeColor={{
                                            from: '#108ee9',
                                            to: '#87d068',
                                        }}
                                        percent={video_progress}
                                        status="active"
                                    />
                                    {/*{imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}*/}
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button
                            style={{ marginLeft: '10px' }}
                            type='primary'
                            htmlType='submit'
                            className='login-form-button'
                            size='large'
                        >
                            Save
                        </Button>
                        {/*Or <a href="">register now!</a>*/}
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
