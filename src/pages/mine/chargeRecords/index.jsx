import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Grid, NavBar, List, Footer } from 'antd-mobile'
import { queryCharges } from '../../../tool/api'
import './index.less'

function App() {
  const [recharges, setRecharges] = useState([])
  // const titleList = [{ title: '详情' }
  //   , { title: '评论' }
  //   , { title: '点赞' }
  // ]
  useEffect(() => {
    const queryRecharges = async () => {
      const userId = localStorage.getItem('id')
      const res = await queryCharges(userId)
      setRecharges(res.data)
      console.log(res)
    }
    queryRecharges()
  }, [])
  function timestampToDateTime(timestamp) {
    var date = new Date(timestamp * 1000); // JavaScript中的时间戳是以毫秒为单位的，所以需要乘以1000
    var year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2); // 月份是从0开始的，所以需要加1，并确保是两位数
    var day = ('0' + date.getDate()).slice(-2);
    var hours = ('0' + date.getHours()).slice(-2);
    var minutes = ('0' + date.getMinutes()).slice(-2);
    var seconds = ('0' + date.getSeconds()).slice(-2);

    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  }
  return (
    <div className="chargeRecords">
      <NavBar back='返回' onBack={() => { window.history.go(-1) }}            >
        储值记录
      </NavBar>
      {/* <div className="up">
        {titleList.map((item, index) => {
          return <div className="detailBox" key={index}>
            {item.title}
          </div>
        })}
      </div> */}
      <div>

        <List header='查看过往所有储值记录'>
          {recharges.map((val, index) => (
            <List.Item
              key={index}
              title={timestampToDateTime(val.createtime)}
              description={val.status === 0 ? '处理中' : '已完成'} >
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
