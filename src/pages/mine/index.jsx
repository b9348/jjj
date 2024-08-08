import { ReceivePaymentOutline, HandPayCircleOutline, FolderOutline, CalendarOutline } from 'antd-mobile-icons'
import { Avatar, List, Button, Modal } from 'antd-mobile'
import { NavTitle } from "../../components/navTitle";
import { useGoto } from '../../tool/tool';
import './index.less'

const demoAvatarImages = [
  'https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
]
const midList = [
  { icon: ReceivePaymentOutline, content: '测试1', url: '/mine/charge' },
  { icon: HandPayCircleOutline, content: '测试2' },
  { icon: FolderOutline, content: '测试3' },
  { icon: CalendarOutline, content: '测试4' },
]
const mineServices = [
  {content: '资金明细', extra: '查看流水', url: '/mine/costDetails' },
  {content: '储值记录', extra: '查看充值记录', url: '/mine/chargeRecords' },
  {content: '联系客服' , extra: '咨询官方客服' },
  {content: '比赛记录', extra: '查看过往赛事结果', url: '/mine/matchRecords' },  
]

function App() {
  const handleClick = () => {
    console.log('clicked')
  }
  const localUser = (val) => {
    return localStorage.getItem(val)
  }
  const logOut = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('avatar')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    window.location.href = '/'
  }
  const goto = useGoto()
  const openUrl = (url) => {
    goto(url)
  }
  return (
    <>

      <NavTitle title='我的' />
      <div className="mineWrapper">
        <div className="mineUp">
          <List style={{ width: '100%' }}>
            <List.Item
              prefix={<Avatar src={localUser('avatar') || demoAvatarImages[0]} />}
              description='会员'
            >
              {localUser('username') || '用户名'}
            </List.Item>
          </List>
        </div>
        <div className="mineMid">
          {midList.map((item, index) => {
            return <div className="midBox"
              key={index} onClick={() => { openUrl(item.url) }}>
              <item.icon fontSize={40} />
              <div className="midDown">
                {item.content}
              </div>
            </div>

          })}
        </div>
        <div className="mineDown">
          <List className='mineDownList'>
            {mineServices.map((item, index) => {
              return <List.Item key={index} extra={item.extra} onClick={() => { openUrl(item.url) }}>
                {item.content}
              </List.Item>
            })}
          </List>

        </div>
        <Button className='mineLogout' size='large'
          onClick={() => {
            Modal.alert({
              content: `确认退出登录吗？`,
              closeOnMaskClick: true,
              showCloseButton: true,
              onConfirm: () => {
                logOut()
              },
              confirmText: '确认',
            })
          }} >退出登录</Button>

      </div>
    </>
  )
}

export default App
