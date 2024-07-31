import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/login";
import RouteGuard from "./routeGuard";
import { TabBar } from "antd-mobile";
import { tabs } from "./tabs"
import matchDetail from "../pages/match/matchDetail";    // 匹配详情页面

import { Helmet } from "react-helmet";
import "./router.less"


const AppRouter = () => {
    const pages = {
        '/match/matchDetail': matchDetail,
    }

    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;

    const setRouteActive = (value) => {
        navigate(value);
    };

    const currentTab = tabs.find(tab => tab.key === pathname);
    
    const isTabActive = tabs.some(tab => tab.key === pathname);

    return (
        <div>
            <Helmet>
                <title>{currentTab ? currentTab.title : 'title'}</title>
            </Helmet>
            <Routes>
                <Route path='/pages/login' element={<Login />} />
                {Object.entries(pages).map(([path, Component]) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <RouteGuard>
                                <Component />
                            </RouteGuard>
                        }
                    />
                ))}
                {tabs.map((tab) => (
                    <Route
                        key={tab.key}
                        path={tab.key}
                        element={
                            <RouteGuard>
                                {tab.element}
                            </RouteGuard>
                        }
                    />
                ))}
            </Routes>
            {/* 仅当当前路径是tabs数组中的页面且不是登录页面时，显示TabBar */}
            {(isTabActive && pathname !== '/pages/login') && (
                <TabBar className="tabBar" activeKey={pathname} onChange={setRouteActive}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            )}
        </div>
    );

}

export default AppRouter;
