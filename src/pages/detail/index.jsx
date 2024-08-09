import { useState, useEffect } from 'react'
import { Button, Grid, List, Image, Tag, Footer,Space } from 'antd-mobile'
import { NavTitle } from "../../components/navTitle";
import { queryDetails } from '../../tool/api'
import './index.less'

function App() {
  const [costDetails, setCostDetails] = useState([])
  const titleList = [{ title: '资金日期' }
    , { title: '资金数额' }
    , { title: '资金类型' }
  ]
  useEffect(() => {
    const queryDetail = async () => {
      const userId = localStorage.getItem('id')
      const res = await queryDetails(userId)
      setCostDetails(res.data)
      console.log(res)
    }
    queryDetail()
  }, [])
  return (
    <div className="detailWrapper">
      <NavTitle title='资金详情' />
      {/* <div className="detailUp">
        {titleList.map((item, index) => {
          return <div className="detailBox" key={index}>
            {item.title}
          </div>
        })}
      </div> */}
      <br /><br /><br />
      <Space/>
      <div className="detailDown">

        <List header='资金去向详情列表'>
          {costDetails.map((val, index) => (
            <List.Item
              key={index}
              title={`时间：${val.createtime}`}
              description={`资金类型：${val.desc}`}
            >
              <Tag color='primary' fill='outline'>下注金额
              </Tag>：
                {val.moment}
            </List.Item>
          ))}
        </List>
      </div>
      
      <Footer label='没有更多了' />
    </div>
  )
}

export default App
