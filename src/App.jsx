
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { tabs } from './tool/router'
import { TabBar } from 'antd-mobile';

import './App.css'

const App = () => {
  const pathname = useLocation().pathname
  const navigate = useNavigate()
  const setRouteActive = (value) => {
    console.log(value)
    navigate(value, { state: '1' })
  }

  return (
    <>
      <TabBar className='tabBottom' activeKey={pathname} onChange={value => setRouteActive(value)}>
        {tabs.map(item => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
      <Routes>
        {tabs.map(item => (
          <Route key={item.key} path={item.key} element={item.element} />
        ))}

      </Routes>
    </>
  );
}

export default App
