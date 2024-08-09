import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Grid , NavBar } from 'antd-mobile' 
import { queryCharges } from '../../../tool/api'
import './index.less'

function App() {
  const [recharges, setRecharges] = useState([])
  const titleList = [{ title: '详情' }
    , { title: '评论' }
    , { title: '点赞' }
  ]
  useEffect(() => {
    const queryRecharges = async () => {
      const userId = localStorage.getItem('id')
      const res = await queryCharges(userId)
      setRecharges(res.data)
      console.log(res)
    }
    queryRecharges()
  }, [])
  return (
    <div className="chargeRecords">
    <NavBar back='返回' onBack={() => { window.history.go(-1) }}            >
        储值记录
    </NavBar>
      <div className="up">
        {titleList.map((item, index) => {
          return <div className="detailBox" key={index}>
            {item.title}
          </div>
        })}
      </div>
      <div title='基础用法'>
        <Grid columns={3} gap={8}>
          <Grid.Item>
            <div className='grid-demo-item-block'>A</div>
          </Grid.Item>
          <Grid.Item>
            <div className='grid-demo-item-block'>B</div>
          </Grid.Item>
          <Grid.Item>
            <div className='grid-demo-item-block' >C</div>
          </Grid.Item>
        </Grid>
      </div>
    </div>
  )
}

export default App
