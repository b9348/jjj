import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd-mobile'
import { NavTitle } from "../../components/navTitle";
import './index.less'

function App() {
  const titleList = [{ title: '详情' }
    , { title: '评论' }
    , { title: '点赞' }
  ]
  return (
    <div className="detailWrapper">

      <NavTitle title='详情' />
      <div className="detailUp">
        {titleList.map((item, index) => {
          return <div className="detailBox" key={index}>
            {item.title}
          </div>
        })}
      </div>
    </div>
  )
}

export default App
