import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "../pages/login";
import RouteGuard from "./routeGuard";
import { TabBar } from "antd-mobile";
import { tabs } from "./tabs"

import { Helmet } from "react-helmet";
import "./router.less"

const AppRouter = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;

    const setRouteActive = (value) => {
        navigate(value);
    };

    const currentTab = tabs.find(tab => tab.key === pathname);
    return (
        <div>
            <Helmet>
                <title>{currentTab ? currentTab.title : 'title'}</title>
            </Helmet>
            <Routes>
                <Route path='/pages/login' element={<Login />} />
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
            {pathname !== '/pages/login' && (
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
