import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
    AppstoreOutlined
} from '@ant-design/icons'

function IconFinder (icon) {
    switch (icon) {
        case 'DesktopOutlined': return ( <DesktopOutlined /> )
        case 'PieChartOutlined': return ( <PieChartOutlined /> )
        case 'UserOutlined': return ( <UserOutlined /> )
        case 'AppstoreOutlined': return ( <AppstoreOutlined /> )
        default: break
    }
}
export default IconFinder
