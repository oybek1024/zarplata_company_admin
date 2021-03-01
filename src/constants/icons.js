import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined
} from '@ant-design/icons'

function IconFinder (icon) {
    switch (icon) {
        case 'DesktopOutlined': return ( <DesktopOutlined /> )
        case 'PieChartOutlined': return ( <PieChartOutlined /> )
        case 'UserOutlined': return ( <UserOutlined /> )
        default: break
    }
}
export default IconFinder
