import { useState } from 'react'
import { Button } from 'antd-mobile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/index';
import MinePage from './pages/mine/index';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mine" element={<MinePage />} />
      </Routes>
    </Router>
  );
}

export default App
