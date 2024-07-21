import { useState } from 'react'
import { ReceivePaymentOutline, HandPayCircleOutline, FolderOutline, CalendarOutline } from 'antd-mobile-icons'
import { Avatar, List,  Button } from 'antd-mobile'
import './index.less'

const demoAvatarImages = [
  'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
]
const midList = [
  { icon: ReceivePaymentOutline, content: '测试1' },
  { icon: HandPayCircleOutline, content: '测试2' },
  { icon: FolderOutline, content: '测试3' },
  { icon: CalendarOutline, content: '测试4' },
]

function App() {
  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <>
      <div className="mineWrapper">
        <div className="mineUp">
          <List>
            <List.Item
              prefix={<Avatar src={demoAvatarImages[0]} />}
              description='Deserunt dolor ea eaque eos'
            >
              Novalee Spicer
            </List.Item>
          </List>
        </div>
        <div className="mineMid">
          {midList.map((item, index) => {
            return <div className="midBox"
              key={index} onClick={() => { console.log(item.content) }}>
              <item.icon fontSize={40} />
              <div className="midDown">
                {item.content}
              </div>
            </div>

          })}
        </div>
        <div className="mineDown">

          <List className='mineDownList'>
            <List.Item extra='按照支付设置的顺序扣款' onClick={handleClick}>
              扣款方式
            </List.Item>
            <List.Item extra='200元' onClick={handleClick}>
              月限额
            </List.Item>
            <List.Item onClick={handleClick}>帮助中心</List.Item>
            <List.Item onClick={handleClick}>关闭服务</List.Item>
          </List>
        </div>
        <Button className='mineLogout' size='large' >退出登录</Button>
      </div>
    </>
  )
}

export default App
