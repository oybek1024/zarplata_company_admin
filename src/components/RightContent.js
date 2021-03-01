import { Avatar } from 'antd'
import { UserOutlined, LogoutOutlined, BellOutlined } from '@ant-design/icons'
import { Menu, Dropdown, Badge } from 'antd'
import { useHistory } from 'react-router-dom'
import './styles/style.less'
import basic from '../constants/basic'
import { logout } from '../redux/actions'
import { useDispatch } from 'react-redux'

function RightContent() {
  const dispatch = useDispatch()
  const history = useHistory()
  const Logout = function () {
    dispatch(logout())
    localStorage.removeItem('token')
    history.push('/login')
  }
  const menu = (
    <Menu>
      <Menu.Item>
        <UserOutlined /> Profile
      </Menu.Item>
      <Menu.Item
        onClick={() => {
            Logout()

        }}
      >
        <LogoutOutlined /> Log out
      </Menu.Item>
    </Menu>
  )
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Badge style={{ marginRight: '10px', cursor: 'pointer' }} count={5}>
        <BellOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
      </Badge>
      <Dropdown overlay={menu} className='dropdown'>
        <div className='right_content'>
          <Avatar
            size={36}
            className='avatar'
            src={basic.USER_LOGO}
            icon={<UserOutlined />}
          />
          <h1 className='title'>John Doe</h1>
        </div>
      </Dropdown>
    </div>
  )
}

export default RightContent
