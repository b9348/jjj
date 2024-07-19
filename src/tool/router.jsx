import Home from "../pages/home"
import Mine from "../pages/mine"

import { AppOutline, UserOutline } from "antd-mobile-icons"

export const tabs = [
    {
        key: "/",
        title: "首页",
        icon: <AppOutline />,
        element: <Home />,
    },
    {
        key: "/mine",
        title: "我的",
        icon: <UserOutline />,
        element: <Mine />,
    },
]

