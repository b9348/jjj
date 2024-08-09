import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Grid , NavBar } from 'antd-mobile' 
import { queryDetails } from '../../../tool/api'
import './index.less'

function App() {
  const [cost, setCosts] = useState([])
  const titleList = [{ title: '资金日期' }
    , { title: '资金类型' }
    , { title: '资金说明' }
  ]
  useEffect(() => {
    const queryCostDetail = async () => {
      const userId = localStorage.getItem('id')
      const res = await queryDetails(userId)
      setCosts(res.data)
      console.log(res)
    }
    queryCostDetail()
  }, [])
  return (
    <div className="chargeRecords">
    <NavBar back='返回' onBack={() => { window.history.go(-1) }}            >
        资金明细
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
