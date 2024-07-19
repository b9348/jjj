import Home from "../pages/home"
import Result from "../pages/result"
import Match from "../pages/match"
import Detail from "../pages/detail"
import Mine from "../pages/mine"

import { AppOutline, UserOutline,HistogramOutline,FileOutline ,GlobalOutline} from "antd-mobile-icons"

export const tabs = [
    {
        key: "/",
        title: "首页",
        icon: <AppOutline />,
        element: <Home />,
    },
    {
        key: "/result",
        title: "结果",
        icon: <HistogramOutline />,
        element: <Result />,
    },
    {
        key: "/match",
        title: "匹配",
        icon: <GlobalOutline />,
        element: <Match />,
    },
    {
        key: "/detail",
        title: "详情",
        icon: <FileOutline />,
        element: <Detail />,
    },
    {
        key: "/mine",
        title: "我的",
        icon: <UserOutline />,
        element: <Mine />,
    },
]

