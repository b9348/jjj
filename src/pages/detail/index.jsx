import { useState, useEffect } from 'react' 
import { Button, Grid , List, Image } from 'antd-mobile'
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
      <div className="detailUp">
        {titleList.map((item, index) => {
          return <div className="detailBox" key={index}>
            {item.title}
          </div>
        })}
      </div>
      <div className="detailDown">
        
    <List header='用户列表'>
      {costDetails.map((val, index) => (
        <List.Item
          key={ index }
          title ={val.createtime}
          description={val.desc}
        >
          {val.moment}
        </List.Item>
      ))}
    </List>
      </div>
    </div>
  )
}

export default App
