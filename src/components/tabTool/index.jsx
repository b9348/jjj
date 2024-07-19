import './index.less'
// 引入tabbar组件
import { TabBar } from 'antd-mobile'
// 引入路由组件
import {
    //版本不同API会有差别
    useNavigate,
    useLocation,
} from 'react-router-dom'
// 引入图标组件
import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
 
// TabBar 配置
const tabs = [
    {
        url: '/#/pages/home/index',
        title: '首页',
        icon: <AppOutline />,
    },
    {
        url: '/#/pages/result/index',
        title: '结果',
        icon: <UnorderedListOutline />,
    },
    {
        url: '/#/pages/match/index',
        title: '列表',
        icon: <UnorderedListOutline />,
    },
    {
        url: '/#/pages/detail/index',
        title: '消息',
        icon: <MessageOutline />,
    },
    {
        url: '/#/pages/mine/index',
        title: '我的',
        icon: <UserOutline />,
    }
]
 
const Bottom = () => {
    const navigate= useNavigate()
    const { pathname } = useLocation()
    return (
        <TabBar activeKey={pathname} onChange={value => navigate(value)}>
            {tabs.map(item => (
                <TabBar.Item key={item.url} icon={item.icon} title={item.title} />
            ))}
        </TabBar>
    )
}
 
export default function Tabbar() {
    return (
        <div className='tab-bar'>
            <Bottom />
        </div>
    )
}