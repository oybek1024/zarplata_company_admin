import {
    DesktopOutlined,
    PieChartOutlined
} from '@ant-design/icons'

function IconFinder (icon) {
    switch (icon) {
        case 'DesktopOutlined': return <DesktopOutlined />
        case 'PieChartOutlined': return <PieChartOutlined />
        default: break
    }
}
export default IconFinder
