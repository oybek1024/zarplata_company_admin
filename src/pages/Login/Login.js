import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
// import axios_init from "../../utils/axios_init";
import './login.css'
import axios_init from "../../utils/axios_init";


function Login(props) {
    const onFinish = (values) => {
        axios_init.post('/authenticate', values).then(res => console.log(res))
        console.log(values)
    }
    return (
        <div className='login'>
            <div className='logo_content'>
                <img className='logo_image' alt={'Logo'}
                     src={'https://www.designbust.com/download/625/png/instagram_logo_transparent512.png'}/>
                <h1>Instagram</h1>
            </div>
            <div className='login_content'>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    {/*<Form.Item>*/}
                    {/*    <Form.Item name="remember" valuePropName="checked" noStyle>*/}
                    {/*        <Checkbox>Remember me</Checkbox>*/}
                    {/*    </Form.Item>*/}

                    {/*    <a className="login-form-forgot" href="">*/}
                    {/*        Forgot password*/}
                    {/*    </a>*/}
                    {/*</Form.Item>*/}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        {/*Or <a href="">register now!</a>*/}
                    </Form.Item>
                </Form>
                <p>All Rights Reserved. &copy; Udevs 2021</p>
            </div>
        </div>
    )
}
export default Login
